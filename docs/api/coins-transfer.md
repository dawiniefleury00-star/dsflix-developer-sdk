# API Reference: `dsf.coins.transfer()`

---

## Signature

```typescript
dsf.coins.transfer(
  recipientDisplayId: string,
  amount: number,
  note?: string
): Promise<CoinTransferResponse>
```

---

## Parameters

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `recipientDisplayId` | `string` | ✅ Yes | Recipient's display ID (format: `DFX-XXXX`) |
| `amount` | `number` | ✅ Yes | Coins to send (min: 1, max: 10,000) |
| `note` | `string` | No | Optional message (max 200 chars) |

---

## Returns

```typescript
interface CoinTransferResponse {
  success: boolean;
  transaction_id: string;
  sender_balance: number;      // Remaining balance after transfer
  recipient_display_id: string;
  amount: number;
  timestamp: string;           // ISO 8601
}
```

---

## Example

```typescript
const result = await dsf.coins.transfer('DFX-AB12', 150, 'Thanks for the referral!');

console.log(result.success);                 // true
console.log(result.transaction_id);          // "txn-uuid-..."
console.log(result.sender_balance);          // 1100
console.log(result.amount);                  // 150
console.log(result.recipient_display_id);    // "DFX-AB12"
console.log(result.timestamp);               // "2026-05-22T12:00:00Z"
```

---

## Validation

The SDK enforces:
- `amount` must be a positive integer
- `recipientDisplayId` format: `DFX-XXXX` (case-insensitive)
- You cannot transfer to yourself

---

## Required Permission

This endpoint requires **`coins:write`** permission on your API key.

Keys with `readonly` permission will receive a `403 Forbidden` error.

---

## Error Cases

| Status | Message |
|--------|---------|
| `403` | Insufficient permissions (needs `coins:write`) |
| `404` | Recipient display ID not found |
| `422` | Amount out of range (min 1, max 10000) |
| `400` | Cannot transfer to your own account |
| `402` | Insufficient coin balance |

```typescript
import { DsfError } from 'dsflix-sdk';

try {
  await dsf.coins.transfer('DFX-AB12', 5000);
} catch (err) {
  if (err instanceof DsfError) {
    if (err.statusCode === 404) console.log('User not found');
    if (err.statusCode === 402) console.log('Not enough coins');
  }
}
```

---

## Check Balance First

```typescript
async function safeTransfer(to: string, amount: number) {
  const balance = await dsf.coins.getBalance();

  if (balance.coins < amount) {
    throw new Error(`Need ${amount} coins, have ${balance.coins}`);
  }

  return dsf.coins.transfer(to, amount);
}
```
