# Configuration

---

## `DsfClientConfig`

All configuration is passed to `new DsfClient(config)`.

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({
  apiKey: 'dfx-your-key',       // Required
  baseUrl: 'https://api.dawensflix.com',  // Optional
  timeout: 10000,                // Optional (ms)
  language: 'en-US',             // Optional
});
```

---

## Options Reference

| Option | Type | Default | Required | Description |
|--------|------|---------|----------|-------------|
| `apiKey` | `string` | — | ✅ Yes | Your `dfx-...` API key |
| `baseUrl` | `string` | `https://api.dawensflix.com` | No | Override the API base URL |
| `timeout` | `number` | `10000` | No | Request timeout in milliseconds |
| `language` | `string` | `en-US` | No | Default language for localized responses (ISO 639-1) |

---

## Examples

### Custom timeout

```typescript
const dsf = new DsfClient({
  apiKey: 'dfx-...',
  timeout: 5000,  // 5 seconds
});
```

### French language

```typescript
const dsf = new DsfClient({
  apiKey: 'dfx-...',
  language: 'fr-FR',
});

// All movie titles/overviews will be in French by default
const movies = await dsf.movies.getPopular();
```

### Environment-based config

```typescript
const dsf = new DsfClient({
  apiKey: process.env.DSF_API_KEY!,
  baseUrl: process.env.DSF_BASE_URL || 'https://api.dawensflix.com',
  timeout: parseInt(process.env.DSF_TIMEOUT || '10000'),
});
```

---

## Supported Languages

| Code | Language |
|------|----------|
| `en-US` | English (default) |
| `fr-FR` | Français |
| `es-ES` | Español |
| `ar` | Arabic |
| `zh-CN` | Chinese (Simplified) |
| `pt-BR` | Portuguese (Brazil) |
| `de-DE` | German |
| `ja-JP` | Japanese |
| `ko-KR` | Korean |
| `it-IT` | Italian |
