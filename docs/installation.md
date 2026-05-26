# Installation

---

## npm

```bash
npm install dsflix-sdk
```

## yarn

```bash
yarn add dsflix-sdk
```

## pnpm

```bash
pnpm add dsflix-sdk
```

## bun

```bash
bun add dsflix-sdk
```

---

## TypeScript Support

The SDK is written in TypeScript and ships with full type definitions. No `@types/` package needed.

```typescript
import { DsfClient, DsfError } from 'dsflix-sdk';
import type { Movie, UserProfile, CoinBalance } from 'dsflix-sdk';
```

---

## CommonJS

```javascript
const { DsfClient } = require('dsflix-sdk');
```

---

## ES Modules (browser)

```html
<script type="module">
  import { DsfClient } from 'https://cdn.jsdelivr.net/npm/dsflix-sdk/dist/index.esm.js';

  const dsf = new DsfClient({ apiKey: 'dfx-your-key' });
  const movies = await dsf.movies.getPopular();
  console.log(movies);
</script>
```

---

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 16.0.0 |
| TypeScript | ≥ 4.5 (optional) |
| Browsers | Chrome 80+, Firefox 75+, Safari 14+, Edge 80+ |

---

## Verify Installation

```typescript
import { DsfClient } from 'dsflix-sdk';

const dsf = new DsfClient({ apiKey: 'dfx-test' });
console.log('DSFlix SDK installed successfully!');
```
