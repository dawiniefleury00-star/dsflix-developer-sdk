# Changelog

All notable changes to the `dsflix-sdk` package are documented here.

Format: [Semantic Versioning](https://semver.org/)

---

## [1.0.0] — 2026-05-26

### 🚀 Initial Release

**Core Client**
- `DsfClient` class with modular architecture
- TypeScript-first with full type definitions
- Configurable timeout, base URL, language, and API key

**Modules Added**
- `movies` — Popular, trending, top-rated, now-playing, upcoming, details, cast, search, download
- `tv` — Popular, details, seasons, episodes, credits, cast, search, download
- `search` — Multi-search, movie search, TV search
- `ai` — Chat with DSFlix AI assistant (Gemini 3 Flash)
- `user` — Profile, watchlist, history, language, wallet, referral, notifications, photo upload
- `coins` — Balance, transfer, convert, transaction history
- `membership` — Plans, status, upgrade
- `music` — Trending, search
- `news` — Top headlines, search
- `home` — Hero, sections, splash, featured

**Error Handling**
- Custom `DsfError` class with `statusCode` and `detail` properties
- Timeout errors (408)
- Network errors (status 0)

**HTTP Client**
- Fetch-based with configurable timeout via `AbortController`
- Automatic `Authorization: Bearer` header injection
- JSON response parsing with error extraction

---

## [Planned] — 1.1.0

- Streaming URL utilities (embed source rotation)
- WebSocket support for real-time notifications
- Offline caching layer with TTL
- React hooks package (`dsflix-sdk-react`)
- CLI tool (`dsf` command for testing API calls)

---

## [Planned] — 2.0.0

- GraphQL query support
- Batch request support
- Full anime/manga module
- Archive.org media module
- Developer analytics dashboard integration
