# AI Chat

The `dsf.ai` module provides access to the DSFlix AI assistant — powered by Gemini 3 Flash.

---

## Overview

The AI assistant is trained on streaming content data and can answer questions about movies, TV shows, recommendations, genres, actors, and more.

**Rate limit:** 10 requests per day (free tier)

---

## `chat(message, context?)`

```typescript
const response = await dsf.ai.chat(
  'What are the best thriller movies from 2023?'
);

console.log(response.reply);
// "Here are some standout thrillers from 2023: 1. Oppenheimer..."

console.log(response.usage.total_tokens);  // 145
```

---

## With Context

You can pass a `context` string to guide the AI's behavior:

```typescript
const response = await dsf.ai.chat(
  'Recommend something similar',
  'The user just finished watching Fight Club and loves dark psychological dramas.'
);

console.log(response.reply);
// "Based on your love of Fight Club, here are similar films: ..."
```

---

## Response Object

```typescript
interface AIChatResponse {
  id: string;
  reply: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

---

## Example: Movie Recommendation Bot

```typescript
const questions = [
  'I like action movies with plot twists',
  'Give me top 5 sci-fi series to binge',
  'What was the highest rated movie in 2024?',
];

for (const q of questions) {
  const res = await dsf.ai.chat(q);
  console.log(`Q: ${q}`);
  console.log(`A: ${res.reply}\n`);
}
```

---

## Rate Limit Error

When the daily limit (10 requests) is exceeded:

```json
{
  "error": "Daily AI request limit reached. Upgrade your plan for more.",
  "status_code": 429
}
```

Catch it gracefully:

```typescript
import { DsfError } from 'dsflix-sdk';

try {
  const res = await dsf.ai.chat('Hello!');
} catch (err) {
  if (err instanceof DsfError && err.statusCode === 429) {
    console.log('AI limit reached — try again tomorrow');
  }
}
```
