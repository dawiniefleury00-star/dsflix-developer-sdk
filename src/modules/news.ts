// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/news.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import { NewsResponse, NewsTopOptions, NewsSearchOptions } from '../types';

export class NewsModule {
  constructor(private http: HttpClient) {}

  /** Get top entertainment/streaming headlines */
  getTop(options?: NewsTopOptions): Promise<NewsResponse> {
    return this.http.get('/api/v2/news/top', options as Record<string, string | number | boolean | undefined>);
  }

  /** Search for news articles by keyword */
  search(query: string, options?: NewsSearchOptions): Promise<NewsResponse> {
    return this.http.get('/api/v2/news/search', { query, ...options } as Record<string, string | number | boolean | undefined>);
  }
}
