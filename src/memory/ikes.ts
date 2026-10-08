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

function hash(value: unknown): string {
  return createHash("sha256").update((JSON.stringify(value) ?? ""), "utf8").digest("hex");
}

export class IKESEngine {
  private readonly sources = new Map<string, KnowledgeSource>();
  private readonly claims = new Map<string, KnowledgeClaim>();

  registerSource(source: KnowledgeSource): void {
    this.sources.set(source.sourceId, Object.freeze({ ...source }));
  }

  propose(proposal: KnowledgeProposal): KnowledgeClaim {
    const missing = proposal.evidenceIds.filter((id) => !this.sources.has(id));
    if (missing.length > 0) throw new Error(`IKES: evidence not registered: ${missing.join(",")}`);
    const base = {
      ...proposal.claim,
      sourceIds: [...proposal.claim.sourceIds],
      evidenceIds: [...proposal.evidenceIds],
      epistemicState: "E1_SOURCE_FOUND" as const,
    };
    const claimId = `clm_${hash(base).slice(0, 24)}`;
    const existing = this.claims.get(claimId);
    const record: KnowledgeClaim = {
      ...base,
      claimId,
      contentHash: hash(base),
      version: existing ? existing.version + 1 : 1,
    };
    this.claims.set(claimId, Object.freeze(record));
    return record;
  }

  corroborate(claimId: string, evidenceIds: readonly string[]): KnowledgeClaim {
    const claim = this.requireClaim(claimId);
    if (evidenceIds.some((id) => !this.sources.has(id))) {
      throw new Error("IKES: no se puede corroborar con evidencia inexistente.");
    }
    const next: KnowledgeClaim = {
      ...claim,
      evidenceIds: [...new Set([...claim.evidenceIds, ...evidenceIds])],
      epistemicState: "E2_CORROBORATED",
      version: claim.version + 1,
    };
    next.contentHash = hash({ ...next, contentHash: undefined });
    this.claims.set(claimId, Object.freeze(next));
    return next;
  }

  deprecate(claimId: string): KnowledgeClaim {
    const claim = this.requireClaim(claimId);
    const next = { ...claim, temporalState: "superseded" as const, epistemicState: "DP_DEPRECATED" as const, version: claim.version + 1 };
    next.contentHash = hash({ ...next, contentHash: undefined });
    this.claims.set(claimId, Object.freeze(next));
    return next;
  }

  retrieve(query: string, opts: { temporal?: TemporalState; minEvidence?: EpistemicState } = {}): KnowledgeClaim[] {
    const q = query.toLowerCase();
    return [...this.claims.values()]
      .filter((c) => opts.temporal ? c.temporalState === opts.temporal : c.temporalState === "current")
      .filter((c) => !opts.minEvidence || epistemicRank(c.epistemicState) >= epistemicRank(opts.minEvidence))
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
