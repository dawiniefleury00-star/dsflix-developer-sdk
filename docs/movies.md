# Movies

The `dsf.movies` module provides access to all movie-related endpoints.

---

## Methods

| Method | Description |
|--------|-------------|
| `getPopular(options?)` | Movies ordered by popularity |
| `getTrending(timeWindow)` | Trending movies for 'day' or 'week' |
| `getTopRated(options?)` | Top-rated movies |
| `getNowPlaying(options?)` | Movies currently in theatres |
| `getUpcoming(options?)` | Upcoming releases |
| `getDetails(movieId, options?)` | Full movie details |
| `getCast(movieId)` | Cast and crew |
| `search(query, options?)` | Search by title |
| `download(params)` | Request a download link |

---

## `getPopular(options?)`

```typescript
const movies = await dsf.movies.getPopular({ page: 1, language: 'en-US' });

console.log(movies.page);          // 1
console.log(movies.total_pages);   // 500
console.log(movies.results[0].title);  // "Fight Club"
```

**Options:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | `number` | `1` | Page number (max 500) |
| `language` | `string` | `en-US` | Language code |
| `region` | `string` | — | ISO 3166-1 region code |

---

## `getTrending(timeWindow)`

```typescript
const daily = await dsf.movies.getTrending('day');
const weekly = await dsf.movies.getTrending('week');
```

---

## `getTopRated(options?)`

```typescript
const topRated = await dsf.movies.getTopRated({ page: 1 });
console.log(topRated.results[0].title);  // "The Shawshank Redemption"
```

---

## `getNowPlaying(options?)`

```typescript
const inTheatres = await dsf.movies.getNowPlaying({ region: 'US' });
```

---

## `getUpcoming(options?)`

```typescript
const coming = await dsf.movies.getUpcoming({ page: 1 });
```

---

## `getDetails(movieId, options?)`

```typescript
const movie = await dsf.movies.getDetails(550, {
  append_to_response: 'credits,videos,similar',
});

console.log(movie.title);          // "Fight Club"
console.log(movie.runtime);        // 139
console.log(movie.tagline);        // "Mischief. Mayhem. Soap."
console.log(movie.credits?.cast[0].name);  // "Edward Norton"
```

**Options:**
| Param | Type | Description |
|-------|------|-------------|
| `append_to_response` | `string` | Comma-separated: `credits`, `videos`, `similar`, `reviews` |
| `language` | `string` | Language code |

---

## `getCast(movieId)`

```typescript
const credits = await dsf.movies.getCast(550);
credits.cast.forEach(actor => {
  console.log(`${actor.name} as ${actor.character}`);
});
```

---

## `search(query, options?)`

```typescript
const results = await dsf.movies.search('Inception', { year: 2010 });
console.log(results.results[0].title);  // "Inception"
```

---

## `download(params)`

```typescript
const link = await dsf.movies.download({
  content_id: '550',
  media_type: 'movie',
  quality: '1080p',
  format: 'mp4',
});

console.log(link.download_url);    // "magnet:?xt=urn:btih:..."
console.log(link.coins_spent);     // 5
```

**Quality coin costs:**
| Quality | Coins (free plan) |
|---------|-------------------|
| 480p | 1 coin |
| 720p | 3 coins |
| 1080p | 5 coins |
| 4K (2160p) | 10 coins |

Pro/Plus members download for free.

---

## Movie Object

```typescript
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
}
```
