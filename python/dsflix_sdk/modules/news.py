from __future__ import annotations

from ..http import HttpClient


class NewsModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_top(self, page: int | None = None, language: str | None = None, category: str | None = None) -> dict:
        return self.http.get("/api/v2/news/top", {"page": page, "language": language, "category": category})

    def search(self, query: str, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/news/search", {"query": query, "page": page, "language": language})
