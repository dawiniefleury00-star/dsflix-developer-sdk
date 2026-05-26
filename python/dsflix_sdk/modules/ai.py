from __future__ import annotations

from ..http import HttpClient


class AIModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def chat(self, message: str, context: dict | None = None) -> dict:
        return self.http.post("/api/v2/ai/chat", {"message": message, "context": context})
