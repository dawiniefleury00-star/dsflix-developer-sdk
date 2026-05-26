from __future__ import annotations

from ..http import HttpClient


class UserModule:
    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def get_profile(self) -> dict:
        return self.http.get("/api/v2/user/profile")

    def get_by_id(self, display_id: str) -> dict:
        return self.http.get(f"/api/v2/user/{display_id}")

    def get_watchlist(self, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/user/watchlist", {"page": page, "language": language})

    def add_to_watchlist(self, media_type: str, media_id: int) -> dict:
        return self.http.post("/api/v2/user/watchlist", {"media_type": media_type, "media_id": media_id})

    def remove_from_watchlist(self, media_id: int) -> dict:
        return self.http.post("/api/v2/user/watchlist", {"media_id": media_id, "action": "remove"})

    def get_watch_history(self, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/user/history", {"page": page, "language": language})

    def get_language(self) -> dict:
        return self.http.get("/api/v2/user/language")

    def update_language(self, language: str) -> dict:
        return self.http.put("/api/v2/user/language", {"language": language})

    def get_wallet(self) -> dict:
        return self.http.get("/api/v2/user/wallet")

    def get_referral(self) -> dict:
        return self.http.get("/api/v2/user/referral")

    def get_notifications(self, page: int | None = None, language: str | None = None) -> dict:
        return self.http.get("/api/v2/user/notifications", {"page": page, "language": language})

    def upload_photo(self, file_path: str) -> dict:
        with open(file_path, "rb") as image_file:
            return self.http.post("/api/v2/user/photo", files={"file": image_file})
