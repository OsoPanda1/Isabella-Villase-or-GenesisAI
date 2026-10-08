import type { RiskTier } from "../authority/method-id";

export interface SkillContext {
  requestId: string;
  traceId: string;
  input: unknown;
  signals: readonly string[];
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
  output: unknown;
}

export class SkillRegistry {
  private readonly skills = new Map<string, SkillDescriptor>();

  register(skill: SkillDescriptor): void {
    if (this.skills.has(skill.id)) throw new Error(`SKILLS: duplicate skill ${skill.id}`);
    this.skills.set(skill.id, Object.freeze({ ...skill }));
  }

  get(id: string): SkillDescriptor {
    const skill = this.skills.get(id);
    if (!skill) throw new Error(`SKILLS: unknown skill ${id}`);
    return skill;
  }

  async invoke(id: string, ctx: SkillContext): Promise<SkillInvocation> {
    const skill = this.get(id);
    const startedAt = new Date().toISOString();
    const output = await skill.handler(ctx);
    return {
      skillId: skill.id,
      version: skill.version,
      methodId: skill.methodId,
      requestId: ctx.requestId,
      traceId: ctx.traceId,
      startedAt,
      completedAt: new Date().toISOString(),
      output,
    };
  }

  list(): readonly SkillDescriptor[] { return [...this.skills.values()]; }
}
