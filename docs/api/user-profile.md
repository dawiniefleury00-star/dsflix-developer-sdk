# API Reference: `dsf.user.getProfile()`

---

## Signature

```typescript
dsf.user.getProfile(): Promise<UserProfile>
```

---

## Authentication

Requires a user-linked API key. Returns `401` if unauthenticated.

---

## Returns

```typescript
interface UserProfile {
  id: string;
  username: string;
  email: string;
  display_id: string;             // e.g. "DFX-AB12"
  plan: 'free' | 'plus' | 'pro';
  coins: number;
  reward_coins: number;
  checkin_streak: number;
  language: string;               // e.g. "en"
  is_vip: boolean;
  membership_expires_at: string | null;
  photo_url: string | null;
  referral_count: number;
}
```

---

## Example

```typescript
const profile = await dsf.user.getProfile();

console.log(profile.username);              // "dawens_user"
console.log(profile.email);                 // "user@example.com"
console.log(profile.display_id);            // "DFX-AB12"
console.log(profile.plan);                  // "plus"
console.log(profile.coins);                 // 1250
console.log(profile.reward_coins);          // 340
console.log(profile.checkin_streak);        // 7
console.log(profile.is_vip);                // false
console.log(profile.membership_expires_at); // "2026-06-22T00:00:00Z"
```

---

## Plan Values

| Value | Description |
|-------|-------------|
| `free` | Free tier — coin-gated content |
| `plus` | Plus plan — HD streaming, 1080p downloads |
| `pro` | Pro plan — 4K, unlimited, VIP features |

---

## Check Premium Access

```typescript
const profile = await dsf.user.getProfile();

const isPremium = profile.plan !== 'free' && (
  !profile.membership_expires_at ||
  new Date(profile.membership_expires_at) > new Date()
);

if (isPremium) {
  console.log('Welcome, premium member!');
} else {
  console.log(`You have ${profile.coins} coins`);
}
```

---

## Get Public Profile

To look up another user's public info by display ID:

```typescript
const publicProfile = await dsf.user.getById('DFX-AB12');

console.log(publicProfile.username);    // "dawens_user"
console.log(publicProfile.plan);        // "plus"
console.log(publicProfile.is_vip);      // false
// Note: email, coins, history are NOT included in public profiles
```

---

## Sample Response

```json
{
  "id": "uuid-...",
  "username": "dawens_user",
  "email": "user@example.com",
  "display_id": "DFX-AB12",
  "plan": "plus",
  "coins": 1250,
  "reward_coins": 340,
  "checkin_streak": 7,
  "language": "en",
  "is_vip": false,
  "membership_expires_at": "2026-06-22T00:00:00Z",
  "photo_url": "https://storage.dawensflix.com/avatars/uuid/avatar.jpg",
  "referral_count": 3
}
```
