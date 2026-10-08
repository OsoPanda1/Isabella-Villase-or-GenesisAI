import { createHash } from "node:crypto";
import type { ControlState, EvolutionControl } from "../core/types";

export interface ControlEvidence {
  evidenceId: string;
  controlId: string;
  kind: "TEST" | "BENCHMARK" | "SECURITY_REVIEW" | "HUMAN_REVIEW" | "RUNTIME_TELEMETRY" | "EXTERNAL_AUDIT";
  uri?: string;
  commitSha?: string;
  observedAt: string;
  passed: boolean;
  details: string;
  digest: string;
}

export function createEvidence(input: Omit<ControlEvidence, "evidenceId" | "digest">): ControlEvidence {
  const canonical = JSON.stringify(input);
  const digest = createHash("sha256").update(canonical, "utf8").digest("hex");
  return Object.freeze({ ...input, evidenceId: `evd_${digest.slice(0, 24)}`, digest });
}

export function canPromoteToVerified(control: EvolutionControl, evidence: readonly ControlEvidence[]): boolean {
  const valid = evidence.filter((e) => e.controlId === control.id && e.passed);
  const hasRuntimeOrReview = valid.some((e) => e.kind === "RUNTIME_TELEMETRY" || e.kind === "HUMAN_REVIEW" || e.kind === "EXTERNAL_AUDIT");
  const hasIndependentTest = valid.some((e) => e.kind === "TEST" || e.kind === "SECURITY_REVIEW" || e.kind === "BENCHMARK");
  return control.state === "wired" && hasRuntimeOrReview && hasIndependentTest;
}

export function nextEvidenceState(control: EvolutionControl, evidence: readonly ControlEvidence[]): ControlState {
  if (control.state === "blocked") return "blocked";
  return canPromoteToVerified(control, evidence) ? "verified" : control.state;
}
