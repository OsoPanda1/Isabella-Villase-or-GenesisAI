/** CROWN capability gate — registration is mandatory and fail-closed. */
import type { GovernanceTier, RiskTier } from "../authority/method-id";
import type { ApprovalRef } from "../identity/approval";
import { verifyHumanApproval } from "../identity/approval";
import type { Principal } from "../identity/principal";

export interface CapabilityDescriptor {
  methodId: string; owner: string; allowedRoles: readonly string[]; riskTier: RiskTier;
  governanceTier: GovernanceTier; humanApprovalRequired: boolean;
}
export interface CapabilityVerdict { granted: boolean; reason: string; evidenceRef?: string; }
export interface CapabilityGate { descriptors: Map<string, CapabilityDescriptor>; }
export function createCapabilityGate(descriptors: readonly CapabilityDescriptor[]): CapabilityGate {
  return { descriptors: new Map(descriptors.map((d) => [d.methodId, d])) };
}
export function registerCapability(gate: CapabilityGate, descriptor: CapabilityDescriptor): void {
  if (gate.descriptors.has(descriptor.methodId)) throw new Error(`CROWN: capability already registered: ${descriptor.methodId}`);
  gate.descriptors.set(descriptor.methodId, descriptor);
}
export interface CapabilityRequest {
  principal: Principal;
  approval?: ApprovalRef;
  action: string;
  resource: string;
  contextHash?: string;
  policyVersion?: string;
}
export function callGate(gate: CapabilityGate, methodId: string, req: CapabilityRequest): CapabilityVerdict {
  const descriptor = gate.descriptors.get(methodId);
  if (!descriptor) return { granted: false, reason: "capacidad no registrada (DENY)" };
  const hasRole = descriptor.allowedRoles.length === 0 || req.principal.roles.some((r) => descriptor.allowedRoles.includes(r));
  if (!hasRole) return { granted: false, reason: "el principal no tiene rol autorizado para esta capacidad" };
  if (descriptor.humanApprovalRequired || descriptor.riskTier === "HIGH" || descriptor.riskTier === "CRITICAL") {
    if (
      !req.approval ||
      req.approval.decision !== "ALLOW" ||
      !verifyHumanApproval(req.approval, {
        methodId,
        action: req.action,
        resource: req.resource,
        principalId: req.principal.id,
        contextHash: req.contextHash,
        policyVersion: req.policyVersion,
      })
    ) {
      return { granted: false, reason: "capacidad requiere aprobación humana ligada al contexto real de la solicitud" };
    }
    return { granted: true, reason: `capacidad invocada con aprobación humana ${req.approval.approver}`, evidenceRef: req.approval.evidenceId };
  }
  return { granted: true, reason: "capacidad registrada como invocable en modo no privilegiado" };
}
export function approvalRequiredForGate(descriptor: CapabilityDescriptor): boolean {
  return descriptor.riskTier === "HIGH" || descriptor.riskTier === "CRITICAL";
}
