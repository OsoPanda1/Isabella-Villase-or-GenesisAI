import { createHash, randomUUID } from "node:crypto";

export type CapabilityDomain =
  | "memory" | "execution" | "knowledge" | "collective" | "verification"
  | "architecture" | "digital-twin" | "strategy" | "quantum" | "integration";

export type CapabilityStatus = "ready" | "degraded" | "unavailable";

export interface CapabilityContext {
  requestId: string;
  traceId: string;
  principalId: string;
  role: string;
  policyVersion: string;
  metadata?: Readonly<Record<string, string>>;
}

export interface CapabilityDescriptor {
  id: string;
  version: string;
  domain: CapabilityDomain;
  description: string;
  riskTier: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  requiresAuthority: boolean;
}

export interface CapabilityProvider {
  descriptor: CapabilityDescriptor;
  health(): Promise<CapabilityStatus> | CapabilityStatus;
  execute(input: unknown, context: CapabilityContext): Promise<unknown>;
}

export interface CapabilityInvocation {
  requestId: string;
  traceId: string;
  capabilityId: string;
  version: string;
  status: "executed" | "rejected" | "unavailable" | "error";
  startedAt: string;
  completedAt: string;
  latencyMs: number;
  output?: unknown;
  error?: string;
}

export class CapabilityRegistry {
  private readonly providers = new Map<string, CapabilityProvider>();

  register(provider: CapabilityProvider): void {
    if (!provider.descriptor.id || !provider.descriptor.version) throw new Error("HSF_INVALID_DESCRIPTOR");
    if (this.providers.has(provider.descriptor.id)) throw new Error(`HSF_DUPLICATE_CAPABILITY:${provider.descriptor.id}`);
    this.providers.set(provider.descriptor.id, provider);
  }

  get(id: string): CapabilityProvider {
    const provider = this.providers.get(id);
    if (!provider) throw new Error(`HSF_UNKNOWN_CAPABILITY:${id}`);
    return provider;
  }

  list(): readonly CapabilityDescriptor[] {
    return [...this.providers.values()].map((p) => p.descriptor);
  }

  async health(): Promise<readonly (CapabilityDescriptor & { status: CapabilityStatus })[]> {
    return Promise.all([...this.providers.values()].map(async (p) => ({
      ...p.descriptor,
      status: await p.health(),
    })));
  }
}

export interface CapabilityGatewayPolicy {
  authorize(capabilityId: string, context: CapabilityContext, input: unknown): Promise<{ granted: boolean; reason: string }>;
}

export class FailClosedCapabilityPolicy implements CapabilityGatewayPolicy {
  async authorize(capabilityId: string, context: CapabilityContext, _input: unknown) {
    if (!capabilityId || !context.requestId || !context.traceId || !context.principalId || !context.role) {
      return { granted: false, reason: "HSF_CONTEXT_INCOMPLETE" };
    }
    return { granted: true, reason: "HSF_CONTEXT_VALIDATED" };
  }
}

export class CapabilityGateway {
  constructor(
    private readonly registry: CapabilityRegistry,
    private readonly policy: CapabilityGatewayPolicy = new FailClosedCapabilityPolicy(),
  ) {}

  async invoke(capabilityId: string, input: unknown, context: CapabilityContext): Promise<CapabilityInvocation> {
    const requestId = context.requestId || randomUUID();
    const started = Date.now();
    const startedAt = new Date().toISOString();
    let provider: CapabilityProvider;
    try {
      provider = this.registry.get(capabilityId);
    } catch {
      return { requestId, traceId: context.traceId, capabilityId, version: "unknown", status: "rejected", startedAt, completedAt: new Date().toISOString(), latencyMs: Date.now() - started, error: "HSF_UNKNOWN_CAPABILITY" };
    }
    const authorization = await this.policy.authorize(capabilityId, context, input);
    if (!authorization.granted) {
      return { requestId, traceId: context.traceId, capabilityId, version: provider.descriptor.version, status: "rejected", startedAt, completedAt: new Date().toISOString(), latencyMs: Date.now() - started, error: authorization.reason };
    }
    const status = await provider.health();
    if (status === "unavailable") {
      return { requestId, traceId: context.traceId, capabilityId, version: provider.descriptor.version, status: "unavailable", startedAt, completedAt: new Date().toISOString(), latencyMs: Date.now() - started, error: "HSF_PROVIDER_UNAVAILABLE" };
    }
    try {
      const output = await provider.execute(input, context);
      return { requestId, traceId: context.traceId, capabilityId, version: provider.descriptor.version, status: "executed", startedAt, completedAt: new Date().toISOString(), latencyMs: Date.now() - started, output };
    } catch (error) {
      return { requestId, traceId: context.traceId, capabilityId, version: provider.descriptor.version, status: "error", startedAt, completedAt: new Date().toISOString(), latencyMs: Date.now() - started, error: error instanceof Error ? error.message : "HSF_PROVIDER_ERROR" };
    }
  }
}

