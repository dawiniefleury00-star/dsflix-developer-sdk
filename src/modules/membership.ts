// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/membership.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import {
  MembershipPlansResponse,
  MembershipStatus,
  MembershipUpgradeParams,
  MembershipUpgradeResponse,
} from '../types';

export class MembershipModule {
  constructor(private http: HttpClient) {}

  /** Get all available membership plans */
  getPlans(): Promise<MembershipPlansResponse> {
    return this.http.get('/api/v2/membership/plans');
  }

  /** Get the current user's membership status */
  getStatus(): Promise<MembershipStatus> {
    return this.http.get('/api/v2/membership/status');
  }

  /**
   * Upgrade the authenticated user to Pro or Plus plan.
   * @param plan - 'pro' or 'plus'
   * @param durationDays - Duration (min 7, max 365)
   * @param paymentMethod - 'coins' or a Stripe payment_method_id
   */
  upgrade(plan: 'plus' | 'pro', durationDays: number, paymentMethod?: string): Promise<MembershipUpgradeResponse> {
    const params: MembershipUpgradeParams = { plan, duration_days: durationDays, payment_method: paymentMethod };
    return this.http.post('/api/v2/membership/upgrade', params);
  }
}
