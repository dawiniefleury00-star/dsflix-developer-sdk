// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/index.ts
//  Public API barrel export
// ─────────────────────────────────────────────────────────────

// Main client
export { DsfClient } from './client';

// Error class
export { DsfError } from './error';

// All types
export type {
  DsfClientConfig,
  PaginatedResult,
  PaginationOptions,
  // Movies
  Movie,
  MovieDetails,
  MovieListOptions,
  MovieDetailsOptions,
  MovieSearchOptions,
  // TV
  TVShow,
  TVShowDetails,
  Season,
  Episode,
  // Credits
  Credits,
  CastMember,
  CrewMember,
  // Shared
  Genre,
  VideoResult,
  VideoResults,
  // Search
  MultiSearchResult,
  MultiSearchOptions,
  // AI
  AIChatResponse,
  // User
  UserProfile,
  PublicUserProfile,
  WatchlistItem,
  WatchHistoryItem,
  WatchlistAddParams,
  SuccessResponse,
  LanguageInfo,
  WalletInfo,
  ReferralInfo,
  Notification,
  NotificationsResponse,
  NotificationsOptions,
  PhotoUploadResponse,
  // Coins
  CoinBalance,
  CoinTransferParams,
  CoinTransferResponse,
  CoinConvertParams,
  CoinConvertResponse,
  Transaction,
  TransactionHistoryOptions,
  TransactionHistoryResponse,
  // Membership
  MembershipPlan,
  MembershipPlansResponse,
  MembershipStatus,
  MembershipUpgradeParams,
  MembershipUpgradeResponse,
  // Music
  Track,
  MusicResponse,
  MusicSearchOptions,
  MusicTrendingOptions,
  // News
  NewsArticle,
  NewsResponse,
  NewsTopOptions,
  NewsSearchOptions,
  // Home
  HeroContent,
  HeroResponse,
  HomeSection,
  HomeSectionsResponse,
  HomeSectionsOptions,
  SplashData,
  FeaturedContent,
  FeaturedOptions,
  // Download
  DownloadParams,
  DownloadResponse,
} from './types';
