import { describe, expect, it } from "vitest";
import { CapabilityGateway, CapabilityRegistry, InMemoryMemoryFabric, KnowledgeFabric } from "../src/capabilities";
import type { CapabilityGatewayPolicy } from "../src/capabilities";

describe("HSF", () => {
  it("invokes a registered capability", async () => {
    const registry = new CapabilityRegistry();
    registry.register({
      descriptor: { id: "test.capability", version: "1.0.0", domain: "integration", description: "test", riskTier: "LOW", requiresAuthority: true },
      health: () => "ready",
      execute: async (input) => ({ ok: true, input }),
    });
    const allowForTest: CapabilityGatewayPolicy = { authorize: async () => ({ granted: true, reason: "TEST_POLICY" }) };
    const result = await new CapabilityGateway(registry, allowForTest).invoke("test.capability", { value: 7 }, {
      requestId: "req-1", traceId: "trace-1", principalId: "p", role: "operator", policyVersion: "test",
    });
    expect(result.status).toBe("executed");
  });

  it("fails closed for unknown capabilities and deduplicates memory", async () => {
    const gateway = new CapabilityGateway(new CapabilityRegistry());
    const result = await gateway.invoke("missing", {}, {
      requestId: "req-1", traceId: "trace-1", principalId: "p", role: "operator", policyVersion: "test",
    });
    expect(result.status).toBe("rejected");
    const registered = new CapabilityRegistry();
    registered.register({
      descriptor: { id: "registered", version: "1.0.0", domain: "integration", description: "test", riskTier: "LOW", requiresAuthority: true },
      health: () => "ready",
      execute: async () => "should not run",
    });
    const denied = await new CapabilityGateway(registered).invoke("registered", {}, {
      requestId: "req-2", traceId: "trace-2", principalId: "p", role: "operator", policyVersion: "test",
    });
    expect(denied.status).toBe("rejected");
    expect(denied.error).toBe("HSF_AUTHORIZATION_POLICY_NOT_CONFIGURED");
    const memory = new InMemoryMemoryFabric();
    const a = memory.write({ text: "Genesis knowledge", namespace: "genesis", relations: [] });
    const b = memory.write({ text: "Genesis knowledge", namespace: "genesis", relations: [] });
    expect(a.id).toBe(b.id);
    const knowledge = new KnowledgeFabric();
    expect(knowledge.ingest({ title: "T", content: "C", source: "S" }).contentHash).toHaveLength(64);
  });
});
