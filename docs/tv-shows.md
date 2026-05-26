# TV Shows

The `dsf.tv` module provides access to all TV series endpoints.

---

## Methods

| Method | Description |
|--------|-------------|
| `getPopular(options?)` | TV shows ordered by popularity |
| `getDetails(seriesId, options?)` | Full show details |
| `getSeason(seriesId, seasonNumber)` | All episodes in a season |
| `getEpisode(seriesId, seasonNumber, episodeNumber)` | Single episode details |
| `getCredits(seriesId, seasonNumber)` | Season cast and crew |
| `getCast(seriesId)` | Full show cast |
| `search(query, options?)` | Search by name |
| `download(params)` | Request an episode download |

---

## `getPopular(options?)`

```typescript
const shows = await dsf.tv.getPopular({ page: 1 });
console.log(shows.results[0].name);  // "Game of Thrones"
```

---

## `getDetails(seriesId, options?)`

```typescript
const show = await dsf.tv.getDetails(1399, {
  append_to_response: 'credits,similar',
});

console.log(show.name);                // "Game of Thrones"
console.log(show.number_of_seasons);   // 8
console.log(show.number_of_episodes);  // 73
```

---

## `getSeason(seriesId, seasonNumber)`

```typescript
const season = await dsf.tv.getSeason(1399, 1);
console.log(season.name);             // "Season 1"
console.log(season.episodes.length);  // 10
console.log(season.episodes[0].name); // "Winter Is Coming"
```

---

## `getEpisode(seriesId, seasonNumber, episodeNumber)`

```typescript
const ep = await dsf.tv.getEpisode(1399, 1, 1);
console.log(ep.name);          // "Winter Is Coming"
console.log(ep.runtime);       // 62 (minutes)
console.log(ep.vote_average);  // 8.1
```

---

## `getCredits(seriesId, seasonNumber)`

```typescript
const credits = await dsf.tv.getCredits(1399, 1);
credits.cast.forEach(actor => {
  console.log(`${actor.name} → ${actor.character}`);
});
```

---

## `getCast(seriesId)`

```typescript
const cast = await dsf.tv.getCast(1399);
console.log(cast.cast[0].name);  // "Kit Harington"
```

---

## `search(query, options?)`

```typescript
const results = await dsf.tv.search('Breaking Bad');
console.log(results.results[0].name);  // "Breaking Bad"
```

---

## `download(params)` — Episode Download

```typescript
const link = await dsf.tv.download({
  content_id: 'got-s01e01',
  media_type: 'episode',
  quality: '720p',
  season: 1,
  episode: 1,
});
console.log(link.download_url);
```

---

## Episode Object

```typescript
interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  runtime: number;
  vote_average: number;
  still_path: string | null;
}
```
