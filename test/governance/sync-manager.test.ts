import { describe, expect, it } from "vitest";
import {
  Semaphore,
  BoundedSemaphore,
  Event,
  Barrier,
  RLock,
  EntityMutationManager,
  allowManagerLifecycleTransition,
  issueManagerToken,
  tokenIsValid,
  revokeToken,
  reconcileBeforeRelease,
  scopeKey,
} from "../../src/governance";

const scope = { tenantId: "t1", workspace: "ws", service: "ikes" };

describe("sync manager", () => {
  it("bounds semaphore permits and rejects overflow release", async () => {
    const sem = new BoundedSemaphore(1);
    await sem.acquire();
    expect(sem.availablePermits).toBe(0);
    sem.release();
    expect(() => sem.release()).toThrow();
  });

  it("semaphore times out when exhausted", async () => {
    const sem = new Semaphore(1);
    await sem.acquire();
    await expect(sem.acquire(10)).rejects.toThrow(/timeout/);
  });

  it("event, barrier and reentrant lock behave", async () => {
    const event = new Event();
    expect(event.isSet()).toBe(false);
    const waiter = event.wait(1000);
    event.set();
    await waiter;

    const barrier = new Barrier(2);
    await Promise.all([barrier.wait(1000), barrier.wait(1000)]);

    const lock = new RLock();
    const owner = await lock.acquire();
    await lock.acquire(1000, owner);
    lock.release(owner);
    expect(lock.isLocked()).toBe(true);
    lock.release(owner);
    expect(lock.isLocked()).toBe(false);
  });

  it("serializes mutation by entity and scopes correctly", async () => {
    const manager = new EntityMutationManager();
    const order: number[] = [];
    await Promise.all([
      manager.mutate(scope, "e1", async () => { order.push(1); await new Promise((r) => setTimeout(r, 5)); order.push(2); }),
      manager.mutate(scope, "e1", async () => { order.push(3); }),
    ]);
    expect(order).toEqual([1, 2, 3]);
    expect(scopeKey(scope)).toBe("t1/ws/ikes");
    expect(() => manager.assertNoLocksHeld()).not.toThrow();
  });

  it("enforces lifecycle transitions and token validity", () => {
    expect(allowManagerLifecycleTransition("INITIAL", "STARTED")).toBe(true);
    expect(allowManagerLifecycleTransition("INITIAL", "SHUTDOWN")).toBe(false);

    const token = issueManagerToken({ scope, capabilities: ["read"], ttlMs: 1000, at: "2026-01-01T00:00:00Z" });
    expect(tokenIsValid(token, new Date("2026-01-01T00:00:00.500Z"))).toBe(true);
    expect(tokenIsValid(token, new Date("2026-01-01T01:00:00Z"))).toBe(false);
    expect(tokenIsValid(revokeToken(token), new Date("2026-01-01T00:00:00.500Z"))).toBe(false);
  });

  it("reconciles git/index/bookpi before release", () => {
    expect(reconcileBeforeRelease({ git: "a", index: "a", bookpi: "a" }).reconciled).toBe(true);
    const divergent = reconcileBeforeRelease({ git: "a", index: "b", bookpi: "a" });
    expect(divergent.reconciled).toBe(false);
    expect(divergent.divergent.length).toBeGreaterThan(0);
  });
});
