# Music

The `dsf.music` module provides access to music tracks on the DSFlix platform.

---

## Methods

| Method | Description |
|--------|-------------|
| `getTrending(options?)` | Get currently trending tracks |
| `search(query, options?)` | Search for music |

---

## `getTrending(options?)`

```typescript
const trending = await dsf.music.getTrending();

trending.results.forEach(track => {
  console.log(`${track.title} — ${track.artist}`);
  console.log(`  Plays: ${track.play_count?.toLocaleString()}`);
});
```

**Options:**
| Param | Type | Description |
|-------|------|-------------|
| `genre` | `string` | Filter: `pop`, `hip-hop`, `r&b`, `electronic`, `rock` |
| `limit` | `number` | Max results (default: 20) |

---

## `search(query, options?)`

```typescript
const results = await dsf.music.search('Blinding Lights');

results.results.forEach(track => {
  const mins = Math.floor(track.duration_ms / 60000);
  const secs = Math.floor((track.duration_ms % 60000) / 1000);
  console.log(`${track.title} by ${track.artist} (${mins}:${secs.toString().padStart(2, '0')})`);
});
```

---

## Track Object

```typescript
interface Track {
  track_id: string;
  title: string;
  artist: string;
  album?: string;
  duration_ms: number;
  genre?: string;
  play_count?: number;
  artwork_url?: string;
  preview_url?: string;
}
```

---

## Example: Build a Playlist

```typescript
async function buildPlaylist(genre: string) {
  const trending = await dsf.music.getTrending({ genre, limit: 10 });

  return trending.results.map(track => ({
    id: track.track_id,
    name: `${track.title} — ${track.artist}`,
    duration: track.duration_ms,
  }));
}

const playlist = await buildPlaylist('pop');
console.log('Your playlist:', playlist);
```