export interface MemoryRecord {
  id: string;
  text: string;
  namespace: string;
  createdAt: string;
  contentHash: string;
  version: number;
  relations: readonly string[];
  metadata?: Readonly<Record<string, string>>;
}

export interface MemoryFabric {
  write(record: Omit<MemoryRecord, "id" | "createdAt" | "contentHash" | "version">): MemoryRecord;
  retrieve(query: string, namespace?: string, limit?: number): readonly MemoryRecord[];
}

export class InMemoryMemoryFabric implements MemoryFabric {
  private readonly records: MemoryRecord[] = [];
  write(record: Omit<MemoryRecord, "id" | "createdAt" | "contentHash" | "version">): MemoryRecord {
    const createdAt = new Date().toISOString();
    const contentHash = createHash("sha3-256").update(JSON.stringify(record)).digest("hex");
    const existing = this.records.find((r) => r.contentHash === contentHash);
    if (existing) return existing;
    const next = { ...record, id: randomUUID(), createdAt, contentHash, version: 1 };
    this.records.push(next);
    return next;
  }
  retrieve(query: string, namespace?: string, limit = 20): readonly MemoryRecord[] {
    const q = query.toLowerCase().trim();
    return this.records
      .filter((r) => !namespace || r.namespace === namespace)
      .map((r) => ({ r, score: q ? r.text.toLowerCase().split(q).length - 1 : 0 }))
      .filter(({ score }) => !q || score > 0)
      .sort((a, b) => b.score - a.score || b.r.createdAt.localeCompare(a.r.createdAt))
      .slice(0, limit)
      .map(({ r }) => r);
  }
}

export interface ExecutionTask {
  id: string;
  type: string;
  input: unknown;
  scheduledAt: string;
  attempts: number;
  status: "queued" | "running" | "completed" | "failed";
}

export class ExecutionFabric {
  private readonly tasks = new Map<string, ExecutionTask>();
  async enqueue(type: string, input: unknown, scheduledAt = new Date().toISOString()): Promise<ExecutionTask> {
    const task: ExecutionTask = { id: randomUUID(), type, input, scheduledAt, attempts: 0, status: "queued" };
    this.tasks.set(task.id, task);
    return task;
  }
  get(id: string): ExecutionTask | undefined { return this.tasks.get(id); }
  list(): readonly ExecutionTask[] { return [...this.tasks.values()]; }
}

export interface KnowledgeArtifact {
  id: string;
  title: string;
  content: string;
  source: string;
  contentHash: string;
  ingestedAt: string;
  status: "accepted" | "rejected";
}

export class KnowledgeFabric {
  private readonly artifacts = new Map<string, KnowledgeArtifact>();
  ingest(input: { title: string; content: string; source: string }): KnowledgeArtifact {
    if (!input.title.trim() || !input.content.trim() || !input.source.trim()) throw new Error("KNOWLEDGE_INVALID_ARTIFACT");
    const contentHash = createHash("sha3-256").update(input.content).digest("hex");
    const id = `knowledge:${contentHash.slice(0, 24)}`;
    const artifact: KnowledgeArtifact = { id, ...input, contentHash, ingestedAt: new Date().toISOString(), status: "accepted" };
    this.artifacts.set(id, artifact);
    return artifact;
  }
  get(id: string): KnowledgeArtifact | undefined { return this.artifacts.get(id); }
  list(): readonly KnowledgeArtifact[] { return [...this.artifacts.values()]; }
}

export interface ExpertAssessment {
  expertId: string;
  verdict: string;
  confidence: number;
  evidence: readonly string[];
}

export interface ConsensusResult {
  verdict: string;
  confidence: number;
  participants: number;
  dissent: readonly string[];
}

