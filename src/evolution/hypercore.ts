import {
  HYPERCORE_ACTIVATIONS,
  type HypercoreActivation,
  type HypercoreMode,
  type RiskTier,
  EARLY_EXIT_MAX_RISK,
} from "../core/types";

export interface HypercoreDecision {
  mode: HypercoreMode;
  activations: HypercoreActivation[];
  governanceInvariant: "PRESERVED";
  reason: string;
}

const MODE_ACTIVATIONS: Record<HypercoreMode, HypercoreActivation[]> = {
  CRUISE: ["PREFIX_CACHE", "SEMANTIC_CACHE"],
  BOOST: ["PREFIX_CACHE", "SEMANTIC_CACHE", "DRAFT_MODEL", "PARALLEL_BRANCHES", "VERIFIER_FANOUT"],
  HYPERBOOST: [
    "PREFIX_CACHE",
    "SEMANTIC_CACHE",
    "DRAFT_MODEL",
    "PARALLEL_BRANCHES",
    "VERIFIER_FANOUT",
    "EARLY_EXIT",
  ],
};

const RISK_RANK: Record<RiskTier, number> = {
  CRITICAL: 5,
  HIGH: 4,
  MEDIUM: 3,
  LOW: 2,
  NEGLIGIBLE: 1,
};

export const EARLY_EXIT_MAX_RISK_RANK = RISK_RANK[EARLY_EXIT_MAX_RISK];

export function modeForPressure(pressure: number): HypercoreMode {
  if (pressure >= 0.9) {
    return "HYPERBOOST";
  }
  if (pressure >= 0.6) {
    return "BOOST";
  }
  return "CRUISE";
}

/**
 * HYPERBOOST cambia la programación y el cómputo, NO la autoridad
 * constitucional. EARLY_EXIT se bloquea por encima de su umbral de riesgo.
 */
export function decideHypercore(mode: HypercoreMode, riskTier: RiskTier, pressure: number): HypercoreDecision {
  let activations = [...MODE_ACTIVATIONS[mode]];

  if (activations.includes("EARLY_EXIT") && RISK_RANK[riskTier] > EARLY_EXIT_MAX_RISK_RANK) {
    activations = activations.filter((a) => a !== "EARLY_EXIT");
  }

  return {
    mode,
    activations,
    governanceInvariant: "PRESERVED",
    reason:
      activations.includes("EARLY_EXIT")
        ? `HYPERBOOST con EARLY_EXIT admitido (riesgo ${riskTier} ≤ ${EARLY_EXIT_MAX_RISK}); la autoridad constitucional queda intacta`
        : `modo ${mode} sin EARLY_EXIT (riesgo ${riskTier}); aceleración sólo donde existe verificación`,
  };
}

export function isActivationAllowed(decision: HypercoreDecision, activation: HypercoreActivation): boolean {
  return decision.activations.includes(activation);
}

export function allActivations(): readonly HypercoreActivation[] {
  return HYPERCORE_ACTIVATIONS;
}