from __future__ import annotations

from ..http import HttpClient


class SearchModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def multi(self, query: str, page: int | None = None, language: str | None = None, include_adult: bool | None = None) -> dict:
        return self.http.get(
            "/api/v2/search/multi",
            {"query": query, "page": page, "language": language, "include_adult": include_adult},
        )

    def movies(self, query: str, page: int | None = None, language: str | None = None, include_adult: bool | None = None) -> dict:
        return self.http.get(
            "/api/v2/search/movie",
            {"query": query, "page": page, "language": language, "include_adult": include_adult},
        )

    def tv(self, query: str, page: int | None = None, language: str | None = None, include_adult: bool | None = None) -> dict:
        return self.http.get(
            "/api/v2/search/tv",
            {"query": query, "page": page, "language": language, "include_adult": include_adult},
        )
