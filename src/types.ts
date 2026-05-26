// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/types.ts
//  Full TypeScript type definitions for the DSFlix API 2026
// ─────────────────────────────────────────────────────────────

// ── Config ───────────────────────────────────────────────────
export interface DsfClientConfig {
  /** Your DSFlix API key (format: dfx-...) */
  apiKey: string;
  /** Base URL override (default: https://api.dawensflix.com) */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 10000) */
  timeout?: number;
  /** Default language for localized content (default: 'en-US') */
  language?: string;
}

// ── Pagination ───────────────────────────────────────────────
export interface PaginatedResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface PaginationOptions {
  page?: number;
  language?: string;
}

// ── Movie ────────────────────────────────────────────────────
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  tagline?: string;
  budget?: number;
  revenue?: number;
  status?: string;
  homepage?: string;
  production_companies?: ProductionCompany[];
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
  budget: number;
  revenue: number;
  credits?: Credits;
  similar?: PaginatedResult<Movie>;
  videos?: VideoResults;
}

export interface MovieListOptions extends PaginationOptions {
  region?: string;
}

export interface MovieDetailsOptions {
  language?: string;
  append_to_response?: string;
}

export interface MovieSearchOptions extends PaginationOptions {
  year?: number;
  include_adult?: boolean;
}

// ── TV Show ──────────────────────────────────────────────────
export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: Genre[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  networks?: Network[];
  created_by?: Creator[];
  credits?: Credits;
  similar?: PaginatedResult<TVShow>;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  air_date: string;
  overview: string;
  poster_path: string | null;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  runtime: number;
  vote_average: number;
  still_path: string | null;
}

export interface TVSearchOptions extends PaginationOptions {
  include_adult?: boolean;
}

