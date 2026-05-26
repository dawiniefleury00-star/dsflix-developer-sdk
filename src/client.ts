// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/client.ts
//  Main DsfClient class — entry point for all API modules
// ─────────────────────────────────────────────────────────────

import { HttpClient } from './http';
import { DsfClientConfig } from './types';
import { MoviesModule } from './modules/movies';
import { TVModule } from './modules/tv';
import { SearchModule } from './modules/search';
import { AIModule } from './modules/ai';
import { UserModule } from './modules/user';
import { CoinsModule } from './modules/coins';
import { MembershipModule } from './modules/membership';
import { MusicModule } from './modules/music';
import { NewsModule } from './modules/news';
import { HomeModule } from './modules/home';

/**
 * DSFlix SDK Client
 *
 * @example
 * ```typescript
 * import { DsfClient } from 'dsflix-sdk';
 *
 * const dsf = new DsfClient({ apiKey: 'dfx-your-key-here' });
 *
 * const movies = await dsf.movies.getPopular();
 * const search = await dsf.search.multi('Inception');
 * const ai = await dsf.ai.chat('Recommend a thriller');
 * ```
 */
export class DsfClient {
  /** Movie endpoints: popular, trending, details, search, download */
  public movies: MoviesModule;
  /** TV show endpoints: popular, details, seasons, episodes */
  public tv: TVModule;
  /** Search endpoints: multi, movies, tv */
  public search: SearchModule;
  /** AI chat endpoint */
  public ai: AIModule;
  /** User endpoints: profile, watchlist, history, wallet, notifications */
  public user: UserModule;
  /** Coins endpoints: balance, transfer, convert, transactions */
  public coins: CoinsModule;
  /** Membership endpoints: plans, status, upgrade */
  public membership: MembershipModule;
  /** Music endpoints: trending, search */
  public music: MusicModule;
  /** News endpoints: top headlines, search */
  public news: NewsModule;
  /** Home endpoints: hero, sections, splash, featured */
  public home: HomeModule;

  constructor(config: DsfClientConfig) {
    if (!config.apiKey) {
      throw new Error('[DSFlix SDK] apiKey is required. Get your key at https://dawensflix.com/api-dashboard');
    }
    if (!config.apiKey.startsWith('dfx-')) {
      throw new Error('[DSFlix SDK] Invalid apiKey format. Keys must start with "dfx-".');
    }

    const http = new HttpClient(config);

    this.movies = new MoviesModule(http);
    this.tv = new TVModule(http);
    this.search = new SearchModule(http);
    this.ai = new AIModule(http);
    this.user = new UserModule(http);
    this.coins = new CoinsModule(http);
    this.membership = new MembershipModule(http);
    this.music = new MusicModule(http);
    this.news = new NewsModule(http);
    this.home = new HomeModule(http);
  }
}
