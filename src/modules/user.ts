// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/user.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import {
  UserProfile,
  PublicUserProfile,
  PaginatedResult,
  WatchlistItem,
  WatchlistAddParams,
  WatchHistoryItem,
  SuccessResponse,
  LanguageInfo,
  WalletInfo,
  ReferralInfo,
  NotificationsResponse,
  NotificationsOptions,
  PhotoUploadResponse,
  PaginationOptions,
} from '../types';

export class UserModule {
  constructor(private http: HttpClient) {}

  /** Get the authenticated user's full profile */
  getProfile(): Promise<UserProfile> {
    return this.http.get('/api/v2/user/profile');
  }

  /** Look up a public user profile by display ID (e.g. DFX-AB12) */
  getById(displayId: string): Promise<PublicUserProfile> {
    return this.http.get(`/api/v2/user/${displayId}`);
  }

  /** Get the user's saved watchlist */
  getWatchlist(options?: PaginationOptions): Promise<PaginatedResult<WatchlistItem>> {
    return this.http.get('/api/v2/user/watchlist', options as Record<string, string | number | boolean | undefined>);
  }

  /** Add a title to the user's watchlist */
  addToWatchlist(mediaType: 'movie' | 'tv', mediaId: number): Promise<SuccessResponse> {
    const body: WatchlistAddParams = { media_type: mediaType, media_id: mediaId, watchlist: true };
    return this.http.post('/api/v2/user/watchlist', body);
  }

  /** Remove a title from the user's watchlist */
  removeFromWatchlist(mediaId: number, mediaType: 'movie' | 'tv' = 'movie'): Promise<SuccessResponse> {
    const body: WatchlistAddParams = { media_type: mediaType, media_id: mediaId, watchlist: false };
    return this.http.post('/api/v2/user/watchlist', body);
  }

  /** Get the user's viewing history */
  getWatchHistory(options?: PaginationOptions): Promise<PaginatedResult<WatchHistoryItem>> {
    return this.http.get('/api/v2/user/history', options as Record<string, string | number | boolean | undefined>);
  }

  /** Get the user's preferred language */
  getLanguage(): Promise<LanguageInfo> {
    return this.http.get('/api/v2/user/language');
  }

  /** Update the user's preferred language */
  updateLanguage(language: string): Promise<SuccessResponse> {
    return this.http.put('/api/v2/user/language', { language });
  }

  /** Get the user's full wallet summary */
  getWallet(): Promise<WalletInfo> {
    return this.http.get('/api/v2/user/wallet');
  }

  /** Get the user's referral code, link, and earnings */
  getReferral(): Promise<ReferralInfo> {
    return this.http.get('/api/v2/user/referral');
  }

  /** Get the user's notification inbox */
  getNotifications(options?: NotificationsOptions): Promise<NotificationsResponse> {
    return this.http.get('/api/v2/user/notifications', options as Record<string, string | number | boolean | undefined>);
  }

  /**
   * Upload or replace the user's profile photo.
   * @param file - Image File object (JPEG, PNG, or WebP, max 5 MB)
   */
  uploadPhoto(file: File): Promise<PhotoUploadResponse> {
    // For file uploads, we post as JSON with base64 or use FormData
    // This uses a simplified approach — server accepts multipart/form-data
    const formData = new FormData();
    formData.append('photo', file);
    return this.http.post('/api/v2/user/photo', formData);
  }
}
