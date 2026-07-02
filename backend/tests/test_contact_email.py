"""Backend tests: iteration 3 — Resend email integration on POST /api/contact."""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://fullstack-ansh-1.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ------------------- Contact + Resend integration -------------------
class TestContactEmail:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert "message" in r.json()

    def test_valid_contact_returns_email_sent_true(self, client):
        payload = {
            "name": "TEST_Iter3 Email",
            "email": "iter3-tester@example.com",
            "subject": "Iter3 automated",
            "message": "Automated iteration 3 email delivery check.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "success"
        assert isinstance(data.get("id"), str) and len(data["id"]) > 10
        assert "email_sent" in data
        assert isinstance(data["email_sent"], bool)
        # Resend is configured; recipient is verified anshayk2006@gmail.com
        assert data["email_sent"] is True, f"Expected email_sent=True, got {data}"

    def test_invalid_email_returns_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST_Bad",
            "email": "not-an-email",
            "message": "hi",
        })
        assert r.status_code == 422

    def test_missing_field_returns_422(self, client):
        r = client.post(f"{API}/contact", json={"name": "TEST_Missing"})
        assert r.status_code == 422

    def test_message_persists_in_mongo(self, client):
        marker = f"TEST_Iter3_persist_{int(time.time())}"
        payload = {
            "name": marker,
            "email": "persist@example.com",
            "subject": "persistence check",
            "message": "checking mongodb write",
        }
        pr = client.post(f"{API}/contact", json=payload)
        assert pr.status_code == 200
        created_id = pr.json()["id"]

        lr = client.get(f"{API}/contact")
        assert lr.status_code == 200
        items = lr.json()
        assert isinstance(items, list)
        # find our record by id
        found = next((it for it in items if it.get("id") == created_id), None)
        assert found is not None, "New contact was not persisted or not returned by GET"
        assert found["name"] == marker
        assert found["email"] == "persist@example.com"
        # _id must be excluded
        assert "_id" not in found


# ------------------- Regression: other endpoints still respond -------------------
class TestRegression:
    def test_github_stats(self, client):
        r = client.get(f"{API}/github/stats")
        assert r.status_code in (200, 502)
        if r.status_code == 200:
            d = r.json()
            assert d.get("username") == "anshyadav669"

    def test_github_contributions(self, client):
        r = client.get(f"{API}/github/contributions")
        assert r.status_code in (200, 502)
        if r.status_code == 200:
            d = r.json()
            assert isinstance(d.get("days"), list)
            assert len(d["days"]) == 365

    def test_leetcode_stats(self, client):
        r = client.get(f"{API}/leetcode/stats")
        assert r.status_code in (200, 502)

    def test_codechef_stats(self, client):
        r = client.get(f"{API}/codechef/stats")
        assert r.status_code in (200, 502)
