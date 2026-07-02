from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import httpx
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Ansh Portfolio API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ------------------- Simple in-memory TTL cache -------------------
_CACHE: Dict[str, Dict[str, Any]] = {}
CACHE_TTL_SECONDS = 60 * 30  # 30 minutes


def cache_get(key: str) -> Optional[Any]:
    entry = _CACHE.get(key)
    if not entry:
        return None
    if (datetime.now(timezone.utc) - entry['ts']).total_seconds() > CACHE_TTL_SECONDS:
        _CACHE.pop(key, None)
        return None
    return entry['data']


def cache_set(key: str, data: Any) -> None:
    _CACHE[key] = {'ts': datetime.now(timezone.utc), 'data': data}


# ------------------- Models -------------------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str


# ------------------- Basic route -------------------
@api_router.get("/")
async def root():
    return {"message": "Ansh Portfolio API is live"}


# ------------------- Contact form -------------------
def _build_contact_email_html(msg: "ContactMessage") -> str:
    safe_subject = (msg.subject or "(no subject)").strip()
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'JetBrains Mono', ui-monospace, Consolas, monospace; background:#f4f4f5; padding:24px;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0A0A0A; border:1px solid #1F1F1F; padding:32px; color:#F4F4F5;">
          <tr><td>
            <div style="font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:#CCFF00; margin-bottom:12px;">new · contact submission</div>
            <h1 style="font-family:'Outfit', Arial, sans-serif; font-size:24px; margin:0 0 20px; color:#F4F4F5;">Someone reached out via your portfolio</h1>
            <table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #1F1F1F; margin-top:8px;">
              <tr><td style="padding:14px 0; border-bottom:1px solid #1F1F1F;">
                <div style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#71717A;">Name</div>
                <div style="font-size:15px; color:#F4F4F5; margin-top:4px;">{msg.name}</div>
              </td></tr>
              <tr><td style="padding:14px 0; border-bottom:1px solid #1F1F1F;">
                <div style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#71717A;">Email</div>
                <div style="font-size:15px; color:#CCFF00; margin-top:4px;">{msg.email}</div>
              </td></tr>
              <tr><td style="padding:14px 0; border-bottom:1px solid #1F1F1F;">
                <div style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#71717A;">Subject</div>
                <div style="font-size:15px; color:#F4F4F5; margin-top:4px;">{safe_subject}</div>
              </td></tr>
              <tr><td style="padding:14px 0;">
                <div style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:#71717A;">Message</div>
                <div style="font-size:14px; color:#D4D4D8; margin-top:8px; line-height:1.6; white-space:pre-wrap;">{msg.message}</div>
              </td></tr>
            </table>
            <div style="margin-top:24px; font-size:11px; color:#52525B;">Sent {msg.created_at.strftime('%Y-%m-%d %H:%M UTC')} · Reply directly to this email to respond to {msg.name}.</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_contact_email(msg: "ContactMessage") -> Optional[str]:
    """Fire-and-log email send. Returns email id on success, None otherwise."""
    if not RESEND_API_KEY or not RECIPIENT_EMAIL:
        return None
    params = {
        "from": f"Portfolio <{SENDER_EMAIL}>",
        "to": [RECIPIENT_EMAIL],
        "reply_to": msg.email,
        "subject": f"[Portfolio] {msg.subject or 'New message'} — from {msg.name}",
        "html": _build_contact_email_html(msg),
    }
    try:
        sent = await asyncio.to_thread(resend.Emails.send, params)
        return sent.get("id") if isinstance(sent, dict) else None
    except Exception as e:
        logger.error(f"Resend email send failed: {e}")
        return None


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    logger.info(f"New contact message from {msg.email}")

    email_id = await _send_contact_email(msg)
    return {
        "status": "success",
        "id": msg.id,
        "message": "Message received. I'll get back to you soon!",
        "email_sent": bool(email_id),
    }


@api_router.get("/contact")
async def list_contacts():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return items


# ------------------- GitHub proxy -------------------
GITHUB_USER = "anshyadav669"


