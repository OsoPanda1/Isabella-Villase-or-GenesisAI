import type { RiskTier } from "../authority/method-id";
import type { ApprovalRef } from "../identity/approval";
import { verifyHumanApproval } from "../identity/approval";
import type { Principal } from "../identity/principal";
import { inspectAegis } from "../security/aegis";

export interface SkillContext {
  requestId: string;
  traceId: string;
  input: unknown;
  signals: readonly string[];
  principal?: Principal;
}

export interface SkillAuthorization {
  approval?: ApprovalRef;
  contextHash?: string;
  policyVersion?: string;
}

export interface SkillDescriptor {
  id: string;
  version: string;
  methodId: string;
  riskTier: RiskTier;
  requiresEvidence: boolean;
  handler: (ctx: SkillContext) => Promise<unknown>;
}

export interface SkillInvocation {
  skillId: string;
  version: string;
  methodId: string;
  requestId: string;
  traceId: string;
  startedAt: string;
  completedAt: string;
  status: "ok" | "blocked" | "error";
  output?: unknown;
}

export class SkillRegistry {
  private readonly skills = new Map<string, SkillDescriptor>();

  register(skill: SkillDescriptor): void {
    if (this.skills.has(skill.id)) throw new Error(`SKILLS: duplicate skill ${skill.id}`);
    if (!skill.id || !skill.version || !skill.methodId) throw new Error("SKILLS: descriptor metadata is incomplete.");
    this.skills.set(skill.id, Object.freeze({ ...skill }));
  }

  get(id: string): SkillDescriptor {
    const skill = this.skills.get(id);
    if (!skill) throw new Error(`SKILLS: unknown skill ${id}`);
    return skill;
  }

  async invoke(id: string, ctx: SkillContext, authorization: SkillAuthorization = {}): Promise<SkillInvocation> {
    const skill = this.get(id);
    const startedAt = new Date().toISOString();
    const evidenceRequired = skill.requiresEvidence || skill.riskTier === "HIGH" || skill.riskTier === "CRITICAL";

    if (evidenceRequired && ctx.signals.length === 0) {
      return blockedInvocation(skill, ctx, startedAt);
    }

    const aegis = inspectAegis(JSON.stringify(ctx.input) ?? "");
    if (aegis.decision === "BLOCK") {
      return blockedInvocation(skill, ctx, startedAt);
    }

    if (skill.riskTier === "HIGH" || skill.riskTier === "CRITICAL") {
      const principal = ctx.principal;
      const validApproval = Boolean(
        principal &&
        authorization.approval?.decision === "ALLOW" &&
        verifyHumanApproval(authorization.approval, {
          methodId: skill.methodId,
          action: `skill:${skill.id}`,
          resource: `skill:${skill.id}`,
          principalId: principal.id,
          contextHash: authorization.contextHash,
          policyVersion: authorization.policyVersion,
        }),
      );
      if (!validApproval) return blockedInvocation(skill, ctx, startedAt);
    }

    try {
      const output = await skill.handler(ctx);
      return {
        skillId: skill.id,
        version: skill.version,
        methodId: skill.methodId,
        requestId: ctx.requestId,
        traceId: ctx.traceId,
        startedAt,
        completedAt: new Date().toISOString(),
        status: "ok",
        output,
      };
    } catch {
      return {
        skillId: skill.id,
        version: skill.version,
        methodId: skill.methodId,
        requestId: ctx.requestId,
        traceId: ctx.traceId,
        startedAt,
        completedAt: new Date().toISOString(),
        status: "error",
      };
    }
  }

  list(): readonly SkillDescriptor[] { return [...this.skills.values()]; }
}

function blockedInvocation(skill: SkillDescriptor, ctx: SkillContext, startedAt: string): SkillInvocation {
  return {
    skillId: skill.id,
    version: skill.version,
    methodId: skill.methodId,
    requestId: ctx.requestId,
    traceId: ctx.traceId,
    startedAt,
    completedAt: new Date().toISOString(),
    status: "blocked",
  };
}
