from __future__ import annotations

from ..http import HttpClient


class CoinsModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_balance(self) -> dict:
        return self.http.get("/api/v2/coins/balance")

    def transfer(self, recipient_display_id: str, amount: float, note: str | None = None) -> dict:
        return self.http.post("/api/v2/coins/transfer", {"recipient_display_id": recipient_display_id, "amount": amount, "note": note})

    def convert(self, reward_coins: float) -> dict:
        return self.http.post("/api/v2/coins/convert", {"reward_coins": reward_coins})

    def get_transactions(self, page: int | None = None, language: str | None = None, sort: str | None = None) -> dict:
        return self.http.get("/api/v2/coins/transactions", {"page": page, "language": language, "sort": sort})
