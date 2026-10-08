import { describe, expect, it } from "vitest";
import { CapabilityGateway, CapabilityRegistry, InMemoryMemoryFabric, KnowledgeFabric } from "../src/capabilities";

describe("HSF", () => {
  it("invokes a registered capability", async () => {
    const registry = new CapabilityRegistry();
    registry.register({
      descriptor: { id: "test.capability", version: "1.0.0", domain: "integration", description: "test", riskTier: "LOW", requiresAuthority: true },
      health: () => "ready",
      execute: async (input) => ({ ok: true, input }),
    });
    const result = await new CapabilityGateway(registry).invoke("test.capability", { value: 7 }, {
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
    const memory = new InMemoryMemoryFabric();
    const a = memory.write({ text: "Genesis knowledge", namespace: "genesis", relations: [] });
    const b = memory.write({ text: "Genesis knowledge", namespace: "genesis", relations: [] });
    expect(a.id).toBe(b.id);
    const knowledge = new KnowledgeFabric();
    expect(knowledge.ingest({ title: "T", content: "C", source: "S" }).contentHash).toHaveLength(64);
  });
});
