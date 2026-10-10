/**
 * TTL cache with single-flight request coalescing for expensive health probes.
 * Successful results are cached; failures are not cached so recovery is immediate.
 */
export class TtlSingleFlight<T> {
  private value: T | undefined;
  private expiresAt = 0;
  private inFlight: Promise<T> | undefined;

  constructor(private readonly ttlMs: number) {
    if (!Number.isFinite(ttlMs) || ttlMs < 1) throw new Error("TTL_CACHE_TTL_INVALID");
  }

  async get(loader: () => Promise<T>, now = Date.now()): Promise<T> {
    if (this.value !== undefined && now < this.expiresAt) return this.value;
    if (this.inFlight) return this.inFlight;

    const pending = loader();
    this.inFlight = pending;
    try {
      const result = await pending;
      this.value = result;
      this.expiresAt = Date.now() + this.ttlMs;
      return result;
    } catch (error) {
      this.value = undefined;
      this.expiresAt = 0;
      throw error;
    } finally {
      if (this.inFlight === pending) this.inFlight = undefined;
    }
  }

  invalidate(): void {
    this.value = undefined;
    this.expiresAt = 0;
  }
}
