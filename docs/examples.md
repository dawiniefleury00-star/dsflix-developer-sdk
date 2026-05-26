# Examples

Real-world usage examples for common DSFlix SDK scenarios.

---

## 1. Movie Discovery App

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({ apiKey: process.env.DSF_API_KEY! });

async function discoverMovies() {
  const [popular, trending, topRated] = await Promise.all([
    dsf.movies.getPopular({ page: 1 }),
    dsf.movies.getTrending('week'),
    dsf.movies.getTopRated({ page: 1 }),
  ]);

  return {
    popular: popular.results.slice(0, 5),
    trending: trending.results.slice(0, 5),
    topRated: topRated.results.slice(0, 5),
  };
}

const home = await discoverMovies();
console.log('Popular:', home.popular.map(m => m.title));
```

---

## 2. Search with Auto-Complete

```typescript
async function autoComplete(query: string) {
  if (query.length < 2) return [];

  const results = await dsf.search.multi(query, { page: 1 });

  return results.results.slice(0, 8).map(item => ({
    id: item.id,
    title: item.title || item.name || '',
    type: item.media_type,
    year: (item.release_date || item.first_air_date || '').split('-')[0],
    rating: item.vote_average,
  }));
}

// Usage
const suggestions = await autoComplete('Aveng');
```

---

## 3. User Dashboard

```typescript
async function getUserDashboard() {
  const [profile, balance, notifications, watchlist] = await Promise.all([
    dsf.user.getProfile(),
    dsf.coins.getBalance(),
    dsf.user.getNotifications({ unread_only: true }),
    dsf.user.getWatchlist(),
  ]);

  return {
    user: { name: profile.username, plan: profile.plan, vip: profile.is_vip },
    coins: { balance: balance.coins, rewards: balance.reward_coins },
    unread: notifications.unread_count,
    watchlistCount: watchlist.total_results,
  };
}
```

---

## 4. AI Movie Chatbot

```typescript
async function movieBot(userMessage: string) {
  const reply = await dsf.ai.chat(
    userMessage,
    'You are a helpful movie recommendation assistant for DSFlix. Keep answers concise and focused on streaming content.'
  );
  return reply.reply;
}

console.log(await movieBot('What should I watch tonight?'));
console.log(await movieBot('Best documentaries of 2025?'));
```

---

## 5. Coin Transfer

```typescript
async function sendCoinsToFriend(friendDisplayId: string, amount: number) {
  const balance = await dsf.coins.getBalance();

  if (balance.coins < amount) {
    throw new Error(`Insufficient coins. Have: ${balance.coins}, Need: ${amount}`);
  }

  const result = await dsf.coins.transfer(friendDisplayId, amount, 'Thanks!');
  console.log(`Sent ${result.amount} coins to ${result.recipient_display_id}`);
  console.log(`Remaining balance: ${result.sender_balance}`);
}
```

---

## 6. Full Movie Detail Page

```typescript
async function getMoviePage(movieId: number) {
  const [details, news] = await Promise.all([
    dsf.movies.getDetails(movieId, {
      append_to_response: 'credits,videos,similar',
    }),
    dsf.news.search(details?.title || '', { language: 'en' }),
  ]);

  return {
    movie: details,
    cast: details.credits?.cast.slice(0, 8),
    trailer: details.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube'),
    similar: details.similar?.results.slice(0, 6),
    news: news.articles.slice(0, 3),
  };
}
```

---

## 7. Membership Check & Upgrade

```typescript
async function checkAndUpgrade() {
  const status = await dsf.membership.getStatus();

  if (status.plan === 'free') {
    const { plans } = await dsf.membership.getPlans();
    const proPlan = plans.find(p => p.id === 'pro');

    console.log(`Upgrade to ${proPlan?.name} for $${proPlan?.price_monthly}/mo`);
    console.log('Features:', proPlan?.features.join(', '));

    // Upgrade using coins
    const result = await dsf.membership.upgrade('pro', 30, 'coins');
    console.log(`Upgraded! Expires: ${result.expires_at}`);
  } else {
    console.log(`Active ${status.plan} plan — ${status.days_remaining} days remaining`);
  }
}
```

---

## 8. Watch History Sync

```typescript
async function syncWatchHistory() {
  const history = await dsf.user.getWatchHistory({ page: 1, limit: 20 });

  const recentlyWatched = history.results
    .filter(item => item.progress > 0.9)  // > 90% watched
    .map(item => ({
      id: item.id,
      title: item.title,
      completed: true,
      watchedAt: item.watched_at,
    }));

  console.log(`Completed ${recentlyWatched.length} titles recently`);
  return recentlyWatched;
}
```
