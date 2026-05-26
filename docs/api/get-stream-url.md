# API Reference: `dsf.movies.download()` / Stream URL

---

## Signature

```typescript
dsf.movies.download(params: DownloadParams): Promise<DownloadResponse>
dsf.tv.download(params: DownloadParams): Promise<DownloadResponse>
```

---

## Parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `content_id` | `string` | ✅ Yes | The DSFlix content ID |
| `media_type` | `'movie' \| 'tv' \| 'episode'` | ✅ Yes | Media type |
| `quality` | `'480p' \| '720p' \| '1080p' \| '2160p'` | ✅ Yes | Desired quality |
| `format` | `'mp4' \| 'mkv' \| 'mp3'` | No | File format (default: `mp4`) |
| `season` | `number` | For TV | Season number |
| `episode` | `number` | For episodes | Episode number |

---

## Returns

```typescript
interface DownloadResponse {
  success: boolean;
  download_url: string;    // Magnet link or direct URL
  title: string;
  quality: string;
  format: string;
  size_estimate: string;   // e.g. "~1.5 GB"
  coins_spent: number;
  coins_remaining: number;
  download_id: string;
  expires_at: string | null;
}
```

---

## Movie Download Example

```typescript
const dl = await dsf.movies.download({
  content_id: '550',
  media_type: 'movie',
  quality: '1080p',
  format: 'mp4',
});

console.log(dl.download_url);   // "magnet:?xt=urn:btih:..."
console.log(dl.coins_spent);    // 5
console.log(dl.size_estimate);  // "~1.5 GB"
```

---

## TV Episode Download Example

```typescript
const dl = await dsf.tv.download({
  content_id: 'game-of-thrones',
  media_type: 'episode',
  quality: '720p',
  season: 1,
  episode: 1,
});
```

---

## Coin Costs (Free Plan)

| Quality | Cost |
|---------|------|
| 480p | 1 coin |
| 720p | 3 coins |
| 1080p | 5 coins |
| 4K (2160p) | 10 coins |

**Pro/Plus members:** All downloads are free.

---

## Authentication

This endpoint requires authentication (user-linked API key). Returns `401` if unauthenticated.

---

## Access Restrictions

```typescript
// Check membership before downloading
const status = await dsf.membership.getStatus();

if (status.plan === 'free') {
  const balance = await dsf.coins.getBalance();
  if (balance.coins < 5) {
    console.log('Not enough coins for 1080p download');
  }
}
```
