from __future__ import annotations

from ..http import HttpClient


class MembershipModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_plans(self) -> dict:
        return self.http.get("/api/v2/membership/plans")

    def get_status(self) -> dict:
        return self.http.get("/api/v2/membership/status")

    def upgrade(self, plan: str, duration_days: int, payment_method: str | None = None) -> dict:
        return self.http.post(
            "/api/v2/membership/upgrade",
            {"plan": plan, "duration_days": duration_days, "payment_method": payment_method},
        )
