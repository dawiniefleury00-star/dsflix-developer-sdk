// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/movies.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import {
  PaginatedResult,
  Movie,
  MovieDetails,
  MovieListOptions,
  MovieDetailsOptions,
  MovieSearchOptions,
  Credits,
  DownloadParams,
  DownloadResponse,
} from '../types';

export class MoviesModule {
  constructor(private http: HttpClient) {}

  /** Get movies ordered by popularity */
  getPopular(options?: MovieListOptions): Promise<PaginatedResult<Movie>> {
    return this.http.get('/api/v2/movies/popular', options as Record<string, string | number | boolean | undefined>);
  }

  /** Get trending movies for 'day' or 'week' */
  getTrending(timeWindow: 'day' | 'week' = 'day', language?: string): Promise<PaginatedResult<Movie>> {
    return this.http.get(`/api/v2/trending/movie/${timeWindow}`, { language });
  }

  /** Get top rated movies */
  getTopRated(options?: MovieListOptions): Promise<PaginatedResult<Movie>> {
    return this.http.get('/api/v2/movies/top-rated', options as Record<string, string | number | boolean | undefined>);
  }

  /** Get movies currently in theatres */
  getNowPlaying(options?: MovieListOptions): Promise<PaginatedResult<Movie>> {
    return this.http.get('/api/v2/movies/now-playing', options as Record<string, string | number | boolean | undefined>);
  }

  /** Get upcoming movies */
  getUpcoming(options?: MovieListOptions): Promise<PaginatedResult<Movie>> {
    return this.http.get('/api/v2/movies/upcoming', options as Record<string, string | number | boolean | undefined>);
  }

  /** Get full details for a movie by ID */
  getDetails(movieId: number, options?: MovieDetailsOptions): Promise<MovieDetails> {
    return this.http.get(`/api/v2/movies/${movieId}`, options as Record<string, string | number | boolean | undefined>);
  }

  /** Get cast and crew for a movie */
  getCast(movieId: number): Promise<Credits> {
    return this.http.get(`/api/v2/movies/${movieId}/cast`);
  }

  /** Search movies by title */
  search(query: string, options?: MovieSearchOptions): Promise<PaginatedResult<Movie>> {
    return this.http.get('/api/v2/search/movie', { query, ...options } as Record<string, string | number | boolean | undefined>);
  }

  /** Request a download link for a movie */
  download(params: DownloadParams): Promise<DownloadResponse> {
    return this.http.post('/api/v2/download', params);
  }
}
