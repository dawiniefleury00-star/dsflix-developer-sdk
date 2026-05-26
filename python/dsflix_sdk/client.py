from .http import HttpClient
from .modules.ai import AIModule
from .modules.coins import CoinsModule
from .modules.home import HomeModule
from .modules.membership import MembershipModule
from .modules.movies import MoviesModule
from .modules.music import MusicModule
from .modules.news import NewsModule
from .modules.search import SearchModule
from .modules.tv import TVModule
from .modules.user import UserModule


class DsfClient:
    """DSFlix API client."""

    def __init__(
        self,
        api_key: str,
        base_url: str = "https://api.dawensflix.com",
        timeout: int = 10,
        language: str = "en-US",
    ) -> None:
        if not api_key:
            raise ValueError("api_key is required")
        if not api_key.startswith("dfx-"):
            raise ValueError("Invalid api_key format. Keys must start with 'dfx-'.")

        http = HttpClient(api_key=api_key, base_url=base_url, timeout=timeout, language=language)

        self.movies = MoviesModule(http)
        self.tv = TVModule(http)
        self.search = SearchModule(http)
        self.ai = AIModule(http)
        self.user = UserModule(http)
        self.coins = CoinsModule(http)
        self.membership = MembershipModule(http)
        self.music = MusicModule(http)
        self.news = NewsModule(http)
        self.home = HomeModule(http)
