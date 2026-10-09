import { describe, expect, it } from "vitest";
import { FixedWindowRateLimiter } from "../../src/security/rate-limit";

describe("FixedWindowRateLimiter", () => {
  it("allows up to the configured limit and then denies", () => {
    const limiter = new FixedWindowRateLimiter(2, 1000);
    expect(limiter.consume("ip-a", 100).allowed).toBe(true);
    expect(limiter.consume("ip-a", 200).allowed).toBe(true);
    expect(limiter.consume("ip-a", 300)).toMatchObject({ allowed: false, remaining: 0, retryAfterMs: 800 });
  });

  it("resets after the window and isolates keys", () => {
    const limiter = new FixedWindowRateLimiter(1, 1000);
    expect(limiter.consume("ip-a", 100).allowed).toBe(true);
    expect(limiter.consume("ip-b", 200).allowed).toBe(true);
    expect(limiter.consume("ip-a", 1100).allowed).toBe(true);
  });

  it("rejects invalid limits and empty keys", () => {
    expect(() => new FixedWindowRateLimiter(0, 1000)).toThrow(/LIMIT_INVALID/);
    expect(() => new FixedWindowRateLimiter(1, 1000).consume(" ")).toThrow(/KEY_REQUIRED/);
  });
});
