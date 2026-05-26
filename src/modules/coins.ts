// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/coins.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import {
  CoinBalance,
  CoinTransferParams,
  CoinTransferResponse,
  CoinConvertParams,
  CoinConvertResponse,
  TransactionHistoryResponse,
  TransactionHistoryOptions,
} from '../types';

export class CoinsModule {
  constructor(private http: HttpClient) {}

  /** Get the current user's coin and reward coin balance */
  getBalance(): Promise<CoinBalance> {
    return this.http.get('/api/v2/coins/balance');
  }

  /**
   * Transfer coins to another DSFlix user by their display ID.
   * Requires coins:write permission. Min 1 coin, max 10,000 per request.
   */
  transfer(recipientDisplayId: string, amount: number, note?: string): Promise<CoinTransferResponse> {
    const params: CoinTransferParams = { recipient_display_id: recipientDisplayId, amount, note };
    return this.http.post('/api/v2/coins/transfer', params);
  }

  /**
   * Convert reward coins to regular coins at a 2:1 ratio.
   * Amount must be even and ≥ 2.
   */
  convert(rewardCoins: number): Promise<CoinConvertResponse> {
    const params: CoinConvertParams = { reward_coins: rewardCoins };
    return this.http.post('/api/v2/coins/convert', params);
  }

  /** Get the user's coin transaction history */
  getTransactions(options?: TransactionHistoryOptions): Promise<TransactionHistoryResponse> {
    return this.http.get('/api/v2/coins/transactions', options as Record<string, string | number | boolean | undefined>);
  }
}
