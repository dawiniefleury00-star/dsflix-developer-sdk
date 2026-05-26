// ─────────────────────────────────────────────────────────────
//  DSFlix SDK  –  src/error.ts
//  Custom error class for all DSFlix API errors
// ─────────────────────────────────────────────────────────────

export class DsfError extends Error {
  public statusCode: number;
  public detail?: string;

  constructor(message: string, statusCode: number, detail?: string) {
    super(message);
    this.name = 'DsfError';
    this.statusCode = statusCode;
    this.detail = detail;
    // Maintain proper prototype chain in TypeScript
    Object.setPrototypeOf(this, DsfError.prototype);
  }
}
