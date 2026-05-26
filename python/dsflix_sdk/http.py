import requests
from requests import Response

from .exceptions import DsfError


class HttpClient:
    """Internal HTTP wrapper for DSFlix API requests."""

    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.dawensflix.com",
        timeout: int = 10,
        language: str = "en-US",
    ) -> None:
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.language = language
        self.session = requests.Session()
        self.session.headers.update(
            {
                "Authorization": f"Bearer {self.api_key}",
                "Accept": "application/json",
                "X-DSFlix-SDK": "dsflix-sdk-python/0.1.0",
            }
        )

    def get(self, path: str, params: dict | None = None) -> dict:
        return self._request("GET", path, params=params)

    def post(self, path: str, json: dict | None = None, files: dict | None = None) -> dict:
        return self._request("POST", path, json=json, files=files)

    def put(self, path: str, json: dict | None = None) -> dict:
        return self._request("PUT", path, json=json)

    def delete(self, path: str) -> dict:
        return self._request("DELETE", path)

    def _request(
        self,
        method: str,
        path: str,
        params: dict | None = None,
        json: dict | None = None,
        files: dict | None = None,
    ) -> dict:
        url = f"{self.base_url}{path}"

        try:
            response: Response = self.session.request(
                method=method,
                url=url,
                params={k: v for k, v in (params or {}).items() if v is not None},
                json=json,
                files=files,
                timeout=self.timeout,
            )
        except requests.exceptions.Timeout as exc:
            raise DsfError("Request timed out", 408) from exc
        except requests.exceptions.RequestException as exc:
            raise DsfError(str(exc), 0) from exc

        return self._handle_response(response)

    def _handle_response(self, response: Response) -> dict:
        if response.headers.get("Content-Type", "").startswith("application/json"):
            payload = response.json()
        else:
            payload = {"message": response.text}

        if not response.ok:
            error_message = payload.get("error") or payload.get("message") or response.reason
            raise DsfError(error_message, response.status_code, payload.get("detail"))

        return payload
