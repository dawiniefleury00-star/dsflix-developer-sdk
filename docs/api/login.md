# API Reference: Authentication & Login

---

## Overview

Authentication in the DSFlix API is key-based. There is no `login()` function in the SDK — instead, user sessions are managed server-side via Supabase Auth. Your API key (`dfx-...`) is associated with your user account.

---

## Initializing with API Key

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({
  apiKey: 'dfx-your-api-key-here',
});
```

---

## Getting Your API Key

Programmatically, you can retrieve active keys for a user from the `admin_api_keys` table (if you have admin access):

```typescript
// Server-side only — requires admin access
const key = await adminClient
  .from('admin_api_keys')
  .select('api_key, key_name, status')
  .eq('user_id', userId)
  .eq('status', 'active')
  .limit(1)
  .single();
```

---

## HTTP Header

All requests sent by the SDK include:

```http
Authorization: Bearer dfx-your-api-key-here
Accept: application/json
X-DSFlix-SDK: dsflix-sdk/1.0.0
```

---

## Key Validation

The SDK validates key format on initialization:

```typescript
// ✅ Valid
new DsfClient({ apiKey: 'dfx-abc123...' });

// ❌ Throws immediately
new DsfClient({ apiKey: 'invalid-key' });
// Error: Invalid apiKey format. Keys must start with "dfx-".
```

---

## Session vs. API Key

| Method | Use Case |
|--------|----------|
| API Key (`dfx-...`) | Server-to-server, developer integrations, bots |
| User Session (JWT) | Frontend apps with full user auth via Supabase |

For frontend apps built on DawensFlix, use Supabase Auth directly. The SDK is designed for **developer integrations and backend services**.

---

## Key Permissions

```typescript
// Check before calling write endpoints
const balance = await dsf.coins.getBalance();

// If key has 'readonly' permission, transfer will throw 403
try {
  await dsf.coins.transfer('DFX-XY99', 100);
} catch (err) {
  if (err instanceof DsfError && err.statusCode === 403) {
    console.log('This key does not have coins:write permission');
  }
}
```

---

## Revoking / Rotating Keys

Keys are managed in the [API Dashboard](https://dawensflix.com/api-dashboard). To rotate:

1. Create a new key
2. Update your `DSF_API_KEY` environment variable
3. Pause or delete the old key
