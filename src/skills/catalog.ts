/**
 * Catálogo de skills canónicas de Isabella.
 *
 * Una skill es una unidad de capacidad con method-id, riesgo y contrato de
 * evidencia. El registro aplica gobernanza (AEGIS, evidencia, aprobación humana
 * para riesgo HIGH/CRITICAL) en la invocación.
 */
import type { SkillDescriptor } from "./registry";
import { createHash } from "node:crypto";
import { assessDeployment } from "../governance/deployment-gates";
import { evaluateQualityGates, type QualityGateInput } from "../governance/quality-gates";
import { sanitizeDocument, type RawDocument } from "../sanitization";
import { settleRoyalties, type FederationShare } from "../bookpi/royalties";
import { listIsabellaModules, ISABELLA_API_GROUPS } from "../isabella/library";
import { TAMV_INTEGRATION_MAP } from "../territory/tamv-integration";

function sha256(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value) ?? "").digest("hex");
}

export const CANONICAL_SKILLS: readonly SkillDescriptor[] = [
  {
    id: "sovereign_ingestion_pipeline",
    version: "1.0.0",
    methodId: "A.TWINS.E09_MEMORY.ingest_governed.v1.0.0.LOW.INSTITUTIONAL",
    riskTier: "LOW",
    requiresEvidence: false,
    handler: async (ctx) => {
      const raw = (ctx.input ?? {}) as RawDocument;
      const sanitized = sanitizeDocument(raw);
      return { sanitized, signals: ctx.signals };
    },
  },
  {
    id: "bookpi_royalty_distribution",
    version: "1.0.0",
    methodId: "A.TWINS.E08_DATA.distribute_royalties.v1.0.0.MEDIUM.INSTITUTIONAL",
    riskTier: "MEDIUM",
    requiresEvidence: true,
    handler: async (ctx) => {
      const input = (ctx.input ?? {}) as { totalRevenueWei?: string; shares?: FederationShare[] };
      return settleRoyalties(BigInt(input.totalRevenueWei ?? 0), input.shares ?? []);
    },
  },
  {
    id: "quality_gate_arbiter",
    version: "1.0.0",
    methodId: "N.IDENTITY.E03_GOVERNANCE.arbitrate_quality.v1.0.0.MEDIUM.INSTITUTIONAL",
    riskTier: "MEDIUM",
    requiresEvidence: true,
    handler: async (ctx) => evaluateQualityGates(ctx.input as QualityGateInput),
  },
  {
    id: "deployment_readiness_arbiter",
    version: "1.0.0",
    methodId: "N.IDENTITY.E03_GOVERNANCE.arbitrate_deployment.v1.0.0.HIGH.CONSTITUTIONAL",
    riskTier: "HIGH",
    requiresEvidence: true,
    handler: async (ctx) => {
      const input = (ctx.input ?? {}) as {
        target?: Parameters<typeof assessDeployment>[0];
        gates?: Parameters<typeof assessDeployment>[1];
        opts?: Parameters<typeof assessDeployment>[2];
      };
      return assessDeployment(input.target ?? { layer: "tamv-app", provider: "github" }, input.gates ?? {}, input.opts);
    },
  },
  {
    id: "territorial_library_synthesis",
    version: "1.0.0",
    methodId: "T.TOURISM.E06_UX.synthesize_library.v1.0.0.LOW.TERRITORIAL",
    riskTier: "LOW",
    requiresEvidence: false,
    handler: async () => ({
      modules: listIsabellaModules().map((m) => m.id),
      apiGroups: ISABELLA_API_GROUPS.map((g) => g.id),
      tamvModules: Object.keys(TAMV_INTEGRATION_MAP),
      digest: sha256({ modules: listIsabellaModules().length, apiGroups: ISABELLA_API_GROUPS.length }),
    }),
  },
  {
    id: "evidence_manifest_seal",
    version: "1.0.0",
    methodId: "N.PATRIMONY.E11_VERITAS.seal_evidence.v1.0.0.MEDIUM.INSTITUTIONAL",
    riskTier: "MEDIUM",
    requiresEvidence: true,
    handler: async (ctx) => ({
      sealed: true,
      manifestDigest: sha256(ctx.input),
      signals: ctx.signals,
      sealedAt: new Date().toISOString(),
    }),
  },
];