@api_router.get("/github/stats")
async def github_stats():
    cached = cache_get("github_stats")
    if cached:
        return cached

    async with httpx.AsyncClient(timeout=15.0) as hx:
        headers = {"Accept": "application/vnd.github+json", "User-Agent": "ansh-portfolio"}
        token = os.environ.get("GITHUB_TOKEN")
        if token:
            headers["Authorization"] = f"Bearer {token}"

        try:
            user_r = await hx.get(f"https://api.github.com/users/{GITHUB_USER}", headers=headers)
            user_r.raise_for_status()
            user = user_r.json()

            repos_r = await hx.get(
                f"https://api.github.com/users/{GITHUB_USER}/repos",
                headers=headers,
                params={"per_page": 100, "sort": "updated"},
            )
            repos_r.raise_for_status()
            repos = repos_r.json()
        except httpx.HTTPStatusError as e:
            logger.error(f"GitHub API error: {e}")
            raise HTTPException(status_code=502, detail="GitHub API error")
        except Exception as e:
            logger.error(f"GitHub fetch failed: {e}")
            raise HTTPException(status_code=502, detail="GitHub fetch failed")

    total_stars = sum(r.get("stargazers_count", 0) for r in repos)
    total_forks = sum(r.get("forks_count", 0) for r in repos)

    lang_counts: Dict[str, int] = {}
    for r in repos:
        lang = r.get("language")
        if lang:
            lang_counts[lang] = lang_counts.get(lang, 0) + 1
    top_languages = sorted(lang_counts.items(), key=lambda x: x[1], reverse=True)[:6]

    top_repos = sorted(
        [r for r in repos if not r.get("fork")],
        key=lambda r: (r.get("stargazers_count", 0), r.get("updated_at", "")),
        reverse=True,
    )[:6]

    result = {
        "username": user.get("login"),
        "name": user.get("name"),
        "avatar_url": user.get("avatar_url"),
        "bio": user.get("bio"),
        "public_repos": user.get("public_repos"),
        "followers": user.get("followers"),
        "following": user.get("following"),
        "html_url": user.get("html_url"),
        "total_stars": total_stars,
        "total_forks": total_forks,
        "top_languages": [{"name": n, "count": c} for n, c in top_languages],
        "top_repos": [
            {
                "name": r["name"],
                "description": r.get("description"),
                "html_url": r["html_url"],
                "stargazers_count": r.get("stargazers_count", 0),
                "forks_count": r.get("forks_count", 0),
                "language": r.get("language"),
                "homepage": r.get("homepage"),
                "updated_at": r.get("updated_at"),
            }
            for r in top_repos
        ],
    }
    cache_set("github_stats", result)
    return result


# ------------------- GitHub contributions heatmap (no-auth) -------------------
@api_router.get("/github/contributions")
async def github_contributions():
    cached = cache_get("github_contribs")
    if cached:
        return cached

    url = f"https://github-contributions-api.jogruber.de/v4/{GITHUB_USER}?y=last"
    async with httpx.AsyncClient(timeout=20.0) as hx:
        try:
            r = await hx.get(url, headers={"User-Agent": "ansh-portfolio"})
            r.raise_for_status()
            data = r.json()
        except Exception as e:
            logger.error(f"GitHub contributions fetch failed: {e}")
            raise HTTPException(status_code=502, detail="Contribution graph unavailable")

    contribs = data.get("contributions", [])
    totals = data.get("total", {})
    # Only keep last 365 days for consistent display
    contribs = contribs[-365:]

    total_count = sum(c.get("count", 0) for c in contribs)

    result = {
        "username": GITHUB_USER,
        "total_last_year": total_count,
        "yearly_totals": totals,
        "days": [
            {
                "date": c.get("date"),
                "count": c.get("count", 0),
                "level": c.get("level", 0),
            }
            for c in contribs
        ],
    }
    cache_set("github_contribs", result)
    return result


# ------------------- LeetCode proxy -------------------
LEETCODE_USER = "AnshKumarYadav"

LEETCODE_QUERY = """
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile { ranking reputation userAvatar realName }
    submitStatsGlobal {
      acSubmissionNum { difficulty count }
    }
  }
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    topPercentage
    badge { name }
  }
  allQuestionsCount { difficulty count }
}
"""


