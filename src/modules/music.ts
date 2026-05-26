// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/music.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import { MusicResponse, MusicSearchOptions, MusicTrendingOptions } from '../types';

export class MusicModule {
  constructor(private http: HttpClient) {}

  /** Get currently trending music tracks */
  getTrending(options?: MusicTrendingOptions): Promise<MusicResponse> {
    return this.http.get('/api/v2/music/trending', options as Record<string, string | number | boolean | undefined>);
  }

  /** Search for music tracks by title or artist */
  search(query: string, options?: MusicSearchOptions): Promise<MusicResponse> {
    return this.http.get('/api/v2/music/search', { query, ...options } as Record<string, string | number | boolean | undefined>);
  }
}
