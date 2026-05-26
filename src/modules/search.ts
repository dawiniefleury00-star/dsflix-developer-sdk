// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/search.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import {
  PaginatedResult,
  Movie,
  TVShow,
  MultiSearchResult,
  MultiSearchOptions,
  MovieSearchOptions,
  TVSearchOptions,
} from '../types';

export class SearchModule {
  constructor(private http: HttpClient) {}

  /** Search across movies and TV shows simultaneously */
  multi(query: string, options?: MultiSearchOptions): Promise<PaginatedResult<MultiSearchResult>> {
    return this.http.get('/api/v2/search/multi', { query, ...options } as Record<string, string | number | boolean | undefined>);
  }

  /** Search movies by title */
  movies(query: string, options?: MovieSearchOptions): Promise<PaginatedResult<Movie>> {
    return this.http.get('/api/v2/search/movie', { query, ...options } as Record<string, string | number | boolean | undefined>);
  }

  /** Search TV shows by name */
  tv(query: string, options?: TVSearchOptions): Promise<PaginatedResult<TVShow>> {
    return this.http.get('/api/v2/search/tv', { query, ...options } as Record<string, string | number | boolean | undefined>);
  }
}
