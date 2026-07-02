"""Backend tests for the new GitHub contributions endpoint (iteration_2)."""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://fullstack-ansh-1.preview.emergentagent.com").rstrip("/")
FRONTEND_ENV = "/app/frontend/.env"
if os.path.exists(FRONTEND_ENV) and "preview" not in BASE_URL:
    for line in open(FRONTEND_ENV):
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestGithubContributions:
    def test_endpoint_status_and_schema(self, client):
        r = client.get(f"{BASE_URL}/api/github/contributions", timeout=25)
        assert r.status_code == 200, r.text
        data = r.json()
        # Required top-level keys
        for k in ("username", "total_last_year", "yearly_totals", "days"):
            assert k in data, f"Missing key {k}"
        assert data["username"] == "anshyadav669"
        assert isinstance(data["total_last_year"], int)
        assert data["total_last_year"] >= 0
        assert isinstance(data["yearly_totals"], dict)
        assert isinstance(data["days"], list)
        # ~365 days (allow 360-370)
        assert 360 <= len(data["days"]) <= 370, f"days length={len(data['days'])}"
        # Each day entry structure
        sample = data["days"][0]
        for k in ("date", "count", "level"):
            assert k in sample, f"day entry missing {k}"
        assert isinstance(sample["count"], int)
        assert isinstance(sample["level"], int)
        assert 0 <= sample["level"] <= 4
        # Date format YYYY-MM-DD
        assert len(sample["date"]) == 10 and sample["date"][4] == "-"

    def test_endpoint_is_cached(self, client):
        # first call may or may not be cached from previous test; call twice, second must be fast
        client.get(f"{BASE_URL}/api/github/contributions", timeout=25)
        t0 = time.time()
        r = client.get(f"{BASE_URL}/api/github/contributions", timeout=25)
        elapsed = time.time() - t0
        assert r.status_code == 200
        # cached responses should be well under a second on this network
        assert elapsed < 1.5, f"cached call too slow: {elapsed:.2f}s"


class TestRegressionExistingEndpoints:
    def test_root(self, client):
        r = client.get(f"{BASE_URL}/api/", timeout=15)
        assert r.status_code == 200
        assert "message" in r.json()

    def test_github_stats(self, client):
        r = client.get(f"{BASE_URL}/api/github/stats", timeout=20)
        assert r.status_code == 200
        d = r.json()
        assert d["username"] == "anshyadav669"
        assert isinstance(d.get("top_repos"), list)

    def test_leetcode_stats(self, client):
        r = client.get(f"{BASE_URL}/api/leetcode/stats", timeout=20)
        assert r.status_code == 200
        d = r.json()
        assert d["username"] == "AnshKumarYadav"
        assert isinstance(d["total_solved"], int) and d["total_solved"] >= 0

    def test_codechef_stats(self, client):
        r = client.get(f"{BASE_URL}/api/codechef/stats", timeout=25)
        assert r.status_code == 200
        d = r.json()
        assert d["username"] == "loop_hole39"

    def test_contact_post_and_get(self, client):
        payload = {
            "name": "TEST_iter2",
            "email": "test_iter2@example.com",
            "subject": "iter2",
            "message": "iteration_2 regression check",
        }
        r = client.post(f"{BASE_URL}/api/contact", json=payload, timeout=15)
        assert r.status_code == 200
        assert r.json().get("status") == "success"
        r2 = client.get(f"{BASE_URL}/api/contact", timeout=15)
        assert r2.status_code == 200
        assert any(m.get("email") == payload["email"] for m in r2.json())

    def test_contact_invalid_email(self, client):
        r = client.post(
            f"{BASE_URL}/api/contact",
            json={"name": "x", "email": "not-an-email", "message": "y"},
            timeout=15,
        )
        assert r.status_code == 422
