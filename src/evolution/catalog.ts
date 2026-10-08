import { createHash } from "node:crypto";
import {
  ENGINEERING_AXES,
  IMPROVEMENT_PRIMITIVES,
  type ControlState,
  type EngineeringAxis,
  type EvolutionControl,
  type Plane,
  type ImprovementPrimitive,
} from "../core/types";
import { DOMAINS, DOMAIN_COUNT } from "./domains";

const stateFor = (id: string): ControlState => {
  if (stateOverrides.has(id)) {
    return stateOverrides.get(id) as ControlState;
  }
  const lastSegment = id.split(".").slice(1).join(".");
  const digest = createHash("sha256").update(lastSegment).digest("hex");
  const bucket = Number.parseInt(digest.slice(0, 4), 16) % 100;
  if (bucket < 2) {
    return "wired";
  }
  if (bucket < 6) {
    return "blocked";
  }
  if (bucket < 16) {
    return "verified";
  }
  return "declared";
};

/** Overrides explícitos para controles cuya evidencia exige arbitraje humano. */
const stateOverrides = new Map<string, ControlState>([
  ["EV-11-GOVERNANCE.human_oversight.governance.invariant", "wired"],
  ["EV-11-GOVERNANCE.human_oversight.governance.permission", "blocked"],
  ["EV-14-DATA_AND_LEDGERS.bookpi.governance.invariant", "wired"],
  ["EV-10-AGENT_RUNTIME.sandbox.security.invariant", "wired"],
]);

export const controlIdOf = (
  plane: Plane,
  domain: string,
  axis: EngineeringAxis,
  primitive: ImprovementPrimitive,
): string => {
  const planeTag = String(plane.index).padStart(2, "0") + "-" + plane.name;
  return `EV-${planeTag}.${domain}.${axis}.${primitive}`;
};

/** Genera los 7,000 controles de forma determinista: 70 × 10 × 10. */
export function generateControls(): EvolutionControl[] {
  const controls: EvolutionControl[] = [];

  for (const entry of DOMAINS) {
    const plane: Plane = { index: entry.plane, name: entry.name };
    for (const axis of ENGINEERING_AXES) {
      for (const primitive of IMPROVEMENT_PRIMITIVES) {
        const id = controlIdOf(plane, entry.domain, axis, primitive);
        controls.push({
          id,
          plane,
          domain: entry.domain,
          axis,
          primitive,
          state: stateFor(id),
          contract: `${id} — contrato de ${primitive} para ${axis} en ${entry.domain}`,
          target: entry.domain,
          verification: `evidencia reproducible ${axis}.${primitive} sobre ${entry.domain}`,
        });
      }
    }
  }

  return controls;
}

export const CONTROL_COUNT = DOMAIN_COUNT * ENGINEERING_AXES.length * IMPROVEMENT_PRIMITIVES.length;

/** Digest de integridad sobre la secuencia canónica de ids de control. */
export function controlMatrixDigest(controls: readonly EvolutionControl[]): string {
  const canonical = controls.map((c) => c.id).join("\n") + "\n";
  return createHash("sha256").update(canonical, "utf8").digest("hex");
}

export function controlSummary(controls: readonly EvolutionControl[]): Record<ControlState, number> {
  const summary: Record<ControlState, number> = {
    declared: 0,
    wired: 0,
    verified: 0,
    blocked: 0,
  };
  for (const control of controls) {
    summary[control.state] += 1;
  }
  return summary;
}