// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/modules/ai.ts
// ─────────────────────────────────────────────────────────────

import { HttpClient } from '../http';
import { AIChatResponse } from '../types';

export class AIModule {
  constructor(private http: HttpClient) {}

  /**
   * Send a message to the DSFlix AI assistant.
   * @param message - The user message to send
   * @param context - Optional system prompt or conversation context
   */
  chat(message: string, context?: string): Promise<AIChatResponse> {
    return this.http.post('/api/v2/ai/chat', { message, context });
  }
}