@api_router.get("/leetcode/stats")
async def leetcode_stats():
    cached = cache_get("leetcode_stats")
    if cached:
        return cached

    async with httpx.AsyncClient(timeout=15.0) as hx:
        try:
            r = await hx.post(
                "https://leetcode.com/graphql",
                json={"query": LEETCODE_QUERY, "variables": {"username": LEETCODE_USER}},
                headers={
                    "Content-Type": "application/json",
                    "Referer": f"https://leetcode.com/{LEETCODE_USER}/",
                    "User-Agent": "Mozilla/5.0 ansh-portfolio",
                },
            )
            r.raise_for_status()
            data = r.json().get("data", {})
        except Exception as e:
            logger.error(f"LeetCode fetch failed: {e}")
            raise HTTPException(status_code=502, detail="LeetCode fetch failed")

    matched = data.get("matchedUser") or {}
    contest = data.get("userContestRanking") or {}
    all_counts = data.get("allQuestionsCount") or []
    stats = matched.get("submitStatsGlobal", {}).get("acSubmissionNum", []) if matched else []

    def by_diff(items, diff):
        for it in items:
            if it.get("difficulty") == diff:
                return it.get("count", 0)
        return 0

    result = {
        "username": matched.get("username") if matched else LEETCODE_USER,
        "ranking": (matched.get("profile") or {}).get("ranking") if matched else None,
        "total_solved": by_diff(stats, "All"),
        "easy_solved": by_diff(stats, "Easy"),
        "medium_solved": by_diff(stats, "Medium"),
        "hard_solved": by_diff(stats, "Hard"),
        "total_easy": by_diff(all_counts, "Easy"),
        "total_medium": by_diff(all_counts, "Medium"),
        "total_hard": by_diff(all_counts, "Hard"),
        "contest_rating": int(contest.get("rating")) if contest.get("rating") else None,
        "contests_attended": contest.get("attendedContestsCount"),
        "global_ranking": contest.get("globalRanking"),
        "top_percentage": contest.get("topPercentage"),
        "badge": (contest.get("badge") or {}).get("name") if contest else None,
        "profile_url": f"https://leetcode.com/u/{LEETCODE_USER}/",
    }
    cache_set("leetcode_stats", result)
    return result


# ------------------- CodeChef proxy (HTML scrape) -------------------
CODECHEF_USER = "loop_hole39"


@api_router.get("/codechef/stats")
async def codechef_stats():
    cached = cache_get("codechef_stats")
    if cached:
        return cached

    url = f"https://www.codechef.com/users/{CODECHEF_USER}"
    async with httpx.AsyncClient(timeout=20.0, follow_redirects=True) as hx:
        try:
            r = await hx.get(url, headers={"User-Agent": "Mozilla/5.0 ansh-portfolio"})
            r.raise_for_status()
            html = r.text
        except Exception as e:
            logger.error(f"CodeChef fetch failed: {e}")
            raise HTTPException(status_code=502, detail="CodeChef fetch failed")

    import re

    def find(pattern, default=None, flags=re.S):
        m = re.search(pattern, html, flags)
        return m.group(1).strip() if m else default

    current_rating = find(r'class="rating-number"[^>]*>\s*([\d?]+)')
    highest_rating = find(r'Highest Rating\s*(\d+)')
    stars = find(r'class="rating"[^>]*>([\d]?★|\?)')
    global_rank = find(r'Global Rank[^<]*</span>\s*<a[^>]*><strong>([\d,]+)</strong>') or find(
        r'Global Rank[^<]*</label>\s*<strong[^>]*>([\d,]+|NA)'
    )
    country_rank = find(r'Country Rank[^<]*</span>\s*<a[^>]*><strong>([\d,]+)</strong>') or find(
        r'Country Rank[^<]*</label>\s*<strong[^>]*>([\d,]+|NA)'
    )
    # Fallback broader star match
    if not stars:
        stars_m = re.search(r'(\d)-Star|(\d)\s*★', html)
        if stars_m:
            stars = f"{stars_m.group(1) or stars_m.group(2)}★"

    # Derive stars from rating if still missing
    def stars_from_rating(rating_str):
        try:
            r = int(str(rating_str).replace(",", "").strip())
        except (ValueError, TypeError):
            return None
        if r < 1400:
            return "1★"
        if r < 1600:
            return "2★"
        if r < 1800:
            return "3★"
        if r < 2000:
            return "4★"
        if r < 2200:
            return "5★"
        if r < 2500:
            return "6★"
        return "7★"

    if not stars and current_rating:
        stars = stars_from_rating(current_rating)

    result = {
        "username": CODECHEF_USER,
        "current_rating": current_rating,
        "highest_rating": highest_rating,
        "stars": stars,
        "global_rank": global_rank,
        "country_rank": country_rank,
        "profile_url": url,
    }
    cache_set("codechef_stats", result)
    return result


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
