# Search

The `dsf.search` module lets you search across movies and TV shows.

---

## Methods

| Method | Description |
|--------|-------------|
| `multi(query, options?)` | Search movies + TV simultaneously |
| `movies(query, options?)` | Search movies only |
| `tv(query, options?)` | Search TV shows only |

---

## `multi(query, options?)`

Search across both movies and TV shows in a single request. Each result includes a `media_type` field.

```typescript
const results = await dsf.search.multi('The Office');

results.results.forEach(item => {
  if (item.media_type === 'tv') {
    console.log('TV:', item.name);
  } else if (item.media_type === 'movie') {
    console.log('Movie:', item.title);
  }
});
```

**Options:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | `number` | `1` | Page number |
| `language` | `string` | `en-US` | Language code |
| `include_adult` | `boolean` | `false` | Include adult content |

---

## `movies(query, options?)`

```typescript
const movies = await dsf.search.movies('Avengers', { page: 1 });

movies.results.forEach(m => {
  console.log(`${m.title} (${m.release_date?.split('-')[0]})`);
});
```

---

## `tv(query, options?)`

```typescript
const shows = await dsf.search.tv('Stranger Things');
console.log(shows.results[0].name);  // "Stranger Things"
```

---

## Result Object

```typescript
interface MultiSearchResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string;       // Movies
  name?: string;        // TV shows
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;    // Movies
  first_air_date?: string;  // TV shows
}
```

---

## Pagination Example

```typescript
// Fetch all pages of search results
async function getAllResults(query: string) {
  let page = 1;
  let allResults = [];

  while (true) {
    const res = await dsf.search.multi(query, { page });
    allResults.push(...res.results);
    if (page >= res.total_pages) break;
    page++;
  }

  return allResults;
}
```
