class DsfError(Exception):
    """Base exception for DSFlix SDK errors."""

    def __init__(self, message: str, status_code: int = 0, detail: str | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.detail = detail

    def __str__(self) -> str:
        if self.detail:
            return f"DSFlix Error {self.status_code}: {self.args[0]} ({self.detail})"
        return f"DSFlix Error {self.status_code}: {self.args[0]}"
