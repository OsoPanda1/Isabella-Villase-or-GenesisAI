/** PDP — Policy Decision Point (IDENTITY & AUTHORITY — authorization). */

import type { ApprovalRef } from "./approval";
import type { ConsentRegistryLike, ConsentRequirement } from "./consent";
import { requireConsent } from "./consent";
import type { Principal } from "./principal";
import { hasPermission, principalPermissions, type RbacPolicy } from "./rbac";
import { isolatedAccess, tenantIsActive, type TenantCatalog } from "./tenant";

export type PdpEffect = "ALLOW" | "FLAG" | "DENY";

export interface PdpDecision {
  effect: PdpEffect;
  reason: string;
  admitted: boolean;
  evidenceRef?: string;
}

export interface PdpRequest {
  principal: Principal;
  action: string;
  resource: string;
  methodId: string;
  tenantId?: string;
  consent?: ConsentRequirement;
  attributeContext?: Readonly<Record<string, string | number | boolean>>;
}

export interface AttributeCondition {
  name: string;
  allowed: (ctx: Readonly<Record<string, string | number | boolean>>) => boolean;
}

export interface PdpDeps {
  rbac: RbacPolicy;
  tenants?: TenantCatalog;
  consent?: ConsentRegistryLike;
  attributeConditions?: readonly AttributeCondition[];
}

function normalizeEffect(input: unknown): PdpEffect {
  if (input === "ALLOW" || input === "FLAG" || input === "DENY") {
    return input;
  }
  return "DENY";
}

export function decidePdp(deps: PdpDeps, req: PdpRequest): PdpDecision {
  const effects: string[] = [];

  if (deps.tenants) {
    if (!tenantIsActive(deps.tenants, req.tenantId ?? req.principal.tenantId ?? "")) {
      return deny(`arrendatario inactivo o inexistente`);
    }
    if (req.tenantId && !isolatedAccess(deps.tenants, req.principal.tenantId, req.tenantId)) {
      return deny(`aislamiento de arrendatario denegado`);
    }
    effects.push("tenant-ok");
  }

  if (deps.consent && req.consent) {
    const granted = requireConsent(deps.consent, req.principal.id, req.consent);
    if (!granted) {
      return deny(`falta consentimiento para ${req.consent.purpose}:${req.consent.scope}`);
    }
    effects.push("consent-ok");
  }

  const base =
    hasPermission(deps.rbac, req.principal, req.action) ? "ALLOW" : "DENY";
  let effect = normalizeEffect(base);
  effects.push(`rbac:${base}`);

  if (req.attributeContext) {
    for (const condition of deps.attributeConditions ?? []) {
      effects.push(`attr:${condition.name}`);
    }
  }

  if (effect === "ALLOW" && req.principal.kind !== "human" && isPrivileged(req.action)) {
    effect = "FLAG";
    effects.push("machine+privileged→FLAG");
  }

  if (effect === "DENY") {
    return deny(effects.join("; "));
  }

  return { effect, reason: effects.join("; "), admitted: effect === "ALLOW" };
}

export function overrideWithHumanApproval(
  decision: PdpDecision,
  approval?: ApprovalRef,
): PdpDecision {
  if (decision.effect !== "FLAG") {
    return decision;
  }
  if (!approval || approval.decision !== "ALLOW") {
    return { ...decision, admitted: false, evidenceRef: approval?.evidenceId };
  }
  return {
    ...decision,
    effect: "ALLOW",
    admitted: true,
    evidenceRef: approval.evidenceId,
    reason: `${decision.reason}; human-approval:${approval.approver}`,
  };
}

function isPrivileged(action: string): boolean {
  return /^(delete|modify|approve|escalate|admin|impersonate|reveal|transfer)/i.test(action);
}

function deny(reason: string): PdpDecision {
  return { effect: "DENY", reason, admitted: false };
}

export { isPrivileged };