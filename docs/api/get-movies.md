# API Reference: `dsf.movies.getPopular()`

---

## Signature

```typescript
dsf.movies.getPopular(options?: MovieListOptions): Promise<PaginatedResult<Movie>>
```

---

## Parameters

| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `options.page` | `number` | No | `1` | Page number (max 500) |
| `options.language` | `string` | No | `en-US` | ISO 639-1 language code |
| `options.region` | `string` | No | — | ISO 3166-1 region filter |

---

## Returns

```typescript
interface PaginatedResult<Movie> {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

---

## Example

```typescript
const movies = await dsf.movies.getPopular({ page: 1, language: 'en-US' });

console.log(movies.page);           // 1
console.log(movies.total_pages);    // 500
console.log(movies.total_results);  // 10000

const first = movies.results[0];
console.log(first.id);              // 550
console.log(first.title);           // "Fight Club"
console.log(first.vote_average);    // 8.4
console.log(first.poster_path);     // "/pB8BM7pdSp6B6Ih7QZ4DrQ.jpg"
```

---

## Sample Response

```json
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "overview": "An insomniac office worker and a devil-may-care soap maker...",
      "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ.jpg",
      "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
      "release_date": "1999-10-15",
      "vote_average": 8.4,
      "vote_count": 27000,
      "popularity": 35.9,
      "genre_ids": [18, 53]
    }
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

---

## Related Methods

- `dsf.movies.getTrending()` — Trending in last 24h/week
- `dsf.movies.getTopRated()` — Highest-rated of all time
- `dsf.movies.getNowPlaying()` — Currently in theatres
- `dsf.movies.getUpcoming()` — Coming soon
