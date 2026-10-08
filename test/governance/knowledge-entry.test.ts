import { describe, expect, it } from "vitest";
import {
  createKnowledgeEntry,
  runIkesPipeline,
  toEpistemicStatus,
  toTemporalStatus,
  decidePreservation,
  EPISTEMIC_STATUSES,
  TEMPORAL_STATUSES,
  IKES_PIPELINE,
} from "../../src/memory/knowledge-entry";

describe("IKES knowledge entry", () => {
  it("creates a canonical entry with KNO id and null git commit", () => {
    const entry = createKnowledgeEntry({ entityId: "ENT-1", provenanceId: "PRV-1", evidenceIds: ["src-1"] });
    expect(entry.id).toMatch(/^KNO-[0-9A-F]{8}$/);
    expect(entry.gitCommit).toBeNull();
    expect(entry.epistemicStatus).toBe("E0_UNVERIFIED");
    expect(entry.temporalStatus).toBe("current");
  });

  it("maps engine states to canonical statuses", () => {
    expect(toEpistemicStatus("E4_REPRODUCIBLE")).toBe("E4_EMPIRICALLY_REPRODUCIBLE");
    expect(EPISTEMIC_STATUSES).toContain("E6_ESTABLISHED");
    expect(TEMPORAL_STATUSES).toContain("superseded");
    expect(toTemporalStatus("historical")).toBe("historical");
  });

  it("is fail-closed: no release without evidence and policy gate", () => {
    const entry = createKnowledgeEntry({ entityId: "ENT-1", provenanceId: "PRV-1" });
    const blocked = runIkesPipeline({ entry, sanitizationAdmitted: true, policyGateGranted: true });
    expect(blocked.released).toBe(false);

    const released = runIkesPipeline({
      entry: createKnowledgeEntry({ entityId: "ENT-1", provenanceId: "PRV-1", evidenceIds: ["src-1"] }),
      sanitizationAdmitted: true,
      policyGateGranted: true,
      gitCommit: "a".repeat(40),
      indexed: true,
    });
    expect(released.released).toBe(true);
    expect(released.stages.map((s) => s.stage)).toEqual([...IKES_PIPELINE]);
  });

  it("only deletes on identical/verified duplicate, otherwise preserves", () => {
    expect(decidePreservation("IDENTICAL_ARTIFACT")).toBe("ALLOW_DELETE");
    expect(decidePreservation("VERIFIED_DUPLICATE")).toBe("ALLOW_DELETE");
    expect(decidePreservation("LIKELY_UPDATE")).toBe("PRESERVE");
    expect(decidePreservation("ENRICHMENT")).toBe("PRESERVE");
    expect(decidePreservation("DISTINCT")).toBe("PRESERVE");
  });
});
