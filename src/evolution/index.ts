export {
  generateControls,
  controlIdOf,
  controlMatrixDigest,
  controlSummary,
  CONTROL_COUNT,
} from "./catalog";
export { DOMAINS, DOMAIN_COUNT, planeForDomain, isKnownDomain } from "./domains";
export {
  decideHypercore,
  modeForPressure,
  isActivationAllowed,
  allActivations,
} from "./hypercore";
export {
  buildManifest,
  evolutionReport,
  controlsForDomain,
  FABRIC_VERSION,
} from "./manifest";
export {
  createEngine,
  applyControlState,
  allowTransition,
  type WiringRegistry,
  type EngineResult,
} from "./engine";
export { evolveControlState, stateRank, CONTROL_STATE_ORDER } from "./state-machine";
export type { EvolutionControl, EvolutionManifest } from "../core/types";