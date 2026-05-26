# Streaming

The DSFlix API provides stream URL generation for movies and TV episodes. Stream URLs are returned by the `/api/v2/download` endpoint.

---

## Getting a Stream URL

```typescript
const response = await dsf.movies.download({
  content_id: '550',
  media_type: 'movie',
  quality: '1080p',
  format: 'mp4',
});

console.log(response.download_url);
// "magnet:?xt=urn:btih:abc123..."
```

---

## Qualities Available

| Quality | Resolution | Coin Cost (free) |
|---------|-----------|-----------------|
| `480p` | 854×480 | 1 coin |
| `720p` | 1280×720 | 3 coins |
| `1080p` | 1920×1080 | 5 coins |
| `2160p` | 3840×2160 (4K) | 10 coins |

Pro/Plus plan members stream and download for **free**.

---

## Formats

| Format | Description |
|--------|-------------|
| `mp4` | Standard video (default) |
| `mkv` | Matroska with subtitles |
| `mp3` | Audio only |

---

## TV Episode Streaming

```typescript
const ep = await dsf.tv.download({
  content_id: 'got-s01e01',
  media_type: 'episode',
  quality: '720p',
  season: 1,
  episode: 1,
});

console.log(ep.download_url);
console.log(ep.coins_spent);   // 3 (for 720p)
```

---

## Quality Gating

Content access is gated by subscription plan:

| Plan | Available Qualities |
|------|-------------------|
| Free | 480p (costs coins) |
| Plus | Up to 1080p (free) |
| Pro | All qualities including 4K (free) |

---

## Embed Sources

The DSFlix platform uses multiple embed providers with automatic failover:

1. VidSrc Pro
2. SuperEmbed
3. VidSrc (alternate)
4. 2embed
5. AutoEmbed
6. MoviesAPI
7. Vidsrc.to
8. NontonGo

Stream URLs rotate automatically every 4 seconds if a source fails.

---

## Download Response

```typescript
interface DownloadResponse {
  success: boolean;
  download_url: string;
  title: string;
  quality: string;
  format: string;
  size_estimate: string;    // e.g. "~1.5 GB"
  coins_spent: number;
  coins_remaining: number;
  download_id: string;
  expires_at: string | null;
}
```
