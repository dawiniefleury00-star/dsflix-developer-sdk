# Coins

The `dsf.coins` module manages the DSFlix coin economy — spendable coins and reward coins.

---

## Overview

DSFlix uses a dual-coin system:
- **Coins** — Spendable currency for watching content, downloading, etc.
- **Reward Coins** — Earned through tasks, referrals, and daily check-ins. Convertible at 2:1 ratio.

---

## Methods

| Method | Description |
|--------|-------------|
| `getBalance()` | Get coin and reward coin balance |
| `transfer(recipientId, amount, note?)` | Send coins to another user |
| `convert(rewardCoins)` | Convert reward coins → regular coins |
| `getTransactions(options?)` | Coin transaction history |

---

## `getBalance()`

```typescript
const balance = await dsf.coins.getBalance();

console.log(balance.coins);          // 1250
console.log(balance.reward_coins);   // 340
console.log(balance.plan);           // "plus"
console.log(balance.checkin_streak); // 7
```

---

## `transfer(recipientDisplayId, amount, note?)`

Transfer coins to another user by their display ID (format: `DFX-XXXX`).

```typescript
const result = await dsf.coins.transfer('DFX-AB12', 150, 'Thanks for the rec!');

console.log(result.success);          // true
console.log(result.sender_balance);   // 1100
console.log(result.transaction_id);   // "txn-uuid-..."
```

**Limits:** Min 1 coin, Max 10,000 coins per transfer.
**Permission required:** `coins:write`

---

## `convert(rewardCoins)`

Convert reward coins to regular coins at a 2:1 ratio (must be even, min 2).

```typescript
const result = await dsf.coins.convert(100);

console.log(result.reward_coins_used);         // 100
console.log(result.coins_received);            // 50
console.log(result.new_coins_balance);         // 1300
console.log(result.new_reward_coins_balance);  // 240
```

---

## `getTransactions(options?)`

```typescript
const history = await dsf.coins.getTransactions({ page: 1, type: 'earn' });

history.results.forEach(tx => {
  console.log(`[${tx.type}] ${tx.amount > 0 ? '+' : ''}${tx.amount} — ${tx.description}`);
});
```

**Options:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | `number` | Page number (default: 1) |
| `type` | `string` | Filter: `earn`, `spend`, `transfer`, `convert`, `admin_gift` |

---

## Transaction Types

| Type | Description |
|------|-------------|
| `earn` | Coins earned from tasks, check-ins, rewards |
| `spend` | Coins spent on content or downloads |
| `transfer` | Peer-to-peer coin transfer |
| `convert` | Reward coins converted to coins |
| `admin_gift` | Coins gifted by admin |
| `referral` | Coins earned from referrals |

---

## Ways to Earn Coins

| Activity | Reward |
|----------|--------|
| Daily check-in | 10–70 coins (streak bonus) |
| Watch 5 minutes | +500 reward coins |
| Watch 15 minutes | +1,000 reward coins |
| Refer a friend | +100 coins |
| Signup bonus | +1,000 coins |
| Follow on social | +200 reward coins |
