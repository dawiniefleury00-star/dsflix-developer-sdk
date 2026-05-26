# DSFlix SDK (`dsflix-sdk`)

> **Official JavaScript / TypeScript SDK for the DSFlix Streaming API — 2026**

[![npm version](https://badge.fury.io/js/dsflix-sdk.svg)](https://badge.fury.io/js/dsflix-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Edge%20Database-green.svg)](https://supabase.com)
[![Claude](https://img.shields.io/badge/Claude-AI%20Assistant-purple.svg)](https://claude.ai)
[![GitHub](https://img.shields.io/badge/GitHub-Code%20Repository-black.svg)](https://github.com/dawiniefleury00-star/dsflix-developer-sdk)
[![Onspace](https://img.shields.io/badge/Onspace-Workspace-blue.svg)](https://onspace.build)

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Quick Start](#quick-start)
5. [Configuration](#configuration)
6. [API Reference](#api-reference)
7. [User & Top Endpoints](#user--top-endpoints)
8. [Integration Guides](#integration-guides)
9. [Examples](#examples)
10. [CLI and Build Integration](#cli-and-build-integration)
11. [Supabase and Storage](#supabase-and-storage)
12. [Claude AI Integration](#claude-ai-integration)
13. [GitHub and Community](#github-and-community)
14. [Onspace Alias Guide](#onspace-alias-guide)
15. [Advanced Patterns](#advanced-patterns)
16. [Error Handling](#error-handling)
17. [Mock Mode](#mock-mode)
18. [Security](#security)
19. [FAQ](#faq)
20. [Changelog](#changelog)
21. [Contributing](#contributing)
22. [License](#license)

---

## Overview

The DSFlix SDK is the multi-module JavaScript and TypeScript client library for DSFlix streaming services.

It provides a single point of integration for movie discovery, TV browsing, AI chat, wallet and coins, user profiles, membership, music, news, and home page content. The SDK is built to be:

- easy to install
- easy to configure
- easy to extend
- easy to test
- production-ready

### Who this SDK is for

- Developers building media apps
- Teams building dashboard experiences
- Projects using AI recommendation workflows
- Integrations with Supabase and Claude
- GitHub and Onspace collaboration workflows
- Streaming and entertainment platforms

### What this SDK covers

- Movies
- TV shows
- Search
- AI chat
- User profile and watchlist
- Coins and wallet
- Membership plans and status
- Music discovery
- News headlines
- Home page content
- Stream metadata
- Mock development mode

This README is designed for both small teams and large institutions. It includes developer guides, integration examples, and extended references.

---

## Features

- ✅ Full TypeScript support
- ✅ Simple `DsfClient` initialization
- ✅ Modular APIs for movies, TV, search, AI, user, coins, membership, music, news, and home
- ✅ Mock-friendly mode for local development
- ✅ Supabase integration examples
- ✅ Claude-style AI integration examples
- ✅ GitHub workflow guidance
- ✅ Onspace alias and workspace support
- ✅ Clear error handling patterns
- ✅ Production-ready package structure
- ✅ Extensive README and docs

### Feature matrix

| Area | Capability | Use case |
|---|---|---|
| Movies | Popular, trending, top-rated, upcoming | Browse movies |
| TV | Series, seasons, episodes, credits | Browse TV shows |
| Search | Multi-search, movie-only, TV-only | Find content fast |
| AI | Chat prompts and responses | Personalized recommendations |
| User | Profile, watchlist, wallet | User dashboards |
| Coins | Balance, transfer, convert | Wallet flows |
| Membership | Plans, status, upgrade | Subscription flows |
| Music | Trending, search | Music discovery |
| News | Top headlines, search | News and articles |
| Home | Hero, sections, featured | Homepage layout |

---

## Installation

Install the SDK with npm, yarn, or pnpm.

```bash
npm install dsflix-sdk
```

```bash
yarn add dsflix-sdk
```

```bash
pnpm add dsflix-sdk
```

### Install latest patch

```bash
npm install dsflix-sdk@latest
```

### Install for development

```bash
npm install --save-dev dsflix-sdk
```

---

## Quick Start

Initialize the SDK and make your first requests.

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({
  apiKey: 'dfx-your-api-key',
  timeout: 15000,
  language: 'en-US',
});

async function main() {
  const popularMovies = await dsf.movies.getPopular();
  console.log('Popular movies:', popularMovies.results.slice(0, 5));

  const multiSearch = await dsf.search.multi('Inception');
  console.log('Search results:', multiSearch.results.length);

  const userProfile = await dsf.user.getProfile();
  console.log('User profile:', userProfile.username);

  const aiReply = await dsf.ai.chat('Recommend a sci-fi thriller from the last 3 years.');
  console.log('AI response:', aiReply.reply);
}

main().catch(console.error);
```

### Quick Start notes

- `apiKey` is required.
- Use `mock: true` during local development when the API is unavailable.
- Keep `baseUrl` default unless you need a custom endpoint.
- Run the example in an async context.
- Inspect returned `results` for each module.

---

## Configuration

Configure the client with the options that best fit your application.

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({
  apiKey: 'dfx-your-api-key',
  baseUrl: 'https://api.dawensflix.com',
  timeout: 12000,
  language: 'en-US',
  locale: 'en_US',
  debug: false,
  headers: {
    'X-App-Name': 'dsflix-web',
    'X-App-Version': '1.0.0',
  },
});
```

### Configuration options

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | required | Your DSFlix API key |
| `baseUrl` | `string` | `https://api.dawensflix.com` | API endpoint |
| `timeout` | `number` | `10000` | Request timeout in ms |
| `language` | `string` | `en-US` | Request language |
| `locale` | `string` | `en_US` | Locale code |
| `debug` | `boolean` | `false` | Enable debug output |
| `headers` | `Record<string,string>` | `{}` | Extra request headers |

### Best practices

- Use environment variables for secrets.
- Keep config values outside source control.
- Use `debug` during development only.
- Set a reasonable `timeout` for network stability.
- Add custom headers for analytics and metadata.

---

## API Reference

This section provides a detailed reference for the most used DSFlix SDK modules.

### Movies API

| Function | Description |
|---|---|
| `dsf.movies.getPopular(options?)` | Fetch popular movies |
| `dsf.movies.getTrending(timeWindow)` | Get trending movies for `day` or `week` |
| `dsf.movies.getTopRated(options?)` | Get top-rated movies |
| `dsf.movies.getNowPlaying(options?)` | Get now playing movies |
| `dsf.movies.getUpcoming(options?)` | Get upcoming movies |
| `dsf.movies.getDetails(movieId, options?)` | Get movie details |
| `dsf.movies.getCast(movieId)` | Get cast and crew |
| `dsf.movies.search(query, options?)` | Search movies |
| `dsf.movies.download(params)` | Download stream metadata |

### TV Shows API

| Function | Description |
|---|---|
| `dsf.tv.getPopular(options?)` | Fetch popular TV shows |
| `dsf.tv.getDetails(seriesId, options?)` | Get series details |
| `dsf.tv.getSeason(seriesId, seasonNumber)` | Get season details |
| `dsf.tv.getEpisode(seriesId, seasonNumber, episodeNumber)` | Get episode details |
| `dsf.tv.getCredits(seriesId, seasonNumber)` | Get credits and crew |
| `dsf.tv.getCast(seriesId)` | Get cast of a series |
| `dsf.tv.search(query, options?)` | Search TV shows |

### Search API

| Function | Description |
|---|---|
| `dsf.search.multi(query, options?)` | Search across movies and TV |
| `dsf.search.movies(query, options?)` | Search movies only |
| `dsf.search.tv(query, options?)` | Search TV shows only |

### AI API

| Function | Description |
|---|---|
| `dsf.ai.chat(message, context?)` | Conversational AI recommendations |

### User API

| Function | Description |
|---|---|
| `dsf.user.getProfile()` | Get current user profile |
| `dsf.user.getById(displayId)` | Get a user by display ID |
| `dsf.user.getWatchlist()` | Get current watchlist |
| `dsf.user.addToWatchlist(mediaType, mediaId)` | Add item to watchlist |
| `dsf.user.removeFromWatchlist(mediaId)` | Remove item from watchlist |
| `dsf.user.getWatchHistory(options?)` | Get watch history |
| `dsf.user.getLanguage()` | Get preferred language |
| `dsf.user.updateLanguage(languageCode)` | Update language setting |
| `dsf.user.getWallet()` | Get wallet info |
| `dsf.user.getReferral()` | Get referral details |
| `dsf.user.getNotifications(options?)` | Get notifications |
| `dsf.user.uploadPhoto(file)` | Upload profile photo |

### Coins API

| Function | Description |
|---|---|
| `dsf.coins.getBalance()` | Get coin balance |
| `dsf.coins.transfer(recipientDisplayId, amount, note?)` | Transfer coins |
| `dsf.coins.convert(rewardCoins)` | Convert reward coins |
| `dsf.coins.getTransactions(options?)` | Get transaction history |

### Membership API

| Function | Description |
|---|---|
| `dsf.membership.getPlans()` | Get membership plans |
| `dsf.membership.getStatus()` | Get membership status |
| `dsf.membership.upgrade(plan, durationDays, paymentMethod?)` | Upgrade plan |

### Music API

| Function | Description |
|---|---|
| `dsf.music.getTrending(options?)` | Get trending tracks |
| `dsf.music.search(query, options?)` | Search music |

### News API

| Function | Description |
|---|---|
| `dsf.news.getTop(options?)` | Get top headlines |
| `dsf.news.search(query)` | Search news articles |

### Home API

| Function | Description |
|---|---|
| `dsf.home.getHero(language?)` | Get homepage hero content |
| `dsf.home.getSections(options?)` | Get homepage section cards |
| `dsf.home.getFeatured(options?)` | Get featured homepage content |

---

## User & Top Endpoints

Use these endpoints for profile-driven and top list experiences.

### User profile

```typescript
const profile = await dsf.user.getProfile();
console.log(profile.username, profile.displayId, profile.membership);
```

### Wallet and coins

```typescript
const wallet = await dsf.user.getWallet();
const balance = await dsf.coins.getBalance();
const transfer = await dsf.coins.transfer('friend123', 50, 'Thanks for the tip');
```

### Watchlist

```typescript
await dsf.user.addToWatchlist('movie', 123);
const watchlist = await dsf.user.getWatchlist();
await dsf.user.removeFromWatchlist(123);
```

### Top lists

```typescript
const topMovies = await dsf.movies.getTopRated();
const trendingTV = await dsf.tv.getPopular();
const topNews = await dsf.news.getTop();
```

### Referral and notifications

```typescript
const referral = await dsf.user.getReferral();
const notifications = await dsf.user.getNotifications({ page: 1, limit: 20 });
```

---

## Example Usage

### Search and browse

```typescript
const searchResults = await dsf.search.multi('space opera');
const movieHits = searchResults.results.filter(item => item.type === 'movie');
const tvHits = searchResults.results.filter(item => item.type === 'tv');
```

### AI recommendations

```typescript
const aiResponse = await dsf.ai.chat('What is the best new drama series?');
console.log(aiResponse.reply);
```

### User journey

```typescript
const profile = await dsf.user.getProfile();
const watchHistory = await dsf.user.getWatchHistory();
const watchlist = await dsf.user.getWatchlist();
console.log(profile, watchHistory, watchlist.items.length);
```

### Membership and coins

```typescript
const plans = await dsf.membership.getPlans();
const membership = await dsf.membership.getStatus();
const wallet = await dsf.coins.getBalance();
```

### Movie details flow

```typescript
const details = await dsf.movies.getDetails(550);
const cast = await dsf.movies.getCast(550);
console.log(details.title, cast.cast.length);
```

### TV season flow

```typescript
const series = await dsf.tv.getDetails(1389);
const season = await dsf.tv.getSeason(1389, 1);
console.log(series.name, season.episodes.length);
```

### News and homepage

```typescript
const topNews = await dsf.news.getTop({ category: 'entertainment' });
const featured = await dsf.home.getFeatured();
console.log(topNews.items.length, featured.length);
```

---

## Integration Guides

### GitHub integration

Use GitHub to store this repository, manage releases, and run CI.

- Repo: `https://github.com/dawiniefleury00-star/dsflix-developer-sdk`
- Use branches and PRs for changes
- Add GitHub Actions for build and publish
- Keep docs with the repo

### Onspace alias and workspace guide

Use Onspace aliasing to make the repo easier to open and collaborate on.

#### Suggested aliases

- `dsflix-sdk`
- `dsflix-onspace`
- `dsflix-dev`

#### Example Onspace startup

```md
alias: dsflix-onspace
start: npm install && npm run build
```

#### Onspace notes

- Provide the README at repo root
- Include the `docs/` folder
- Add clear startup instructions
- Include GitHub and Supabase integration details

### Claude AI integration

Use Claude-style prompts to augment recommendations and content.

#### Example prompt

```typescript
const prompt = `Recommend five modern thriller movies with strong female leads.`;
const aiResult = await dsf.ai.chat(prompt);
console.log(aiResult.reply);
```

#### Prompt flow

1. Query DSFlix metadata.
2. Build a conversational prompt.
3. Call `dsf.ai.chat()`.
4. Render or store the response.

### Supabase integration

Use Supabase to persist user data and support analytics.

#### Example watchlist persistence

```typescript
await supabase.from('watchlist').upsert({
  user_id: profile.displayId,
  items: watchlist.items,
});
```

#### Example AI log persistence

```typescript
await supabase.from('ai_responses').insert({
  user_id: profile.displayId,
  prompt,
  response: aiResult.reply,
  created_at: new Date().toISOString(),
});
```

#### Supabase realtime example

```typescript
supabase.channel('public:watchlist')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'watchlist' }, payload => {
    console.log('Watchlist updated:', payload);
  })
  .subscribe();
```

---

## Error Handling

### Basic error handling

```typescript
import { DsfClient, DsfError } from 'dsflix-sdk';
const dsf = new DsfClient({ apiKey: process.env.DSFLIX_API_KEY || '' });

try {
  await dsf.movies.getPopular();
} catch (error) {
  if (error instanceof DsfError) {
    console.error(error.statusCode, error.message);
  } else {
    console.error('Unexpected error', error);
  }
}
```

### Retry helper

```typescript
async function retry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempt += 1;
      if (attempt >= maxAttempts) throw error;
      await new Promise(resolve => setTimeout(resolve, 500 * attempt));
    }
  }
  throw new Error('Retry failed');
}
```

### HTTP status table

| Status | Action |
|---|---|
| `200` | OK |
| `400` | Bad request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not found |
| `500` | Server error |

---

## Mock Mode

Use mock mode for local development or demo environments.

### Enable mock mode

```typescript
const dsf = new DsfClient({ apiKey: 'dfx-mock', mock: true });
```

### Mock benefits

- Develop without backend dependencies
- Validate API shapes locally
- Build demos quickly
- Switch to live mode without code changes

### Mock example

```typescript
const dsf = new DsfClient({ apiKey: 'dfx-mock', mock: true });
const movies = await dsf.movies.getPopular();
console.log('Mock movies:', movies.results.length);
```

---

## Security

### Keep credentials safe

- Do not commit API keys into source control.
- Store secrets in environment variables.
- Use GitHub secrets in CI.
- Keep Supabase keys server-side.
- Keep Claude/AI tokens private.

### Environment variables example

```bash
export DSFLIX_API_KEY='dfx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
export SUPABASE_URL='https://xyz.supabase.co'
export SUPABASE_KEY='public-anon-key'
```

### Secure client init

```typescript
const dsf = new DsfClient({ apiKey: process.env.DSFLIX_API_KEY || '' });
```

---

## CLI and Build Integration

### Commands

```bash
npm install
npm run build
npm test
```

### Publish

```bash
npm publish --access public
```

### GitHub Actions publish

```yaml
name: Build and Publish
on:
  push:
    branches: [ main ]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          registry-url: 'https://registry.npmjs.org/'
      - run: npm install
      - run: npm run build
      - run: npm test
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## GitHub and Community

### Repository

- Repo: `https://github.com/dawiniefleury00-star/dsflix-developer-sdk`
- Submit issues and pull requests
- Keep docs updated
- Use labels for easy triage

### Contribution workflow

1. Fork the repository
2. Create a branch
3. Make changes and add tests
4. Update docs
5. Open a PR

### Helpful labels

- `bug`
- `enhancement`
- `documentation`
- `help wanted`

---

## Onspace Alias Guide

Use Onspace aliases for quicker workspace launch and collaboration.

### Suggested aliases

- `dsflix-sdk`
- `dsflix-dev`
- `dsflix-onspace`

### Onspace startup

```md
alias: dsflix-onspace
start: npm install && npm run build
```

### Onspace notes

- Place README in project root
- Include `package.json`, `docs/`, and `examples/`
- Add GitHub and Supabase links
- Add Claude usage guidance for AI team members

---

## Supabase Integration

### Watchlist persistence example

```typescript
await supabase.from('watchlist').upsert({
  user_id: profile.displayId,
  items: watchlist.items,
});
```

### AI log persistence example

```typescript
await supabase.from('ai_responses').insert({
  user_id: profile.displayId,
  prompt,
  response: aiResult.reply,
  created_at: new Date().toISOString(),
});
```

### Supabase realtime example

```typescript
supabase.channel('public:watchlist')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'watchlist' }, payload => {
    console.log('Watchlist update:', payload);
  })
  .subscribe();
```

---

## Claude AI Integration

### Prompt example

```typescript
const prompt = `Recommend five modern sci-fi movies with strong character development.`;
const aiResult = await dsf.ai.chat(prompt);
console.log(aiResult.reply);
```

### Metadata prompt

```typescript
const movie = await dsf.movies.getDetails(12345);
const prompt = `Explain why ${movie.title} is great for new sci-fi fans.`;
const response = await dsf.ai.chat(prompt);
```

### Save AI responses

```typescript
await supabase.from('ai_responses').insert({
  user_id: profile.displayId,
  prompt,
  response: response.reply,
  created_at: new Date().toISOString(),
});
```

---

## Advanced Patterns

### Dashboard composition

```typescript
const [profile, trendingMovies, featuredTv, topNews] = await Promise.all([
  dsf.user.getProfile(),
  dsf.movies.getTrending('week'),
  dsf.tv.getPopular(),
  dsf.news.getTop({ limit: 5 }),
]);
```

### Search refinement

```typescript
const results = await dsf.search.multi('drama', { limit: 20 });
const filtered = results.results.filter(item => item.rating >= 7.5);
```

### AI recommendation chain

```typescript
const prompt = `Build a top 10 weekend movie watchlist.`;
const aiResult = await dsf.ai.chat(prompt);
console.log(aiResult.reply);
```

### Notifications pattern

```typescript
const notifications = await dsf.user.getNotifications({ limit: 30 });
const unread = notifications.items.filter(item => !item.read);
```

### Watchlist sync pattern

```typescript
const watchlist = await dsf.user.getWatchlist();
await supabase.from('watchlist').upsert({
  user_id: profile.displayId,
  items: watchlist.items,
});
```

---

## Error Handling (Detailed)

### Handling `DsfError`

```typescript
import { DsfClient, DsfError } from 'dsflix-sdk';

const dsf = new DsfClient({ apiKey: process.env.DSFLIX_API_KEY || '' });

try {
  await dsf.movies.getPopular();
} catch (error) {
  if (error instanceof DsfError) {
    console.error('Error code:', error.statusCode);
    console.error('Message:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Retry with exponential backoff

```typescript
async function retry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt += 1;
      if (attempt >= retries) throw error;
      await new Promise(resolve => setTimeout(resolve, 300 * attempt));
    }
  }
  throw new Error('Retry exhausted');
}
```

### Common status codes

| Status | Description |
|---|---|
| `200` | Success |
| `400` | Client error |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not found |
| `500` | Server error |

---

## Mock Mode (Detailed)

### Purpose of mock mode

Mock mode is ideal for offline app development, prototyping, and design review.

### Mock mode usage

```typescript
const dsf = new DsfClient({ apiKey: 'dfx-mock', mock: true });
```

### Mock example

```typescript
const dsf = new DsfClient({ apiKey: 'dfx-mock', mock: true });
const movies = await dsf.movies.getPopular();
console.log('Mock response:', movies.results.length);
```

### When to use mock mode

- Frontend development without backend access
- Demo or staging environments
- Early feature validation
- API contract development

---

## Security (Detailed)

### Protect API keys

- Never commit secrets to git.
- Use environment variables and secret managers.
- Use GitHub secrets for CI deployments.
- Keep Supabase keys server-side, not in client bundles.
- Keep Claude/Ai keys private.

### Environment variables example

```bash
export DSFLIX_API_KEY='dfx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
export SUPABASE_URL='https://xyz.supabase.co'
export SUPABASE_KEY='public-anon-key'
```

### Secure initialization pattern

```typescript
const dsf = new DsfClient({ apiKey: process.env.DSFLIX_API_KEY || '' });
```

---

## CLI and Build Integration (Detailed)

### Development commands

```bash
npm install
npm run build
npm test
```

### Publish command

```bash
npm publish --access public
```

### GitHub Actions workflow

```yaml
name: Publish DSFlix SDK
on:
  push:
    branches: [ main ]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          registry-url: 'https://registry.npmjs.org/'
      - run: npm install
      - run: npm run build
      - run: npm test
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## GitHub and Community (Detailed)

### Repository and collaboration

- GitHub repo: `https://github.com/dawiniefleury00-star/dsflix-developer-sdk`
- Use issues for bugs and enhancements
- Use PRs for contributions
- Keep docs current

### Contribution workflow

1. Fork the repo
2. Create a feature branch
3. Add tests and docs
4. Open a pull request

### Useful labels

- `bug`
- `enhancement`
- `documentation`
- `help wanted`

---

## Onspace Alias Guide (Detailed)

### Suggested Onspace aliases

- `dsflix-sdk`
- `dsflix-dev`
- `dsflix-onspace`

### Startup example

```md
alias: dsflix-onspace
start: npm install && npm run build
```

### Workspace notes

- Keep README at root
- Include `package.json`, `docs/`, and `examples/`
- Add GitHub and Supabase instructions
- Add Claude integration notes

---

## Supabase Integration (Detailed)

### Table definitions

```sql
create table watchlist (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  items jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table ai_responses (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  prompt text not null,
  response text not null,
  created_at timestamptz default now()
);
```

### Watchlist persistence example

```typescript
await supabase.from('watchlist').upsert({
  user_id: profile.displayId,
  items: watchlist.items,
});
```

### AI log persistence example

```typescript
await supabase.from('ai_responses').insert({
  user_id: profile.displayId,
  prompt,
  response: aiResult.reply,
  created_at: new Date().toISOString(),
});
```

---

## Claude AI Integration (Detailed)

### Prompt example

```typescript
const prompt = `Recommend five modern action films with strong storytelling.`;
const aiResult = await dsf.ai.chat(prompt);
console.log(aiResult.reply);
```

### Data-driven prompts

```typescript
const movie = await dsf.movies.getDetails(12345);
const prompt = `Summarize ${movie.title} as the perfect weekend pick.`;
const response = await dsf.ai.chat(prompt);
console.log(response.reply);
```

### Saving AI responses

```typescript
await supabase.from('ai_responses').insert({
  user_id: profile.displayId,
  prompt,
  response: response.reply,
});
```

---

## Additional Examples

### Build a content discovery page

```typescript
const discoverPage = async () => {
  const [popularMovies, trendingTv, topNews] = await Promise.all([
    dsf.movies.getPopular({ limit: 10 }),
    dsf.tv.getPopular({ limit: 10 }),
    dsf.news.getTop({ limit: 5 }),
  ]);

  return { popularMovies, trendingTv, topNews };
};
```

### Build a watchlist sync job

```typescript
async function syncWatchlist(profile: any) {
  const watchlist = await dsf.user.getWatchlist();
  await supabase.from('watchlist').upsert({
    user_id: profile.displayId,
    items: watchlist.items,
  });
}
```

### Build a referral tracker

```typescript
const referral = await dsf.user.getReferral();
await supabase.from('referrals').insert({
  user_id: profile.displayId,
  referral_code: referral.code,
  created_at: new Date().toISOString(),
});
```

### Build a Claude-powered recommendation flow

```typescript
const prompt = `Create a feel-good movie watchlist for a rainy evening.`;
const aiResult = await dsf.ai.chat(prompt);
console.log(aiResult.reply);
```

---

## FAQ

### Q: What package name should I use?
A: Use `dsflix-sdk`.

### Q: Can I use this SDK in browser applications?
A: Yes, it supports browser-friendly HTTP requests.

### Q: How do I use Supabase with DSFlix?
A: Use the Supabase client to persist watchlist or AI logs.

### Q: What is the best way to use Claude?
A: Use DSFlix metadata with a natural prompt and call `dsf.ai.chat()`.

### Q: Why does npm publish fail?
A: Usually because the package version already exists or auth is missing.

### Q: How do I add Onspace alias support?
A: Add alias metadata and startup info to your Onspace workspace.

---

## Changelog

### 1.0.2

- Added expanded README with Onspace, GitHub, Claude, and Supabase guidance
- Added integration examples and advanced patterns
- Added mock mode and error handling sections

### 1.0.1

- Fixed package metadata
- Added mock mode and example flows

### 1.0.0

- Initial release
- Core modules for movies, TV, search, user, coins, membership, music, news, and home

---

## Contributing

### How to contribute

- Fork the repository
- Create a branch
- Make changes and add tests
- Update documentation
- Open a pull request

### Contribution checklist

- [ ] Code builds cleanly
- [ ] Tests pass
- [ ] Docs updated
- [ ] Changelog updated
- [ ] Version bump if needed

---

## License

MIT © [DSFlix Team](https://dawensflix.com)

---

## Links

- 🌐 Website: https://dawensflix.com
- 📖 API Docs: https://dawensflix.com/docs
- 🧩 GitHub: https://github.com/dawiniefleury00-star/dsflix-developer-sdk
- 💬 Claude: https://claude.ai
- 🧠 Supabase: https://supabase.com
- 🚀 Onspace: https://onspace.build

---

## Appendix

### Aliases and workspace table

| Alias | Purpose |
|---|---|
| `dsflix-sdk` | Main package alias |
| `dsflix-dev` | Developer workspace alias |
| `dsflix-onspace` | Onspace workspace alias |
| `dsflix-docs` | Docs workspace alias |
| `dsflix-claude` | Claude integration alias |
| `dsflix-supabase` | Supabase integration alias |

### Workflow table

| Workflow | Command |
|---|---|
| Install | `npm install` |
| Build | `npm run build` |
| Test | `npm test` |
| Publish | `npm publish --access public` |
| Mock | `node -e "..."` |

---

## Extended documentation

This README now includes long-form reference content, integration patterns, and usage examples for GitHub, Onspace, Claude, and Supabase.

If you want, I can also create a dedicated `docs/integrations.md` and `examples/` templates for Supabase and Claude.
