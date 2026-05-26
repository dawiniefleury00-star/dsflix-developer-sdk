# Getting Started

> **DSFlix SDK** — Up and running in under 5 minutes

---

## Prerequisites

- Node.js 16 or higher
- A DSFlix API key — [Get one free](https://dawensflix.com/api-dashboard)

---

## Step 1: Install

```bash
npm install dsflix-sdk
```

---

## Step 2: Initialize the client

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({
  apiKey: 'dfx-your-api-key-here',
});
```

---

## Step 3: Make your first request

```typescript
// Get popular movies
const movies = await dsf.movies.getPopular();
console.log(movies.results[0].title);
// → "Fight Club"
```

---

## Step 4: Explore the API

```typescript
// Search for movies
const results = await dsf.search.multi('Oppenheimer');
console.log(results.results);

// Get trending TV shows
const trending = await dsf.tv.getPopular();
console.log(trending.results[0].name);

// Chat with AI assistant
const ai = await dsf.ai.chat('What are some good sci-fi movies from 2024?');
console.log(ai.reply);

// Get your coin balance (requires auth)
const balance = await dsf.coins.getBalance();
console.log(`You have ${balance.coins} coins`);
```

---

## Full Example

```typescript
import { DsfClient, DsfError } from 'dsflix-sdk';

const dsf = new DsfClient({ apiKey: 'dfx-your-api-key-here' });

async function main() {
  try {
    // Fetch trending movies for today
    const trending = await dsf.movies.getTrending('day');
    console.log('🔥 Trending today:');
    trending.results.slice(0, 3).forEach(m => {
      console.log(`  - ${m.title} (${m.release_date?.split('-')[0]}) ⭐ ${m.vote_average}`);
    });

    // Search for a specific movie
    const search = await dsf.search.movies('The Matrix');
    const matrix = search.results[0];
    console.log('\n🎬 Found:', matrix.title);

    // Get full details with credits
    const details = await dsf.movies.getDetails(matrix.id, {
      append_to_response: 'credits',
    });
    console.log('Director:', details.credits?.crew.find(c => c.job === 'Director')?.name);

  } catch (err) {
    if (err instanceof DsfError) {
      console.error(`API Error [${err.statusCode}]: ${err.message}`);
    }
  }
}

main();
```

---

## Next Steps

- [Authentication](./authentication.md) — Understand API keys and permissions
- [Movies](./movies.md) — Full movie API reference
- [Error Handling](./error-handling.md) — Handle errors gracefully
- [Examples](./examples.md) — More real-world examples
