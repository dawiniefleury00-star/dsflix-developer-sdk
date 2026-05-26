# Authentication

---

## Overview

All DSFlix API requests require authentication using an **API key**. Keys follow the format:

```
dfx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Getting an API Key

1. Visit [dawensflix.com/api-dashboard](https://dawensflix.com/api-dashboard)
2. Log in or create a free account
3. Click **Create API Key**
4. Copy your key — it starts with `dfx-`

---

## Using Your API Key

Pass your API key when creating the `DsfClient`:

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({
  apiKey: 'dfx-your-api-key-here',
});
```

The SDK automatically adds the key to all requests as an HTTP header:

```
Authorization: Bearer dfx-your-api-key-here
```

---

## Key Permissions

| Permission | Access |
|------------|--------|
| `all` | Full read/write access to all endpoints |
| `readonly` | Read-only access (GET requests only) |
| `restricted` | Limited endpoint access defined per key |

You can view and manage key permissions in the [API Dashboard](https://dawensflix.com/api-dashboard).

---

## Key Tiers (Rate Limits)

| Tier | Requests/Day | Price |
|------|-------------|-------|
| Free | 100 req/day | $0 |
| Starter | 1,000 req/day | $4.99/mo |
| Pro | 10,000 req/day | $19.99/mo |
| Enterprise | Unlimited | Custom |

Request a higher tier at: [dawensflix.com/docs/get-api-key](https://dawensflix.com/docs/get-api-key)

---

## User-Authenticated Requests

Some endpoints (profile, coins, watchlist, notifications) require the user to be authenticated. The API key must be associated with an active user account.

```typescript
// This requires the key to belong to an authenticated user
const profile = await dsf.user.getProfile();
console.log(profile.email);  // Only works with user-linked key
```

---

## Security Best Practices

- **Never expose your API key** in client-side code or public repositories
- Use environment variables: `process.env.DSF_API_KEY`
- Rotate keys periodically from the API Dashboard
- Use read-only keys for public-facing applications

```typescript
const dsf = new DsfClient({
  apiKey: process.env.DSF_API_KEY!,
});
```

---

## Invalid Key Errors

```json
{
  "error": "Invalid or missing API key",
  "status_code": 401
}
```

If you see this, verify that:
1. Your key starts with `dfx-`
2. The key is active (not paused or revoked)
3. You haven't exceeded your daily quota
