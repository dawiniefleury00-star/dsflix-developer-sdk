# DSFlix SDK (`dsflix-sdk-npm` )

> **Official JavaScript/TypeScript SDK for the DSFlix Streaming API — 2026**

[![npm version](https://badge.fury.io/js/dsflix-sdk.svg)](https://badge.fury.io/js/dsflix-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

---

## What is DSFlix SDK?

The **DSFlix SDK** (`dsflix-sdk`) is the official client library for the [DSFlix / DawensFlix](https://dawensflix.com) streaming platform API. It lets you integrate movies, TV shows, AI chat, user coins, membership, music, and news into any JavaScript or TypeScript application — in minutes.

## Features

- 🎬 **Movies** – Popular, trending, top-rated, now playing, upcoming, details, cast
- 📺 **TV Shows** – Series, seasons, episodes, credits
- 🔍 **Search** – Multi-search across movies and TV
- 🤖 **AI Chat** – Conversational movie/streaming assistant
- 🪙 **Coins** – Balance, transfer, convert, transaction history
- 👤 **User** – Profile, watchlist, watch history, notifications, referrals
- 🎵 **Music** – Trending tracks, search
- 📰 **News** – Top headlines, search
- 🏆 **Membership** – Plans, status, upgrade
- ⚡ **TypeScript-first** – Full type definitions included

---

## Installation

```bash
npm install dsflix-sdk
```

```bash
yarn add dsflix-sdk
```

```bash
pnpm add dsflix-sdk
```

---

## Quick Start

```typescript
import { DsfClient } from 'dsflix-sdk';

// Initialize with your API key
const dsf = new DsfClient({ apiKey: 'dfx-your-api-key-here' });

// Get popular movies
const movies = await dsf.movies.getPopular();
console.log(movies.results);

// Search for a movie
const results = await dsf.search.multi('Inception');
console.log(results.results);

// Get user profile (requires auth)
const profile = await dsf.user.getProfile();
console.log(profile.username, profile.coins);

// Chat with AI
const reply = await dsf.ai.chat('Recommend me a good thriller movie');
console.log(reply.reply);
```

---

## Configuration

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({
  apiKey: 'dfx-your-api-key',         // Required
  baseUrl: 'https://api.dawensflix.com', // Optional (default)
  timeout: 10000,                        // Optional (ms, default 10000)
  language: 'en-US',                     // Optional (default 'en-US')
});
```

---

## API Reference

### Movies

```typescript
dsf.movies.getPopular(options?)
dsf.movies.getTrending(timeWindow)      // 'day' | 'week'
dsf.movies.getTopRated(options?)
dsf.movies.getNowPlaying(options?)
dsf.movies.getUpcoming(options?)
dsf.movies.getDetails(movieId, options?)
dsf.movies.getCast(movieId)
dsf.movies.search(query, options?)
dsf.movies.download(params)
```

### TV Shows

```typescript
dsf.tv.getPopular(options?)
dsf.tv.getDetails(seriesId, options?)
dsf.tv.getSeason(seriesId, seasonNumber)
dsf.tv.getEpisode(seriesId, seasonNumber, episodeNumber)
dsf.tv.getCredits(seriesId, seasonNumber)
dsf.tv.getCast(seriesId)
dsf.tv.search(query, options?)
```

### Search

```typescript
dsf.search.multi(query, options?)
dsf.search.movies(query, options?)
dsf.search.tv(query, options?)
```

### AI

```typescript
dsf.ai.chat(message, context?)
```

### User

```typescript
dsf.user.getProfile()
dsf.user.getById(displayId)
dsf.user.getWatchlist()
dsf.user.addToWatchlist(mediaType, mediaId)
dsf.user.removeFromWatchlist(mediaId)
dsf.user.getWatchHistory(options?)
dsf.user.getLanguage()
dsf.user.updateLanguage(languageCode)
dsf.user.getWallet()
dsf.user.getReferral()
dsf.user.getNotifications(options?)
dsf.user.uploadPhoto(file)
```

### Coins

```typescript
dsf.coins.getBalance()
dsf.coins.transfer(recipientDisplayId, amount, note?)
dsf.coins.convert(rewardCoins)
dsf.coins.getTransactions(options?)
```

### Membership

```typescript
dsf.membership.getPlans()
dsf.membership.getStatus()
dsf.membership.upgrade(plan, durationDays, paymentMethod?)
```

### Music

```typescript
dsf.music.getTrending(options?)
dsf.music.search(query, options?)
```

### News

```typescript
dsf.news.getTop(options?)
dsf.news.search(query, options?)
```

### Home

```typescript
dsf.home.getHero(language?)
dsf.home.getSections(options?)
dsf.home.getSplash()
dsf.home.getFeatured(options?)
```

---

## Error Handling

```typescript
import { DsfClient, DsfError } from 'dsflix-sdk';

const dsf = new DsfClient({ apiKey: 'dfx-...' });

try {
  const movies = await dsf.movies.getPopular();
} catch (err) {
  if (err instanceof DsfError) {
    console.error(`DSFlix API Error [${err.statusCode}]: ${err.message}`);
  } else {
    throw err;
  }
}
```

---

## Authentication

Get your API key from [dawensflix.com/api-dashboard](https://dawensflix.com/api-dashboard).

All API keys follow the format: `dfx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Documentation

Full documentation with 26 pages is available in the [`/docs`](./docs) folder:

| Page | Description |
|------|-------------|
| [Getting Started](./docs/getting-started.md) | Installation & first request |
| [Authentication](./docs/authentication.md) | API keys & headers |
| [Configuration](./docs/configuration.md) | All config options |
| [Movies](./docs/movies.md) | Movie endpoints |
| [TV Shows](./docs/tv-shows.md) | TV series, seasons, episodes |
| [Search](./docs/search.md) | Multi-search |
| [Streaming](./docs/streaming.md) | Stream URLs |
| [AI Chat](./docs/ai.md) | AI assistant |
| [Coins](./docs/coins.md) | Coin system |
| [User](./docs/user.md) | User profile & data |
| [Music](./docs/music.md) | Music API |
| [News](./docs/news.md) | News headlines |
| [Membership](./docs/membership.md) | Plans & upgrades |
| [Error Handling](./docs/error-handling.md) | Error types & codes |
| [Examples](./docs/examples.md) | Real-world usage examples |
| [Changelog](./docs/changelog.md) | Version history |
| [Contributing](./docs/contributing.md) | How to contribute |

---

## Requirements

- Node.js 16+
- An active DSFlix API key (`dfx-...`)

---

## License

MIT © [DSFlix Team](https://dawensflix.com)

---

## Links

- 🌐 **Website**: [dawensflix.com](https://dawensflix.com)
- 📖 **API Docs**: [dawensflix.com/docs](https://dawensflix.com/docs)
- 🔑 **Get API Key**: [dawensflix.com/api-dashboard](https://dawensflix.com/api-dashboard)
- 🐛 **Issues**: [github.com/dsflix/dsflix-sdk/issues](https://github.com/dsflix/dsflix-sdk/issues)
