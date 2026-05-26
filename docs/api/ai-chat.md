# API Reference: `dsf.ai.chat()`

---

## Signature

```typescript
dsf.ai.chat(message: string, context?: string): Promise<AIChatResponse>
```

---

## Parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | `string` | ✅ Yes | The user's message to the AI |
| `context` | `string` | No | System prompt or conversation context |

---

## Returns

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

## Basic Example

```typescript
const res = await dsf.ai.chat('What are the best sci-fi movies of 2024?');

console.log(res.id);           // "chat-abc123"
console.log(res.reply);        // "Here are some standout sci-fi films..."
console.log(res.usage.total_tokens);  // 145
```

---

## With Context

```typescript
const res = await dsf.ai.chat(
  'Recommend something for a family movie night',
  'You are a friendly movie assistant. Focus on family-friendly content available on DSFlix. Keep answers to 3-5 recommendations.'
);

console.log(res.reply);
```

---

## Streaming Assistant Loop

```typescript
const conversation = [
  'I like action movies',
  'Something with a twist ending',
  'What about something older, from the 90s?',
];

for (const msg of conversation) {
  const res = await dsf.ai.chat(msg);
  console.log(`User: ${msg}`);
  console.log(`AI: ${res.reply}\n`);
  // Note: context memory is not persisted between calls.
  // Pass previous exchange in 'context' for continuity.
}
```

---

## Rate Limits

| Plan | AI Requests/Day |
|------|----------------|
| Free | 10 |
| Plus | 50 |
| Pro | 200 |

---

## Error: 429 Rate Limit

```typescript
try {
  await dsf.ai.chat('Hello!');
} catch (err) {
  if (err instanceof DsfError && err.statusCode === 429) {
    console.log('Daily AI limit reached. Upgrade your plan for more requests.');
  }
}
```

---

## Error: 422 Missing Message

```typescript
try {
  await dsf.ai.chat('');
} catch (err) {
  // statusCode: 422, message: "message is required in request body."
}
```

---

## Powered By

The DSFlix AI is powered by **Gemini 3 Flash** via OnSpace AI, with full knowledge of DSFlix's content catalog, API endpoints, and platform features.
