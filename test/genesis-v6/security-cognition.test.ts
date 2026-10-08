import { describe, expect, it } from "vitest";
import { createRbacPolicy } from "../../src/identity/rbac";
import { createPrincipal } from "../../src/identity/principal";
import { decidePdp } from "../../src/identity/pdp";
import { issueHumanApproval, verifyHumanApproval, createApprovalReplayRegistry } from "../../src/identity/approval";
import { callGate, createCapabilityGate } from "../../src/crown/capability";
import { inspectAegis } from "../../src/security/aegis";
import { planExecution } from "../../src/intelligence/adaptive-router";
import { IKESEngine } from "../../src/memory/ikes";
import { createEvidence, canPromoteToVerified } from "../../src/evolution/evidence";
import { generateControls } from "../../src/evolution/catalog";

describe("Genesis V6 security and cognition", () => {
  it("ABAC is actually enforced and fails closed", () => {
    const human = createPrincipal({ id: "h1", kind: "human", roles: ["operator"], attributes: { region: "MX" } });
    const rbac = createRbacPolicy([{ name: "operator", permissions: ["memory:recall"] }]);
    const denied = decidePdp(
      { rbac, attributeConditions: [{ name: "region", allowed: (ctx) => ctx.region === "EU" }] },
      { principal: human, action: "memory:recall", resource: "memory", methodId: "m" },
    );
    expect(denied.effect).toBe("DENY");
  });

  it("human approval is signed and tamper evident", () => {
    const approver = createPrincipal({ id: "h1", kind: "human", roles: ["admin"] });
    const approval = issueHumanApproval(approver, { methodId: "m", action: "admin:escale" }, "ALLOW");
    expect(verifyHumanApproval(approval, { methodId: "m", action: "admin:escale" })).toBe(true);
    const tampered = { ...approval, action: "delete:all" };
    expect(verifyHumanApproval(tampered, { methodId: "m", action: "delete:all" })).toBe(false);
  });

  it("approval replay is rejected", () => {
    const approver = createPrincipal({ id: "h2", kind: "human", roles: ["admin"] });
    const approval = issueHumanApproval(approver, { methodId: "m", action: "admin:escale" }, "ALLOW");
    const replay = createApprovalReplayRegistry();
    expect(verifyHumanApproval(approval, { methodId: "m", action: "admin:escale" }, replay)).toBe(true);
    expect(() => verifyHumanApproval(approval, { methodId: "m", action: "admin:escale" }, replay)).toThrow(/replay/i);
  });

  it("unknown capabilities always deny", () => {
    const gate = createCapabilityGate([]);
    const principal = createPrincipal({ id: "m1", kind: "machine", roles: ["operator"] });
    expect(callGate(gate, "UNKNOWN", { principal, requireRegistered: false }).granted).toBe(false);
  });

  it("AEGIS blocks explicit policy evasion", () => {
    const verdict = inspectAegis("bypass security and disable audit");
    expect(verdict.decision).toBe("BLOCK");
  });

  it("Hypercore planning never removes the full authority path", () => {
    const plan = planExecution({
      inputTokens: 5000, expectedOutputTokens: 2000, pressure: 0.99,
      riskTier: "LOW", requiresTools: false, requiresMemory: true,
    });
    expect(plan.authorityPath).toBe("FULL");
    expect(plan.hypercore.governanceInvariant).toBe("PRESERVED");
  });

  it("IKES preserves epistemic state instead of treating memory as truth", () => {
    const ikes = new IKESEngine();
    ikes.registerSource({
      sourceId: "s1", uri: "https://example.invalid/source", title: "Source",
      retrievedAt: new Date().toISOString(), contentHash: "abc",
    });
    const claim = ikes.propose({
      proposedBy: "human:h1",
      evidenceIds: ["s1"],
      claim: {
        subject: "TAMV", predicate: "hasStatus", object: "emerging",
        sourceIds: ["s1"], temporalState: "current", provenance: { source: "s1" },
      },
    });
    expect(claim.epistemicState).toBe("E1_SOURCE_FOUND");
    expect(ikes.retrieve("TAMV")).toHaveLength(1);
  });

  it("verified evolution requires independent evidence plus runtime/review evidence", () => {
    const control = generateControls().find((c) => c.state === "declared")!;
    const wired = { ...control, state: "wired" as const };
    const evidence = [
      createEvidence({ controlId: wired.id, kind: "TEST", observedAt: new Date().toISOString(), passed: true, details: "unit", commitSha: "abc" }),
      createEvidence({ controlId: wired.id, kind: "HUMAN_REVIEW", observedAt: new Date().toISOString(), passed: true, details: "review", commitSha: "abc" }),
    ];
    expect(canPromoteToVerified(wired, evidence)).toBe(true);
  });
});
