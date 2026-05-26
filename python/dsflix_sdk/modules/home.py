from __future__ import annotations

from ..http import HttpClient


class HomeModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_hero(self, language: str | None = None) -> dict:
        return self.http.get("/api/v2/home/hero", {"language": language})

    def get_sections(self, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/home/sections", {"page": page, "language": language})

    def get_splash(self) -> dict:
        return self.http.get("/api/v2/home/splash")

    def get_featured(self, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/home/featured", {"page": page, "language": language})
