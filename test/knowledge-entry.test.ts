import { describe, expect, it } from "vitest";
import { createKnowledgeEntry, runIkesPipeline } from "../src/memory/knowledge-entry";

const entry = createKnowledgeEntry({
  entityId: "entity-1",
  provenanceId: "source-1",
  claimIds: ["claim-1"],
  evidenceIds: ["evidence-1"],
});

describe("IKES release requirements", () => {
  it("blocks release when BookPI audit IDs are absent", () => {
    const result = runIkesPipeline({
      entry,
      sanitizationAdmitted: true,
      policyGateGranted: true,
      gitCommit: "a".repeat(40),
      indexed: true,
    });
    expect(result.released).toBe(false);
    expect(result.stages.find((stage) => stage.stage === "audit")?.ok).toBe(false);
    expect(result.stages.find((stage) => stage.stage === "release")?.ok).toBe(false);
  });

  it("releases only when audit, commit, evidence and index are all present", () => {
    const result = runIkesPipeline({
      entry,
      sanitizationAdmitted: true,
      policyGateGranted: true,
      auditIds: ["bookpi-event-1"],
      gitCommit: "a".repeat(40),
      indexed: true,
    });
    expect(result.released).toBe(true);
    expect(result.entry.auditIds).toEqual(["bookpi-event-1"]);
  });
});
