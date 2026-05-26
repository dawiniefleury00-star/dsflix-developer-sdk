# Error Handling

---

## Overview

The DSFlix SDK uses a custom `DsfError` class for all API errors. Always wrap SDK calls in try/catch blocks.

---

## `DsfError`

```typescript
import { DsfClient, DsfError } from 'dsflix-sdk';

const dsf = new DsfClient({ apiKey: 'dfx-...' });

try {
  const movies = await dsf.movies.getPopular();
} catch (err) {
  if (err instanceof DsfError) {
    console.error(`[${err.statusCode}] ${err.message}`);
    if (err.detail) console.error('Detail:', err.detail);
  } else {
    throw err;  // Re-throw non-DSFlix errors
  }
}
```

---

## `DsfError` Properties

| Property | Type | Description |
|----------|------|-------------|
| `message` | `string` | Human-readable error message |
| `statusCode` | `number` | HTTP status code |
| `detail` | `string?` | Optional additional detail |
| `name` | `string` | Always `"DsfError"` |

---

## HTTP Status Codes

| Code | Meaning | Common Cause |
|------|---------|--------------|
| `400` | Bad Request | Missing or invalid parameter |
| `401` | Unauthorized | Invalid or missing API key |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource doesn't exist |
| `408` | Timeout | Request took too long |
| `422` | Unprocessable | Required parameter missing |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Server Error | Internal API error |
| `0` | Network Error | No internet / connection refused |

---

## Per-Endpoint Errors

### Missing required parameter

```typescript
try {
  await dsf.search.movies('');  // empty query
} catch (err) {
  if (err instanceof DsfError && err.statusCode === 422) {
    console.log('query parameter is required');
  }
}
```

### Rate limit exceeded

```typescript
try {
  await dsf.ai.chat('Hello');
} catch (err) {
  if (err instanceof DsfError && err.statusCode === 429) {
    console.log('Daily limit reached. Try again tomorrow.');
  }
}
```

### Authentication required

```typescript
try {
  await dsf.user.getProfile();
} catch (err) {
  if (err instanceof DsfError && err.statusCode === 401) {
    console.log('Please log in to access your profile');
  }
}
```

---

## Global Error Handler

```typescript
function handleDsfError(err: unknown): never {
  if (err instanceof DsfError) {
    switch (err.statusCode) {
      case 401: throw new Error('Authentication required');
      case 403: throw new Error('Permission denied');
      case 404: throw new Error('Content not found');
      case 429: throw new Error('Rate limit exceeded');
      case 0:   throw new Error('Network error — check your connection');
      default:  throw new Error(`API error: ${err.message}`);
    }
  }
  throw err;
}

// Usage
try {
  const movies = await dsf.movies.getPopular();
} catch (err) {
  handleDsfError(err);
}
```

---

## Timeout Configuration

```typescript
const dsf = new DsfClient({
  apiKey: 'dfx-...',
  timeout: 5000,  // 5 second timeout
});

try {
  const result = await dsf.movies.getPopular();
} catch (err) {
  if (err instanceof DsfError && err.statusCode === 408) {
    console.log('Request timed out — try again');
  }
}
```
