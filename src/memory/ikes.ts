import { createHash } from "node:crypto";

export type EpistemicState =
  | "E0_UNVERIFIED"
  | "E1_SOURCE_FOUND"
  | "E2_CORROBORATED"
  | "E3_ACADEMICALLY_SUPPORTED"
  | "E4_REPRODUCIBLE"
  | "E5_VALIDATED"
  | "E6_ESTABLISHED"
  | "ED_DISPUTED"
  | "EX_REJECTED"
  | "DP_DEPRECATED";

export type TemporalState = "current" | "historical" | "superseded";

export interface KnowledgeClaim {
  claimId: string;
  subject: string;
  predicate: string;
  object: string;
  sourceIds: readonly string[];
  evidenceIds: readonly string[];
  epistemicState: EpistemicState;
  temporalState: TemporalState;
  validFrom?: string;
  validUntil?: string;
  license?: string;
  provenance: Readonly<Record<string, string>>;
  contentHash: string;
  version: number;
}

export interface KnowledgeSource {
  sourceId: string;
  uri: string;
  title: string;
  publisher?: string;
  publishedAt?: string;
  retrievedAt: string;
  contentHash: string;
  license?: string;
}

export interface KnowledgeProposal {
  claim: Omit<KnowledgeClaim, "claimId" | "contentHash" | "version" | "epistemicState">;
  proposedBy: string;
  evidenceIds: readonly string[];
}

