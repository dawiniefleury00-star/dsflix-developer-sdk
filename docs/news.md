# News

The `dsf.news` module provides entertainment and streaming news headlines.

---

## Methods

| Method | Description |
|--------|-------------|
| `getTop(options?)` | Top headlines |
| `search(query, options?)` | Search news by keyword |

---

## `getTop(options?)`

```typescript
const news = await dsf.news.getTop({
  category: 'entertainment',
  language: 'en',
  page_size: 10,
});

console.log(`Found ${news.totalResults} articles`);
news.articles.forEach(article => {
  console.log(`📰 ${article.title}`);
  console.log(`   ${article.source} — ${article.published_at}`);
});
```

**Options:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `category` | `string` | `entertainment` | `entertainment`, `technology`, `sports`, `business` |
| `language` | `string` | `en` | Language code |
| `page_size` | `number` | `20` | Number of articles |

---

## `search(query, options?)`

```typescript
const results = await dsf.news.search('Netflix new series', {
  from: '2026-01-01',
  language: 'en',
});

results.articles.forEach(article => {
  console.log(article.title);
  console.log(article.url);
});
```

---

## NewsArticle Object

```typescript
interface NewsArticle {
  title: string;
  source: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  published_at: string;
  content: string | null;
}
```

---

## Example: News Feed

```typescript
async function getNewsFeed() {
  const [entertainment, tech] = await Promise.all([
    dsf.news.getTop({ category: 'entertainment', page_size: 5 }),
    dsf.news.getTop({ category: 'technology', page_size: 5 }),
  ]);

  return {
    entertainment: entertainment.articles,
    technology: tech.articles,
  };
}
```
