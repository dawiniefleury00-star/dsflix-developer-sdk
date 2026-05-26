// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/home.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import {
  HeroResponse,
  HomeSectionsResponse,
  HomeSectionsOptions,
  SplashData,
  FeaturedContent,
  FeaturedOptions,
} from '../types';

export class HomeModule {
  constructor(private http: HttpClient) {}

  /** Get the featured hero banner content */
  getHero(language?: string): Promise<HeroResponse> {
    return this.http.get('/api/v2/home/hero', { language });
  }

  /** Get all visible content carousels */
  getSections(options?: HomeSectionsOptions): Promise<HomeSectionsResponse> {
    return this.http.get('/api/v2/home/sections', options as Record<string, string | number | boolean | undefined>);
  }

  /** Get splash screen data */
  getSplash(): Promise<SplashData> {
    return this.http.get('/api/v2/home/splash');
  }

  /** Get curated featured lists (originals, coming soon, staff picks) */
  getFeatured(options?: FeaturedOptions): Promise<FeaturedContent> {
    return this.http.get('/api/v2/home/featured', options as Record<string, string | number | boolean | undefined>);
  }
}
