from __future__ import annotations

from ..http import HttpClient


class MoviesModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_popular(self, page: int | None = None, language: str | None = None, region: str | None = None) -> dict:
        return self.http.get("/api/v2/movies/popular", {"page": page, "language": language, "region": region})

    def get_trending(self, time_window: str = "day", language: str | None = None) -> dict:
        return self.http.get(f"/api/v2/trending/movie/{time_window}", {"language": language})

    def get_top_rated(self, page: int | None = None, language: str | None = None, region: str | None = None) -> dict:
        return self.http.get("/api/v2/movies/top-rated", {"page": page, "language": language, "region": region})

    def get_now_playing(self, page: int | None = None, language: str | None = None, region: str | None = None) -> dict:
        return self.http.get("/api/v2/movies/now-playing", {"page": page, "language": language, "region": region})

    def get_upcoming(self, page: int | None = None, language: str | None = None, region: str | None = None) -> dict:
        return self.http.get("/api/v2/movies/upcoming", {"page": page, "language": language, "region": region})

    def get_details(self, movie_id: int, language: str | None = None, append_to_response: str | None = None) -> dict:
        return self.http.get(f"/api/v2/movies/{movie_id}", {"language": language, "append_to_response": append_to_response})

    def get_cast(self, movie_id: int) -> dict:
        return self.http.get(f"/api/v2/movies/{movie_id}/cast")

    def search(self, query: str, page: int | None = None, language: str | None = None, year: int | None = None, include_adult: bool | None = None) -> dict:
        return self.http.get(
            "/api/v2/search/movie",
            {"query": query, "page": page, "language": language, "year": year, "include_adult": include_adult},
        )

    def download(self, media_id: int, quality: str | None = None) -> dict:
        return self.http.post("/api/v2/download", {"media_id": media_id, "quality": quality})
