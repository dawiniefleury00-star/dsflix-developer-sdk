// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/tv.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import {
  PaginatedResult,
  TVShow,
  TVShowDetails,
  Season,
  Episode,
  Credits,
  TVSearchOptions,
  PaginationOptions,
  MovieDetailsOptions,
  DownloadParams,
  DownloadResponse,
} from '../types';

export class TVModule {
  constructor(private http: HttpClient) {}

  /** Get TV shows ordered by popularity */
  getPopular(options?: PaginationOptions): Promise<PaginatedResult<TVShow>> {
    return this.http.get('/api/v2/tv/popular', options as Record<string, string | number | boolean | undefined>);
  }

  /** Get full details for a TV show */
  getDetails(seriesId: number, options?: MovieDetailsOptions): Promise<TVShowDetails> {
    return this.http.get(`/api/v2/tv/${seriesId}`, options as Record<string, string | number | boolean | undefined>);
  }

  /** Get all episodes for a specific season */
  getSeason(seriesId: number, seasonNumber: number): Promise<Season> {
    return this.http.get(`/api/v2/tv/${seriesId}/season/${seasonNumber}`);
  }

  /** Get details for a specific episode */
  getEpisode(seriesId: number, seasonNumber: number, episodeNumber: number): Promise<Episode> {
    return this.http.get(`/api/v2/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`);
  }

  /** Get cast and crew credits for a TV season */
  getCredits(seriesId: number, seasonNumber: number): Promise<Credits> {
    return this.http.get(`/api/v2/tv/${seriesId}/season/${seasonNumber}/credits`);
  }

  /** Get full cast for a TV show */
  getCast(seriesId: number): Promise<Credits> {
    return this.http.get(`/api/v2/tv/${seriesId}/cast`);
  }

  /** Search TV shows by name */
  search(query: string, options?: TVSearchOptions): Promise<PaginatedResult<TVShow>> {
    return this.http.get('/api/v2/search/tv', { query, ...options } as Record<string, string | number | boolean | undefined>);
  }

  /** Request a download link for a TV episode */
  download(params: DownloadParams): Promise<DownloadResponse> {
    return this.http.post('/api/v2/download', params);
  }
}