export function hashSourceContent(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

function hash(value: unknown): string {
  return createHash("sha256").update((JSON.stringify(value) ?? ""), "utf8").digest("hex");
}


const CLAIM_HASH_FIELDS = [
  "subject", "predicate", "object", "sourceIds", "evidenceIds",
  "epistemicState", "temporalState", "validFrom", "validUntil", "license", "provenance",
] as const;

function claimContentHash(claim: Pick<KnowledgeClaim, (typeof CLAIM_HASH_FIELDS)[number]>): string {
  return hash({
    subject: claim.subject,
    predicate: claim.predicate,
    object: claim.object,
    sourceIds: [...claim.sourceIds],
    evidenceIds: [...claim.evidenceIds],
    epistemicState: claim.epistemicState,
    temporalState: claim.temporalState,
    validFrom: claim.validFrom,
    validUntil: claim.validUntil,
    license: claim.license,
    provenance: { ...claim.provenance },
  });
}

/** Recomputes the canonical claim payload hash; it does not authenticate the source. */
export function verifyKnowledgeClaimIntegrity(claim: KnowledgeClaim): boolean {
  return /^[a-f0-9]{64}$/i.test(claim.contentHash) && claim.contentHash === claimContentHash(claim);
}

function freezeClaim(claim: KnowledgeClaim): KnowledgeClaim {
  return Object.freeze({
    ...claim,
    sourceIds: Object.freeze([...claim.sourceIds]),
    evidenceIds: Object.freeze([...claim.evidenceIds]),
    provenance: Object.freeze({ ...claim.provenance }),
  });
}

export class IKESEngine {
  private readonly sources = new Map<string, KnowledgeSource>();
  private readonly claims = new Map<string, KnowledgeClaim>();

  registerSource(source: KnowledgeSource): void {
    if (!source.sourceId.trim() || !source.title.trim()) throw new Error("IKES_SOURCE_METADATA_REQUIRED");
    if (!/^[a-f0-9]{64}$/i.test(source.contentHash)) throw new Error("IKES_SOURCE_HASH_MUST_BE_SHA256");
    if (!Number.isFinite(Date.parse(source.retrievedAt))) throw new Error("IKES_SOURCE_RETRIEVED_AT_INVALID");
    let parsedUri: URL;
    try { parsedUri = new URL(source.uri); } catch { throw new Error("IKES_SOURCE_URI_INVALID"); }
    if (parsedUri.protocol !== "https:" && parsedUri.protocol !== "http:") throw new Error("IKES_SOURCE_URI_SCHEME_NOT_ALLOWED");
    const existing = this.sources.get(source.sourceId);
    if (existing && existing.contentHash !== source.contentHash) throw new Error("IKES_SOURCE_ID_HASH_CONFLICT");
    if (existing) return;
    this.sources.set(source.sourceId, Object.freeze({ ...source, uri: parsedUri.toString() }));
  }

  propose(proposal: KnowledgeProposal): KnowledgeClaim {
    if (!proposal || !Array.isArray(proposal.evidenceIds) || proposal.evidenceIds.length === 0) {
      throw new Error("IKES_EVIDENCE_REQUIRED");
    }
    if (!Array.isArray(proposal.claim.sourceIds) || proposal.claim.sourceIds.length === 0) throw new Error("IKES_SOURCE_IDS_REQUIRED");
    const missingEvidence = proposal.evidenceIds.filter((id) => !this.sources.has(id));
    if (missingEvidence.length > 0) throw new Error(`IKES: evidence not registered: ${missingEvidence.join(",")}`);
    const missingSources = proposal.claim.sourceIds.filter((id) => !this.sources.has(id));
    if (missingSources.length > 0) throw new Error(`IKES: source not registered: ${missingSources.join(",")}`);
    const base = {
      ...proposal.claim,
      sourceIds: [...new Set(proposal.claim.sourceIds)],
      evidenceIds: [...new Set(proposal.evidenceIds)],
      provenance: { ...proposal.claim.provenance },
      epistemicState: "E1_SOURCE_FOUND" as const,
    };
    // Claim identity is the claim itself, not the evidence bundle. New sources
    // revise one claim instead of creating a fresh E1 claim that bypasses review.
    const identity = {
      subject: base.subject,
      predicate: base.predicate,
      object: base.object,
      temporalState: base.temporalState,
      validFrom: base.validFrom,
      validUntil: base.validUntil,
      license: base.license,
      provenance: base.provenance,
    };
    const claimId = `clm_${hash(identity).slice(0, 24)}`;
    const existing = this.claims.get(claimId);
    const merged = {
      ...base,
      sourceIds: [...new Set([...(existing?.sourceIds ?? []), ...base.sourceIds])],
      evidenceIds: [...new Set([...(existing?.evidenceIds ?? []), ...base.evidenceIds])],
      epistemicState: existing?.epistemicState ?? base.epistemicState,
      temporalState: existing?.temporalState ?? base.temporalState,
      provenance: { ...base.provenance, ...(existing?.provenance ?? {}) },
    };
    const record: KnowledgeClaim = {
      ...merged,
      claimId,
      contentHash: claimContentHash(merged),
      version: existing ? existing.version + 1 : 1,
    };
    const frozen = freezeClaim(record);
    this.claims.set(claimId, frozen);
    return frozen;
  }

  corroborate(claimId: string, evidenceIds: readonly string[]): KnowledgeClaim {
    const claim = this.requireClaim(claimId);
    if (!Array.isArray(evidenceIds) || evidenceIds.length === 0) {
      throw new Error("IKES_CORROBORATION_EVIDENCE_REQUIRED");
    }
    if (["ED_DISPUTED", "EX_REJECTED", "DP_DEPRECATED"].includes(claim.epistemicState)) {
      throw new Error("IKES_CLAIM_STATE_BLOCKS_CORROBORATION");
    }
    if (evidenceIds.some((id) => !this.sources.has(id))) {
      throw new Error("IKES: no se puede corroborar con evidencia inexistente.");
    }
    const newEvidenceIds = [...new Set(evidenceIds)].filter((id) => !claim.evidenceIds.includes(id));
    if (newEvidenceIds.length === 0) throw new Error("IKES_CORROBORATION_REQUIRES_NEW_EVIDENCE");
    const next: KnowledgeClaim = {
      ...claim,
      sourceIds: [...new Set([...claim.sourceIds, ...newEvidenceIds])],
      evidenceIds: [...new Set([...claim.evidenceIds, ...newEvidenceIds])],
      epistemicState: epistemicRank(claim.epistemicState) >= epistemicRank("E2_CORROBORATED")
        ? claim.epistemicState
        : "E2_CORROBORATED",
      version: claim.version + 1,
    };
    next.contentHash = claimContentHash(next);
    const frozen = freezeClaim(next);
    this.claims.set(claimId, frozen);
    return frozen;
  }

  deprecate(claimId: string): KnowledgeClaim {
    const claim = this.requireClaim(claimId);
    const next: KnowledgeClaim = { ...claim, temporalState: "superseded", epistemicState: "DP_DEPRECATED", version: claim.version + 1 };
    next.contentHash = hash({ ...next, contentHash: undefined });
    const frozen = freezeClaim(next);
    this.claims.set(claimId, frozen);
    return frozen;
  }

  retrieve(query: string, opts: { temporal?: TemporalState; minEvidence?: EpistemicState } = {}): KnowledgeClaim[] {
    const q = query.toLowerCase();
    return [...this.claims.values()]
      .filter((c) => opts.temporal ? c.temporalState === opts.temporal : c.temporalState === "current")
      .filter((c) => opts.minEvidence
        ? epistemicRank(c.epistemicState) >= epistemicRank(opts.minEvidence)
        : !["ED_DISPUTED", "EX_REJECTED", "DP_DEPRECATED"].includes(c.epistemicState))
      .filter((c) => `${c.subject} ${c.predicate} ${c.object}`.toLowerCase().includes(q))
      .sort((a, b) => epistemicRank(b.epistemicState) - epistemicRank(a.epistemicState));
  }

  listClaims(): readonly KnowledgeClaim[] { return [...this.claims.values()]; }

  private requireClaim(id: string): KnowledgeClaim {
    const claim = this.claims.get(id);
    if (!claim) throw new Error(`IKES: claim inexistente: ${id}`);
    return claim;
  }
}

function epistemicRank(state: EpistemicState): number {
  const ranks: Record<EpistemicState, number> = {
    E0_UNVERIFIED: 0, E1_SOURCE_FOUND: 1, E2_CORROBORATED: 2, E3_ACADEMICALLY_SUPPORTED: 3,
    E4_REPRODUCIBLE: 4, E5_VALIDATED: 5, E6_ESTABLISHED: 6, ED_DISPUTED: -1, EX_REJECTED: -2, DP_DEPRECATED: -3,
  };
  return ranks[state];
}
