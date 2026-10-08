import { describe, expect, it } from "vitest";
import { SkillRegistry } from "../../src/skills/registry";
import { createPrincipal } from "../../src/identity/principal";

const principal = createPrincipal({ id: "human-1", kind: "human", roles: ["operator"] });

describe("skill registry governance", () => {
  it("blocks evidence-required skills without evidence", async () => {
    const r = new SkillRegistry();
    r.register({
      id: "evidence-skill",
      version: "1.0.0",
      methodId: "T.TOURISM.E06_UX.test.v1.0.0.MEDIUM.TERRITORIAL",
      riskTier: "MEDIUM",
      requiresEvidence: true,
      handler: async () => "ok",
    });
    const result = await r.invoke("evidence-skill", {
      requestId: "r1",
      traceId: "t1",
      input: "x",
      signals: [],
      principal,
    });
    expect(result.status).toBe("blocked");
  });

  it("blocks high-risk skills without a valid human approval", async () => {
    const r = new SkillRegistry();
    r.register({
      id: "privileged-skill",
      version: "1.0.0",
      methodId: "I.IDENTITY.E01.test.v1.0.0.HIGH.INSTITUTIONAL",
      riskTier: "HIGH",
      requiresEvidence: false,
      handler: async () => "ok",
    });
    const result = await r.invoke("privileged-skill", {
      requestId: "r2",
      traceId: "t2",
      input: "safe",
      signals: ["source:verified"],
      principal,
    });
    expect(result.status).toBe("blocked");
  });
});
