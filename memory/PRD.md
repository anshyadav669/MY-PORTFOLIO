# Ansh Kumar Yadav — Portfolio Website (PRD)

## Original problem statement
Build a premium, production-ready personal portfolio for Ansh Kumar Yadav (B.Tech Civil, NIT Silchar; freelance web dev; competitive programmer). Data sourced from resume + LinkedIn/GitHub/LeetCode/CodeChef profiles. Dark-first neon/lime aesthetic. Live third-party stats. Contact form.

## User persona
Ansh Kumar Yadav — a Civil Engineering undergrad who codes: freelance web dev, RAG/LLM tinkerer, 400+ LeetCode problems, 2★ CodeChef. Uses the site to apply to internships and be visible to recruiters.

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui + framer-motion + react-icons + react-type-animation + sonner (toasts) + SWR (data fetching). Single-page app with anchor scrolling.
- **Backend**: FastAPI + Motor (MongoDB) + httpx. In-memory TTL cache (30 min) for third-party proxies.
- **Design**: Dark-first (`#030303` base, `#0A0A0A` surfaces, `#CCFF00` lime accent). Fonts: Outfit (display) + JetBrains Mono (body/mono). See `/app/design_guidelines.json`.

## Core requirements (static)
- All resume data lives in `/app/frontend/src/data/portfolio.js`.
- All backend third-party fetches go through `/api/{github,leetcode,codechef}/stats`.
- Contact form persists to `contact_messages` MongoDB collection.

## Implemented (2026-07-02)
- Backend endpoints:
  - `GET /api/` — health
  - `GET /api/github/stats` — profile + aggregates + top languages + top repos (`anshyadav669`)
  - `GET /api/github/contributions` — 365-day contribution calendar via public jogruber.de API
  - `GET /api/leetcode/stats` — GraphQL to leetcode.com (`AnshKumarYadav`), returns solved by difficulty + contest rating
  - `GET /api/codechef/stats` — HTML scrape of `loop_hole39` profile, derives stars from rating band
  - `POST /api/contact` + `GET /api/contact` — save/list messages
- Frontend sections: Nav (with theme toggle), Hero (typing animation), About (+Education timeline), Skills (progress bars + tools marquee), Competitive Programming (LeetCode + CodeChef bento), GitHub Stats (bento + contribution heatmap + repos grid), Projects, Experience + Achievements, Contact form (validated), Footer.
- Global chrome: sticky glass nav, scroll progress bar, back-to-top button, themed sonner toasts.
- **Dark/Light theme toggle** with localStorage persistence — data-theme attribute on <html> + Tailwind dark class. Lime accent (#CCFF00) in dark; darker olive (#4A7100) for text in light mode; buttons stay lime in both.
- SEO: meta description, OG tags, Twitter card, canonical, title.

## Testing
- iteration_1: backend + frontend 100% pass
- iteration_2 (heatmap + theme toggle): backend + frontend 100% pass

## Backlog (P0/P1/P2)
- **P1**: Add LinkedIn scraping / manual "Certifications" section when Ansh provides them.
- **P1**: Contribution heatmap for GitHub (currently only top repos + languages).
- **P1**: Light-mode toggle (currently dark-only per user preference).
- **P2**: Email notification via Resend (deferred — user chose "skip for now").
- **P2**: Blog / writing section.
- **P2**: Case-study pages per project with images.

## Next tasks (choose any)
1. Add contribution heatmap using GitHub GraphQL API.
2. Enable email notification when contact form is submitted.
3. Publish deep-dive case studies for RAG Chatbot + To-Do App.
