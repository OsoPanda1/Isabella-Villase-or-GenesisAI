/** Aprobación humana (IDENTITY & AUTHORITY — human approval). */

import type { Principal } from "./principal";
import type { PdpEffect } from "./pdp";

export interface ApprovalRef {
  evidenceId: string;
  approver: string;
  approverKind: "human";
  methodId: string;
  decision: PdpEffect;
  decidedAt: string;
  nonce: string;
}

export interface ApprovalTarget {
  methodId: string;
  action: string;
  principalId?: string;
}

export function issueHumanApproval(
  approver: Principal,
  target: ApprovalTarget,
  decision: PdpEffect,
): ApprovalRef {
  if (approver.kind !== "human") {
    throw new Error(
      "APPROVAL: sólo la conciencia humana puede aprobar; las máquinas proponen pero no deciden (Invariante Operativo).",
    );
  }
  return {
    evidenceId: crypto.randomUUID(),
    approver: approver.id,
    approverKind: "human",
    methodId: target.methodId,
    decision,
    decidedAt: new Date().toISOString(),
    nonce: crypto.randomUUID(),
  };
}

export function isRecentApproval(ref: ApprovalRef, maxAgeMs: number): boolean {
  const age = Date.now() - new Date(ref.decidedAt).getTime();
  return age >= 0 && age <= maxAgeMs;
}