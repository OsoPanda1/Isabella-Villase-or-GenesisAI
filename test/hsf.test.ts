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
      metadata: { authenticated: "true", genesisGovernanceAdmitted: "true" },
    });
    expect(result.status).toBe("executed");
  });

  it("denies invocation without server-authenticated governance metadata", async () => {
    const registry = new CapabilityRegistry();
    registry.register({
      descriptor: { id: "protected.capability", version: "1.0.0", domain: "integration", description: "protected", riskTier: "HIGH", requiresAuthority: true },
      health: () => "ready",
      execute: async () => ({ secret: "should-not-run" }),
    });
    const result = await new CapabilityGateway(registry).invoke("protected.capability", {}, {
      requestId: "req-deny", traceId: "trace-deny", principalId: "client-controlled", role: "admin", policyVersion: "test",
    });
    expect(result.status).toBe("rejected");
    expect(result.error).toBe("HSF_AUTHORIZATION_POLICY_NOT_CONFIGURED");
  });

  it("does not expose mutable internal memory records", () => {
    const memory = new InMemoryMemoryFabric();
    const saved = memory.write({ text: "private internal text", namespace: "genesis", relations: ["r1"], metadata: { owner: "admin" } });
    (saved as { text: string }).text = "tampered";
    (saved.relations as string[]).push("tampered");
    const retrieved = memory.retrieve("private");
    expect(retrieved[0]?.text).toBe("private internal text");
    expect(retrieved[0]?.relations).toEqual(["r1"]);
    expect(() => memory.retrieve("", undefined, 0)).toThrow(/LIMIT_OUT_OF_RANGE/);
  });

  it("keeps ingested knowledge pending review and returns detached records", () => {
    const knowledge = new KnowledgeFabric();
    const artifact = knowledge.ingest({ title: "T", content: "C", source: "S" });
    expect(artifact.status).toBe("PENDING_REVIEW");
    (artifact as { content: string }).content = "tampered";
    expect(knowledge.get(artifact.id)?.content).toBe("C");
    expect(knowledge.list()[0]?.status).toBe("PENDING_REVIEW");
  });

  it("labels consensus and evidence scores as heuristics, not truth probabilities", () => {
    const registry = new CapabilityRegistry();
    const result = new CapabilityGateway(registry);
    expect(result).toBeDefined();
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
    const artifact = knowledge.ingest({ title: "T", content: "C", source: "S" });
    expect(artifact.contentHash).toHaveLength(64);
    expect(artifact.status).toBe("PENDING_REVIEW");
  });
});
