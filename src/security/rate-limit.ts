export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

interface WindowState {
  startedAt: number;
  count: number;
}

/** Process-local fixed-window limiter. It reduces accidental/low-effort abuse but is not a distributed WAF. */
export class FixedWindowRateLimiter {
  private readonly windows = new Map<string, WindowState>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
    private readonly maxKeys = 10_000,
  ) {
    if (!Number.isInteger(limit) || limit < 1) throw new Error("RATE_LIMIT_LIMIT_INVALID");
    if (!Number.isFinite(windowMs) || windowMs < 1) throw new Error("RATE_LIMIT_WINDOW_INVALID");
  }

  consume(key: string, now = Date.now()): RateLimitDecision {
    const normalizedKey = key.trim();
    if (!normalizedKey) throw new Error("RATE_LIMIT_KEY_REQUIRED");
    let state = this.windows.get(normalizedKey);
    if (!state || now - state.startedAt >= this.windowMs || now < state.startedAt) {
      state = { startedAt: now, count: 0 };
      this.windows.set(normalizedKey, state);
    }
    if (state.count >= this.limit) {
      return { allowed: false, remaining: 0, retryAfterMs: Math.max(0, this.windowMs - (now - state.startedAt)) };
    }
    state.count += 1;
    if (this.windows.size > this.maxKeys) {
      for (const [candidate, candidateState] of this.windows) {
        if (now - candidateState.startedAt >= this.windowMs || now < candidateState.startedAt) this.windows.delete(candidate);
        if (this.windows.size <= this.maxKeys) break;
      }
      while (this.windows.size > this.maxKeys) {
        const oldestKey = this.windows.keys().next().value as string | undefined;
        if (!oldestKey) break;
        this.windows.delete(oldestKey);
      }
    }
    return { allowed: true, remaining: Math.max(0, this.limit - state.count), retryAfterMs: 0 };
  }
}
