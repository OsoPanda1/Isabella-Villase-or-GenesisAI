/** IDENTITY & AUTHORITY — PrincipalContext (quién pregunta). */

export type PrincipalKind = "human" | "machine" | "service";

export interface Principal {
  id: string;
  kind: PrincipalKind;
  displayName?: string;
  tenantId?: string;
  roles: readonly string[];
  attributes: Readonly<Record<string, string | number | boolean>>;
}

export interface PrincipalContext {
  principal: Principal;
  scope: string;
  methodId: string;
  requestId?: string;
  traceId?: string;
}

export function createPrincipal(partial: Omit<Principal, "roles" | "attributes"> & {
  roles?: readonly string[];
  attributes?: Record<string, string | number | boolean>;
}): Principal {
  return {
    id: partial.id,
    kind: partial.kind,
    displayName: partial.displayName,
    tenantId: partial.tenantId,
    roles: partial.roles ?? [],
    attributes: partial.attributes ?? {},
  };
}

export function isHuman(p: Principal): boolean {
  return p.kind === "human";
}

export function assertBalancedAuthority(p: Principal): void {
  if (p.kind !== "human" && p.roles.includes("admin")) {
    throw new Error(
      "IDENTITY: una máquina no puede ostentar rol 'admin' sin delegación humana explícita (Invariante Operativo).",
    );
  }
}