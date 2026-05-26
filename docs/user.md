# User

The `dsf.user` module provides access to user profile, watchlist, history, and preferences.

---

## Methods

| Method | Description |
|--------|-------------|
| `getProfile()` | Get own full profile |
| `getById(displayId)` | Get public profile by display ID |
| `getWatchlist(options?)` | Get saved watchlist |
| `addToWatchlist(mediaType, mediaId)` | Add to watchlist |
| `removeFromWatchlist(mediaId)` | Remove from watchlist |
| `getWatchHistory(options?)` | View watching history |
| `getLanguage()` | Get language preference |
| `updateLanguage(code)` | Update language |
| `getWallet()` | Full wallet summary |
| `getReferral()` | Referral code and stats |
| `getNotifications(options?)` | Notification inbox |
| `uploadPhoto(file)` | Upload profile photo |

---

## `getProfile()`

Requires user-linked API key.

```typescript
const profile = await dsf.user.getProfile();

console.log(profile.username);          // "dawens_user"
console.log(profile.display_id);        // "DFX-AB12"
console.log(profile.plan);             // "plus"
console.log(profile.coins);            // 1250
console.log(profile.is_vip);           // false
console.log(profile.checkin_streak);   // 7
```

---

## `getById(displayId)`

```typescript
const user = await dsf.user.getById('DFX-AB12');

console.log(user.username);   // "dawens_user"
console.log(user.plan);       // "plus"
```

---

## `getWatchlist(options?)`

```typescript
const list = await dsf.user.getWatchlist();

list.results.forEach(item => {
  console.log(`${item.title} (${item.media_type}) — added ${item.added_at}`);
});
```

---

## `addToWatchlist / removeFromWatchlist`

```typescript
// Add
await dsf.user.addToWatchlist('movie', 550);

// Remove
await dsf.user.removeFromWatchlist(550);
```

---

## `getWatchHistory(options?)`

```typescript
const history = await dsf.user.getWatchHistory({ page: 1, limit: 20 });

history.results.forEach(item => {
  const pct = Math.round(item.progress * 100);
  console.log(`${item.title} — ${pct}% watched`);
});
```

---

## `getLanguage() / updateLanguage()`

```typescript
const lang = await dsf.user.getLanguage();
console.log(lang.language);  // "en"

await dsf.user.updateLanguage('fr');
```

---

## `getWallet()`

```typescript
const wallet = await dsf.user.getWallet();
console.log(`Coins: ${wallet.coins}, Reward: ${wallet.reward_coins}`);
wallet.recent_transactions.forEach(tx => {
  console.log(tx.description);
});
```

---

## `getReferral()`

```typescript
const ref = await dsf.user.getReferral();

console.log(ref.referral_code);   // "DFX-AB12"
console.log(ref.referral_link);   // "https://dawensflix.com/join?ref=DFX-AB12"
console.log(ref.referral_count);  // 3
console.log(ref.coins_earned_from_referrals);  // 300
```

---

## `getNotifications(options?)`

```typescript
const notifs = await dsf.user.getNotifications({ unread_only: true, limit: 10 });

console.log(`${notifs.unread_count} unread`);
notifs.notifications.forEach(n => {
  console.log(`[${n.type}] ${n.title}`);
});
```

---

## `uploadPhoto(file)`

```typescript
const fileInput = document.getElementById('photo') as HTMLInputElement;
const file = fileInput.files?.[0];

if (file) {
  const result = await dsf.user.uploadPhoto(file);
  console.log(result.photo_url);
}
```
