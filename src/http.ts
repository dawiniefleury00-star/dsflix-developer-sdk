// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/http.ts
//  Internal HTTP request wrapper with timeout, auth, and error
// ─────────────────────────────────────────────────────────────

import { DsfError } from './error';
import { DsfClientConfig, DsfErrorResponse } from './types';

export class HttpClient {
  private config: Required<DsfClientConfig>;

  constructor(config: DsfClientConfig) {
    this.config = {
      baseUrl: 'https://api.dawensflix.com',
      timeout: 10000,
      language: 'en-US',
      ...config,
    };
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.config.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    return url.toString();
  }

  async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
    const url = this.buildUrl(path, params);
    return this.request<T>(url, { method: 'GET' });
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const url = this.buildUrl(path);
    return this.request<T>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(path: string, body?: unknown): Promise<T> {
    const url = this.buildUrl(path);
    return this.request<T>(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(path: string): Promise<T> {
    const url = this.buildUrl(path);
    return this.request<T>(url, { method: 'DELETE' });
  }

  private async request<T>(url: string, init: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Accept': 'application/json',
      'X-DSFlix-SDK': 'dsflix-sdk/1.0.0',
      ...(init.headers as Record<string, string> || {}),
    };

    try {
      const response = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const errData = data as DsfErrorResponse;
        throw new DsfError(
          errData?.error || `Request failed with status ${response.status}`,
          response.status,
          errData?.detail,
        );
      }

      return data as T;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof DsfError) throw err;
      if ((err as Error).name === 'AbortError') {
        throw new DsfError('Request timed out', 408);
      }
      throw new DsfError((err as Error).message || 'Network error', 0);
    }
  }
}
