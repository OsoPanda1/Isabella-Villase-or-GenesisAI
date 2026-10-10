export * from "./authority/method-id";
export * from "./core";
export * from "./ingress";
export * from "./identity";
export * from "./crown";
export * from "./evolution";
export * from "./memory";
export * from "./bookpi";
export * from "./security";
export * from "./tools";
export * from "./skills";
export * from "./observability";
export * from "./federation";
export * from "./intelligence";
export * from "./genesis";
export * from "./inference";
export { DeterministicVerifier, type VerificationCandidate, type VerificationResult as VeritasVerificationResult } from "./veritas";
export * from "./evaluation";
export * from "./deployment";
export * from "./companion/safety";
export * from "./companion/escalation";
export * from "./cognition/explainability";
export * from "./cognition/emotional-trace";
export * from "./cognition/experts";
export * from "./cognition/moe";
export * from "./territory/context";
export * from "./xr/safety";

export * from "./cognition/consent";
export * from "./cognition/orchestrator";
export * from "./cognition/sophia";
export * from "./memory/provenance";
export * from "./inference/adapters";
export * from "./deployment/canary";

export * from "./isabella";

export * from "./quantum";
export * from "./protocols";
export * from "./modules";

export * from "./capabilities";
export * from "./sanitization";
export * from "./governance";
export * from "./territory/tamv-integration";
export * from "./plugins";
export * from "./commerce";
// Desambiguación de barril: crown y capabilities exportan nombres homónimos con
// semánticas distintas (contrato de gate vs. contrato HSF). El re-export explícito
// resuelve la ambigüedad del `export *`; los alias conservan ambos contratos.
export type { CapabilityDescriptor, VerificationResult } from "./capabilities";
export type { CapabilityDescriptor as CrownCapabilityDescriptor } from "./crown";
export type { VerificationResult as CrownVerificationResult } from "./crown";
export type { CapabilityDescriptor as HsfCapabilityDescriptor } from "./capabilities";
export type { VerificationResult as HsfVerificationResult } from "./capabilities";
// `RateLimitDecision` existe en security/rate-limit (fixed window) y en
// deployment/production-ops (token bucket). Se conservan ambos con alias y se
// fija el canónico (fixed window) para resolver la ambigüedad del barril.
export type { RateLimitDecision } from "./security/rate-limit";
export type { RateLimitDecision as FixedWindowRateLimitDecision } from "./security/rate-limit";
export type { RateLimitDecision as TokenBucketRateLimitDecision } from "./deployment/production-ops";