// ── Credits ──────────────────────────────────────────────────
export interface Credits {
  id?: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

// ── Shared ───────────────────────────────────────────────────
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResults {
  id: number;
  results: VideoResult[];
}

// ── Search ───────────────────────────────────────────────────
export interface MultiSearchResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export interface MultiSearchOptions extends PaginationOptions {
  include_adult?: boolean;
}

// ── AI ───────────────────────────────────────────────────────
export interface AIChatResponse {
  id: string;
  reply: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ── User ─────────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  display_id: string;
  plan: 'free' | 'plus' | 'pro';
  coins: number;
  reward_coins: number;
  checkin_streak: number;
  language: string;
  is_vip: boolean;
  membership_expires_at: string | null;
  photo_url: string | null;
  referral_count: number;
}

export interface PublicUserProfile {
  display_id: string;
  username: string;
  plan: string;
  is_vip: boolean;
  checkin_streak: number;
  photo_url: string | null;
}

export interface WatchlistItem {
  id: number;
  title: string;
  media_type: 'movie' | 'tv';
  added_at: string;
}

export interface WatchHistoryItem {
  id: number;
  title: string;
  media_type: 'movie' | 'tv';
  watched_at: string;
  progress: number;
}

export interface WatchlistAddParams {
  media_type: 'movie' | 'tv';
  media_id: number;
  watchlist: boolean;
}

export interface SuccessResponse {
  success: boolean;
  status_code?: number;
  status_message?: string;
  message?: string;
}

export interface LanguageInfo {
  language: string;
  available: { code: string; name: string }[];
}

export interface WalletInfo {
  coins: number;
  reward_coins: number;
  conversion_rate: string;
  plan: string;
  checkin_streak: number;
  last_checkin: string | null;
  recent_transactions: Transaction[];
}

export interface ReferralInfo {
  referral_code: string;
  referral_link: string;
  referral_count: number;
  coins_earned_from_referrals: number;
  coins_per_referral: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'gift';
  title: string;
  message: string | null;
  icon: string | null;
  action_url: string | null;
  read: boolean;
  created_at: string;
}

export interface NotificationsResponse {
  unread_count: number;
  notifications: Notification[];
  total: number;
}

export interface NotificationsOptions {
  unread_only?: boolean;
  limit?: number;
}

export interface PhotoUploadResponse {
  success: boolean;
  photo_url: string;
}

// ── Coins ────────────────────────────────────────────────────
export interface CoinBalance {
  coins: number;
  reward_coins: number;
  plan: string;
  last_checkin: string | null;
  checkin_streak: number;
}

export interface CoinTransferParams {
  recipient_display_id: string;
  amount: number;
  note?: string;
}

export interface CoinTransferResponse {
  success: boolean;
  transaction_id: string;
  sender_balance: number;
  recipient_display_id: string;
  amount: number;
  timestamp: string;
}

export interface CoinConvertParams {
  reward_coins: number;
}

export interface CoinConvertResponse {
  success: boolean;
  reward_coins_used: number;
  coins_received: number;
  new_coins_balance: number;
  new_reward_coins_balance: number;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'spend' | 'transfer' | 'convert' | 'admin_gift' | 'referral';
  amount: number;
  description: string;
  created_at: string;
}

export interface TransactionHistoryOptions {
  page?: number;
  type?: Transaction['type'];
}

export interface TransactionHistoryResponse {
  page: number;
  results: Transaction[];
  total_results: number;
}

// ── Membership ───────────────────────────────────────────────
export interface MembershipPlan {
  id: 'free' | 'plus' | 'pro';
  name: string;
  color: string;
  price_monthly: number;
  features: string[];
}

export interface MembershipPlansResponse {
  plans: MembershipPlan[];
}

export interface MembershipStatus {
  plan: string;
  is_active: boolean;
  expires_at: string | null;
  days_remaining: number | null;
  is_vip: boolean;
}

export interface MembershipUpgradeParams {
  plan: 'plus' | 'pro';
  duration_days: number;
  payment_method?: string;
}

export interface MembershipUpgradeResponse {
  success: boolean;
  plan: string;
  duration_days: number;
  expires_at: string;
}

// ── Music ────────────────────────────────────────────────────
export interface Track {
  track_id: string;
  title: string;
  artist: string;
  album?: string;
  duration_ms: number;
  genre?: string;
  play_count?: number;
  artwork_url?: string;
  preview_url?: string;
}

export interface MusicSearchOptions {
  limit?: number;
}

export interface MusicTrendingOptions {
  genre?: string;
  limit?: number;
}

export interface MusicResponse {
  results: Track[];
  result_count: number;
}

// ── News ─────────────────────────────────────────────────────
export interface NewsArticle {
  title: string;
  source: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  published_at: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsTopOptions {
  category?: string;
  language?: string;
  page_size?: number;
}

export interface NewsSearchOptions {
  from?: string;
  language?: string;
}

// ── Home ─────────────────────────────────────────────────────
export interface HeroContent {
  id: number;
  title: string;
  tagline: string;
  backdrop_path: string;
  vote_average: number;
  cta_label: string;
  cta_url: string;
}

export interface HeroResponse {
  hero: HeroContent;
}

export interface HomeSection {
  id: string;
  title: string;
  type: 'carousel' | 'grid' | 'featured';
  items: (Movie | TVShow)[];
}

export interface HomeSectionsResponse {
  sections: HomeSection[];
  total_sections: number;
}

export interface SplashData {
  platform: string;
  tagline: string;
  logo_url: string;
  launch_ts: string | null;
  splash_duration_ms: number;
  version: string;
}

export interface FeaturedContent {
  originals: (Movie | TVShow)[];
  coming_soon: (Movie | TVShow)[];
  staff_picks: (Movie | TVShow)[];
  weekly: (Movie | TVShow)[];
}

export interface HomeSectionsOptions {
  language?: string;
  include_premium?: boolean;
}

export interface FeaturedOptions {
  list?: 'originals' | 'coming_soon' | 'staff_picks' | 'weekly';
  limit?: number;
}

// ── Download ─────────────────────────────────────────────────
export interface DownloadParams {
  content_id: string;
  media_type: 'movie' | 'tv' | 'episode';
  quality: '480p' | '720p' | '1080p' | '2160p';
  format?: 'mp4' | 'mkv' | 'mp3';
  season?: number;
  episode?: number;
}

export interface DownloadResponse {
  success: boolean;
  download_url: string;
  title: string;
  quality: string;
  format: string;
  size_estimate: string;
  coins_spent: number;
  coins_remaining: number;
  download_id: string;
  expires_at: string | null;
}

// ── Error ────────────────────────────────────────────────────
export interface DsfErrorResponse {
  error: string;
  status_code?: number;
  detail?: string;
}
