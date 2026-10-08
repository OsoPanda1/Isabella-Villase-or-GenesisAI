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

  constructor(telemetry: TelemetrySink = new InMemoryTelemetry()) {
    this.telemetry = telemetry;
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
