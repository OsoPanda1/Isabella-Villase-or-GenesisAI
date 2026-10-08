import { evaluateCrown, type CrownEvaluationInput, type CrownVerdict } from "../crown";
import { inspectAegis, type AegisVerdict } from "../security/aegis";
import { planExecution, type AdaptivePlan, type AdaptiveRequest } from "../intelligence/adaptive-router";
import { InMemoryTelemetry, type TelemetrySink } from "../observability/telemetry";
import { IKESEngine } from "../memory/ikes";
import { ToolRegistry, type ToolAuthorization, type ToolReceipt } from "../tools/registry";
import { SkillRegistry } from "../skills/registry";
import { GovernedInferenceRouter } from "../inference/router";
import type { GenerationRequest, GenerationResult } from "../inference/types";
import { DeterministicVerifier } from "../veritas/verifier";
import { evaluateCompanionSafety, type CompanionSafetyVerdict } from "../companion/safety";
import { InMemoryHumanEscalationQueue, createEscalation, type HumanEscalationQueue } from "../companion/escalation";
import { explainPolicyDecision, type DecisionExplanation } from "../cognition/explainability";
import { createEmotionalTrace, type EmotionalTrace } from "../cognition/emotional-trace";
import { planExperts, type ExpertPlan, GENESIS_EXPERTS } from "../cognition/experts";
import { queryTerritory, type TerritoryQuery, type TerritoryAnswer } from "../territory/context";
import { evaluateXrSafety, type XrSafetyDecision, type XrSafetyEvent } from "../xr/safety";
import { InMemoryConsentRegistry, type ConsentRegistry } from "../cognition/consent";
import { planExperts as planCognitiveExperts } from "../cognition/experts";
import { synthesize, type CognitiveSynthesis, type CognitiveTask, type ExpertResult } from "../cognition/orchestrator";
import { createSource, validateClaim, type ProvenanceClaim, type ProvenanceSource } from "../memory/provenance";
import type { AtlasPersistencePort, CreateUserInput, RecordEconomyEntryInput, RecordProtocolExecutionInput } from "../atlas";
import { IsabellaEngine, type IsabellaEngineConfig, type IsabellaProfile } from "../isabella";

export interface GenesisRuntimeInput extends CrownEvaluationInput, AdaptiveRequest {
  memoryQuery?: string;
}

export interface GenesisRuntimeDecision {
  crown: CrownVerdict;
  aegis: AegisVerdict;
  plan: AdaptivePlan;
  memory: ReturnType<IKESEngine["retrieve"]>;
  admitted: boolean;
}

export interface GenesisToolDecision {
  admitted: boolean;
  aegis: AegisVerdict;
  output?: unknown;
  receipt?: ToolReceipt;
}

export class IsabellaGenesisRuntime {
  readonly memory = new IKESEngine();
  readonly tools = new ToolRegistry();
  readonly skills = new SkillRegistry();
  readonly telemetry: TelemetrySink;
  readonly inference = new GovernedInferenceRouter();
  readonly verifier = new DeterministicVerifier();
  readonly escalation: HumanEscalationQueue = new InMemoryHumanEscalationQueue();
  readonly consent: ConsentRegistry = new InMemoryConsentRegistry();
  readonly persistence?: AtlasPersistencePort;
  readonly isabella: IsabellaEngine;

  constructor(
    telemetry: TelemetrySink = new InMemoryTelemetry(),
    persistence?: AtlasPersistencePort,
    isabellaConfig?: IsabellaEngineConfig,
  ) {
    this.telemetry = telemetry;
    this.persistence = persistence;
    this.isabella = new IsabellaEngine(isabellaConfig);
  }

  async initPersistence(): Promise<void> {
    if (this.persistence && "init" in this.persistence && typeof this.persistence.init === "function") {
      await this.persistence.init();
    }
  }

  async persistUser(input: CreateUserInput) {
    if (!this.persistence) throw new Error("Genesis persistence is not configured");
    return this.persistence.createUser(input);
  }

  async persistProtocolExecution(input: RecordProtocolExecutionInput) {
    if (!this.persistence) throw new Error("Genesis persistence is not configured");
    return this.persistence.recordProtocolExecution(input);
  }

  async persistEconomyEntry(input: RecordEconomyEntryInput) {
    if (!this.persistence) throw new Error("Genesis persistence is not configured");
    return this.persistence.recordEconomyEntry(input);
  }

  async publishAtlasXrEvent(eventType: string, payload: unknown) {
    if (!this.persistence) throw new Error("Genesis persistence is not configured");
    return this.persistence.publishXrEvent(eventType, payload);
  }

  async createAtlasSignal(input: Parameters<AtlasPersistencePort["createSignal"]>[0]) {
    if (!this.persistence) throw new Error("Genesis persistence is not configured");
    return this.persistence.createSignal(input);
  }

  mediateIsabella(input: { input: string; profile?: IsabellaProfile }) {
    const started = Date.now();
    try {
      const result = this.isabella.chat(input);
      this.telemetry.metric({
        name: "request_latency_ms",
        value: Date.now() - started,
        at: new Date().toISOString(),
        attributes: { stage: "isabella-mediation", profile: input.profile ?? "general" },
      });
      return result;
    } catch (error) {
      this.telemetry.metric({
        name: "request_latency_ms",
        value: Date.now() - started,
        at: new Date().toISOString(),
        attributes: { stage: "isabella-mediation", status: "error" },
      });
      throw error;
    }
  }

