/** CROWN — catálogo de capacidades y control de invocación (capability). */

import type { GovernanceTier, RiskTier } from "../authority/method-id";
import type { ApprovalRef } from "../identity/approval";
import type { Principal } from "../identity/principal";

export interface CapabilityDescriptor {
  methodId: string;
  owner: string;
  allowedRoles: readonly string[];
  riskTier: RiskTier;
  governanceTier: GovernanceTier;
  humanApprovalRequired: boolean;
}

export interface CapabilityVerdict {
  granted: boolean;
  reason: string;
  evidenceRef?: string;
}

export interface CapabilityGate {
  descriptors: Map<string, CapabilityDescriptor>;
}

export function createCapabilityGate(descriptors: readonly CapabilityDescriptor[]): CapabilityGate {
  return { descriptors: new Map(descriptors.map((d) => [d.methodId, d])) };
}

export function registerCapability(gate: CapabilityGate, descriptor: CapabilityDescriptor): void {
  gate.descriptors.set(descriptor.methodId, descriptor);
}

export interface CapabilityRequest {
  principal: Principal;
  approval?: ApprovalRef;
  requireRegistered?: boolean;
}

/**
 * La registración es la única vía de ejecución (registration → operation):
 * una capacidad sin descriptor se DENIEGA, nunca se asume por defecto.
 */
export function callGate(gate: CapabilityGate, methodId: string, req: CapabilityRequest): CapabilityVerdict {
  const descriptor = gate.descriptors.get(methodId);
  if (!descriptor) {
    return {
      granted: false,
      reason: req.requireRegistered === false ? "capacidad no registrada (admitida)" : "capacidad no registrada (DENY)",
    };
  }

  const hasRole = descriptor.allowedRoles.length === 0 || req.principal.roles.some((r) => descriptor.allowedRoles.includes(r));
  if (!hasRole) {
    return { granted: false, reason: "el principal no tiene rol autorizado para esta capacidad" };
  }

  if (descriptor.humanApprovalRequired) {
    const approvalOk = req.approval?.decision === "ALLOW" && req.approval.methodId === methodId;
    if (!approvalOk) {
      return { granted: false, reason: "capacidad requiere aprobación humana explícita" };
    }
    return {
      granted: true,
      reason: `capacidad invocada con aprobación humana ${req.approval!.approver}`,
      evidenceRef: req.approval!.evidenceId,
    };
  }

  return { granted: true, reason: `capacidad registrada como invocable en modo no privilegiado` };
}

export function approvalRequiredForGate(descriptor: CapabilityDescriptor): boolean {
  return descriptor.riskTier === "HIGH" || descriptor.riskTier === "CRITICAL";
}