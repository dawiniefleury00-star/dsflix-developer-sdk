# API Reference: Membership

---

## Overview

The membership module manages DSFlix subscription plans via `dsf.membership`.

---

## `dsf.membership.getPlans()`

```typescript
dsf.membership.getPlans(): Promise<MembershipPlansResponse>
```

### Returns

```typescript
interface MembershipPlansResponse {
  plans: MembershipPlan[];
}

interface MembershipPlan {
  id: 'free' | 'plus' | 'pro';
  name: string;
  color: string;          // Hex color for UI
  price_monthly: number;
  features: string[];
}
```

### Example

```typescript
const { plans } = await dsf.membership.getPlans();

plans.forEach(plan => {
  console.log(`${plan.name} — $${plan.price_monthly}/mo`);
  plan.features.forEach(f => console.log(`  ✓ ${f}`));
});
```

### Sample Response

```json
{
  "plans": [
    {
      "id": "free",
      "name": "Free",
      "color": "#6b7280",
      "price_monthly": 0,
      "features": ["100 API req/day", "Coin-gated content", "480p max"]
    },
    {
      "id": "plus",
      "name": "Plus",
      "color": "#60a5fa",
      "price_monthly": 4.99,
      "features": ["HD streaming", "Free downloads up to 1080p", "Reduced coin costs"]
    },
    {
      "id": "pro",
      "name": "Pro",
      "color": "#c084fc",
      "price_monthly": 9.99,
      "features": ["Unlimited HD + 4K", "Free downloads", "No coin gates", "VIP access"]
    }
  ]
}
```

---

## `dsf.membership.getStatus()`

```typescript
dsf.membership.getStatus(): Promise<MembershipStatus>
```

### Returns

```typescript
interface MembershipStatus {
  plan: string;
  is_active: boolean;
  expires_at: string | null;
  days_remaining: number | null;
  is_vip: boolean;
}
```

### Example

```typescript
const status = await dsf.membership.getStatus();

if (status.is_active) {
  console.log(`${status.plan} plan — ${status.days_remaining} days left`);
} else {
  console.log('No active plan');
}
```

---

## `dsf.membership.upgrade()`

```typescript
dsf.membership.upgrade(
  plan: 'plus' | 'pro',
  durationDays: number,
  paymentMethod?: string
): Promise<MembershipUpgradeResponse>
```

### Parameters

| Param | Description |
|-------|-------------|
| `plan` | `'plus'` or `'pro'` |
| `durationDays` | Duration (min 7, max 365) |
| `paymentMethod` | `'coins'` or Stripe `payment_method_id` |

### Example

```typescript
// Pay with coins
const result = await dsf.membership.upgrade('pro', 30, 'coins');
console.log(`Pro plan active until ${result.expires_at}`);

// Pay with Stripe
const stripeResult = await dsf.membership.upgrade('plus', 30, 'pm_1234567890');
```

### Error Cases

| Status | Message |
|--------|---------|
| `402` | Insufficient coins for coin payment |
| `400` | Invalid plan or duration |
| `422` | Missing required parameters |