  evaluateIsabellaEntropy(probabilities: number[]) {
    const started = Date.now();
    const result = this.isabella.evaluarEntropia(probabilities);
    this.telemetry.metric({
      name: "request_latency_ms",
      value: Date.now() - started,
      at: new Date().toISOString(),
      attributes: { stage: "isabella-entropy" },
    });
    return result;
  }

  evaluate(input: GenesisRuntimeInput): GenesisRuntimeDecision {
    const started = Date.now();
    const aegis = inspectAegis(input.input);
    const crown = evaluateCrown(input);
    const plan = planExecution(input);
    const memory = input.memoryQuery && aegis.decision !== "BLOCK"
      ? this.memory.retrieve(input.memoryQuery)
      : [];
    const admitted = aegis.decision !== "BLOCK" && crown.verification.allPassed && crown.responseMode !== "refuse";

    this.telemetry.metric({
      name: "request_total",
      value: 1,
      at: new Date().toISOString(),
      attributes: { admitted, risk: input.riskTier, complexity: plan.complexity },
    });
    this.telemetry.metric({
      name: "request_latency_ms",
      value: Date.now() - started,
      at: new Date().toISOString(),
      attributes: { stage: "governed-evaluation" },
    });

    return { crown, aegis, plan, memory, admitted };
  }

  synthesizeCognition(task: CognitiveTask, expertIds: readonly (typeof GENESIS_EXPERTS[number])[], results: readonly ExpertResult[]): CognitiveSynthesis {
    return synthesize(task, planCognitiveExperts(expertIds), results);
  }

  registerConsent(grant: Parameters<ConsentRegistry["grant"]>[0]): void { this.consent.grant(grant); }
  revokeConsent(consentId: string): void { this.consent.revoke(consentId); }
  hasConsent(principalId: string, purpose: Parameters<ConsentRegistry["has"]>[1], scope?: string): boolean { return this.consent.has(principalId,purpose,scope); }

  assessCompanionSafety(input: string): CompanionSafetyVerdict {
    return evaluateCompanionSafety(input);
  }

  explainPolicy(decision: "ALLOW"|"DENY"|"REVIEW", factors: readonly string[], evidenceRefs: readonly string[], policyVersion: string): DecisionExplanation {
    return explainPolicyDecision(decision, factors, evidenceRefs, policyVersion);
  }

  createContextTrace(traceId: string, signals: Parameters<typeof createEmotionalTrace>[1], purpose: Parameters<typeof createEmotionalTrace>[2]): EmotionalTrace {
    return createEmotionalTrace(traceId, signals, purpose);
  }

  planExpertModules(ids: readonly (typeof GENESIS_EXPERTS[number])[]): ExpertPlan {
    return planExperts(ids);
  }

  routeTerritory(query: TerritoryQuery, resolver: (query: TerritoryQuery) => TerritoryAnswer): TerritoryAnswer {
    return queryTerritory(query, resolver);
  }

  evaluateXrSafety(event: XrSafetyEvent): XrSafetyDecision {
    return evaluateXrSafety(event);
  }

  createProvenanceSource(input: Parameters<typeof createSource>[0]): ProvenanceSource { return createSource(input); }
  validateProvenanceClaim(claim: ProvenanceClaim, sources: readonly ProvenanceSource[]): boolean { return validateClaim(claim,sources); }

  escalate(request: Parameters<typeof createEscalation>[0]): void {
    this.escalation.enqueue(createEscalation(request));
  }

  async generate(request: GenerationRequest): Promise<GenerationResult> {
    const started = Date.now();
    const result = await this.inference.generate(request);
    this.telemetry.metric({
      name: "request_latency_ms",
      value: Date.now() - started,
      at: new Date().toISOString(),
      attributes: { stage: "inference", modelId: result.modelId },
    });
    if (result.outputTokens > 0) {
      this.telemetry.metric({
        name: "tokens_per_second",
        value: result.outputTokens / Math.max(0.001, result.latencyMs / 1000),
        at: new Date().toISOString(),
        attributes: { modelId: result.modelId },
      });
    }
    return result;
  }

  async executeTool(
    id: string,
    input: unknown,
    principal: GenesisRuntimeInput["principal"],
    scope: string,
    authorization: ToolAuthorization = {},
  ): Promise<GenesisToolDecision> {
    const started = Date.now();
    const aegis = inspectAegis(JSON.stringify(input) ?? "");
    if (aegis.decision === "BLOCK") {
      this.telemetry.metric({
        name: "security_block",
        value: 1,
        at: new Date().toISOString(),
        attributes: { stage: "tool-input", toolId: id },
      });
      return { admitted: false, aegis };
    }

    try {
      const result = await this.tools.execute(id, input, principal, scope, authorization);
      this.telemetry.metric({
        name: "tool_execution",
        value: 1,
        at: new Date().toISOString(),
        attributes: { toolId: id, status: result.receipt.status },
      });
      this.telemetry.metric({
        name: "request_latency_ms",
        value: Date.now() - started,
        at: new Date().toISOString(),
        attributes: { stage: "tool-execution" },
      });
      return { admitted: true, aegis, output: result.output, receipt: result.receipt };
    } catch (error) {
      const receipt = (error as { receipt?: ToolReceipt }).receipt;
      this.telemetry.metric({
        name: "tool_execution",
        value: 1,
        at: new Date().toISOString(),
        attributes: { toolId: id, status: receipt?.status ?? "error" },
      });
      return { admitted: false, aegis, receipt };
    }
  }
}
