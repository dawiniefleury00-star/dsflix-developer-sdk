from __future__ import annotations

from ..http import HttpClient


class MusicModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_trending(self, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/music/trending", {"page": page, "language": language})

    def search(self, query: str, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/music/search", {"query": query, "page": page, "language": language})
