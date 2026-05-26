# Membership

The `dsf.membership` module manages subscription plans.

---

## Methods

| Method | Description |
|--------|-------------|
| `getPlans()` | All available plans |
| `getStatus()` | Current membership status |
| `upgrade(plan, durationDays, paymentMethod?)` | Upgrade plan |

---

## Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 100 req/day, coin-gated content |
| **Plus** | $4.99/mo | HD streaming, free downloads up to 1080p |
| **Pro** | $9.99/mo | 4K, unlimited downloads, no coin gates, VIP access |

---

## `getPlans()`

```typescript
const { plans } = await dsf.membership.getPlans();

plans.forEach(plan => {
  console.log(`${plan.name} — $${plan.price_monthly}/mo`);
  plan.features.forEach(f => console.log(`  ✓ ${f}`));
});
```

---

## `getStatus()`

```typescript
const status = await dsf.membership.getStatus();

console.log(status.plan);           // "pro"
console.log(status.is_active);      // true
console.log(status.days_remaining); // 27
console.log(status.expires_at);     // "2026-06-22T00:00:00Z"
```

---

## `upgrade(plan, durationDays, paymentMethod?)`

```typescript
// Upgrade to Pro for 30 days using coins
const result = await dsf.membership.upgrade('pro', 30, 'coins');

console.log(result.success);       // true
console.log(result.plan);          // "pro"
console.log(result.expires_at);    // "2026-06-22T00:00:00Z"
```

```typescript
// Upgrade using Stripe
const result = await dsf.membership.upgrade('plus', 30, 'pm_stripe_payment_method_id');
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `plan` | `'plus' \| 'pro'` | Target plan |
| `durationDays` | `number` | Duration (min 7, max 365) |
| `paymentMethod` | `string` | `'coins'` or Stripe `payment_method_id` |

---

## Check Before Accessing Premium Content

```typescript
const status = await dsf.membership.getStatus();

if (!status.is_active) {
  console.log('Please upgrade your plan to access this content');
  const plans = await dsf.membership.getPlans();
  // Show upgrade options...
}
```
