from __future__ import annotations

from ..http import HttpClient


class TVModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_popular(self, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/tv/popular", {"page": page, "language": language})

    def get_details(self, series_id: int, language: str | None = None, append_to_response: str | None = None) -> dict:
        return self.http.get(f"/api/v2/tv/{series_id}", {"language": language, "append_to_response": append_to_response})

    def get_season(self, series_id: int, season_number: int) -> dict:
        return self.http.get(f"/api/v2/tv/{series_id}/season/{season_number}")

    def get_episode(self, series_id: int, season_number: int, episode_number: int) -> dict:
        return self.http.get(f"/api/v2/tv/{series_id}/season/{season_number}/episode/{episode_number}")

    def get_credits(self, series_id: int, season_number: int) -> dict:
        return self.http.get(f"/api/v2/tv/{series_id}/season/{season_number}/credits")

    def get_cast(self, series_id: int) -> dict:
        return self.http.get(f"/api/v2/tv/{series_id}/cast")

    def search(self, query: str, page: int | None = None, language: str | None = None, include_adult: bool | None = None) -> dict:
        return self.http.get(
            "/api/v2/search/tv",
            {"query": query, "page": page, "language": language, "include_adult": include_adult},
        )

    def download(self, media_id: int, quality: str | None = None) -> dict:
        return self.http.post("/api/v2/download", {"media_id": media_id, "quality": quality})