export function consensus(results: readonly ExpertAssessment[]): ConsensusResult {
  if (results.length === 0) return { verdict: "NO_CONSENSUS", confidence: 0, participants: 0, dissent: [] };
  const buckets = new Map<string, ExpertAssessment[]>();
  for (const result of results) buckets.set(result.verdict, [...(buckets.get(result.verdict) ?? []), result]);
  const ranked = [...buckets.entries()].sort((a, b) => b[1].length - a[1].length);
  const [verdict, group] = ranked[0];
  const confidence = group.reduce((sum, r) => sum + Math.max(0, Math.min(1, r.confidence)), 0) / group.length;
  return {
    verdict,
    confidence,
    participants: results.length,
    dissent: results.filter((r) => r.verdict !== verdict).map((r) => r.expertId),
  };
}

export interface VerificationClaim {
  claim: string;
  evidence: readonly string[];
  contradictions: readonly string[];
}

export interface VerificationResult {
  confidence: number;
  evidenceCount: number;
  contradictionCount: number;
  level: "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW" | "UNVERIFIED";
}

export function verifyClaim(input: VerificationClaim): VerificationResult {
  const evidenceCount = input.evidence.length;
  const contradictionCount = input.contradictions.length;
  const raw = evidenceCount === 0 ? 0 : evidenceCount / (evidenceCount + contradictionCount * 2);
  const confidence = Math.round(raw * 100);
  const level = confidence >= 90 ? "VERY_HIGH" : confidence >= 75 ? "HIGH" : confidence >= 50 ? "MEDIUM" : confidence > 0 ? "LOW" : "UNVERIFIED";
  return { confidence, evidenceCount, contradictionCount, level };
}

export interface ArchitectureAssessment {
  components: number;
  dependencies: number;
  risks: readonly string[];
  recommendations: readonly string[];
}

export function reasonArchitecture(input: { components: readonly string[]; dependencies: readonly string[]; constraints?: readonly string[] }): ArchitectureAssessment {
  const risks: string[] = [];
  if (input.components.length > 100) risks.push("HIGH_COMPONENT_COUNT");
  if (input.dependencies.length > input.components.length * 4) risks.push("DEPENDENCY_DENSITY");
  if ((input.constraints ?? []).some((c) => /single.?point|central/i.test(c))) risks.push("SINGLE_POINT_OF_FAILURE");
  const recommendations = [
    ...(risks.includes("DEPENDENCY_DENSITY") ? ["segment provider boundaries"] : []),
    ...(risks.includes("HIGH_COMPONENT_COUNT") ? ["introduce bounded contexts"] : []),
    "keep authority, execution and evidence as separate contracts",
  ];
  return { components: input.components.length, dependencies: input.dependencies.length, risks, recommendations };
}

export interface DigitalTwin {
  id: string;
  version: number;
  nodes: readonly { id: string; kind: string; label: string }[];
  edges: readonly { from: string; to: string; relation: string }[];
  generatedAt: string;
}

export function buildDigitalTwin(input: { nodes: DigitalTwin["nodes"]; edges: DigitalTwin["edges"] }): DigitalTwin {
  return { id: `twin:${createHash("sha256").update(JSON.stringify(input)).digest("hex").slice(0, 24)}`, version: 1, ...input, generatedAt: new Date().toISOString() };
}

export interface StrategicScenario {
  name: string;
  probability: number;
  cost: number;
  expectedValue: number;
  assumptions: readonly string[];
}

export function planStrategy(input: { objective: string; scenarios: readonly Omit<StrategicScenario, "expectedValue">[] }): readonly StrategicScenario[] {
  if (!input.objective.trim()) throw new Error("STRATEGY_OBJECTIVE_REQUIRED");
  return input.scenarios.map((s) => ({ ...s, expectedValue: s.probability * s.cost }));
}

export function selfEvaluate(output: unknown, criteria: readonly string[]) {
  const serialized = JSON.stringify(output) ?? "";
  const passed = criteria.filter((criterion) => serialized.toLowerCase().includes(criterion.toLowerCase()));
  return { score: criteria.length ? passed.length / criteria.length : 0, passed, failed: criteria.filter((c) => !passed.includes(c)) };
}

export async function parallelAnalyze<T, R>(items: readonly T[], worker: (item: T, index: number) => Promise<R>): Promise<readonly R[]> {
  return Promise.all(items.map(worker));
}
