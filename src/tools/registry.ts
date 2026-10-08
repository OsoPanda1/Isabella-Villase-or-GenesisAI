import { createHash } from "node:crypto";
import type { RiskTier } from "../authority/method-id";
import type { Principal } from "../identity/principal";

export interface ToolDescriptor {
  id: string;
  version: string;
  methodId: string;
  owner: string;
  riskTier: RiskTier;
  scopes: readonly string[];
  description: string;
  execute: (input: unknown, principal: Principal) => Promise<unknown>;
}

export interface ToolReceipt {
  receiptId: string;
  toolId: string;
  methodId: string;
  principalId: string;
  inputHash: string;
  outputHash: string;
  startedAt: string;
  completedAt: string;
  status: "ok" | "error";
}

export class ToolRegistry {
  private readonly tools = new Map<string, ToolDescriptor>();

  register(tool: ToolDescriptor): void {
    if (this.tools.has(tool.id)) throw new Error(`TOOLS: duplicate tool ${tool.id}`);
    this.tools.set(tool.id, Object.freeze({ ...tool }));
  }

  get(id: string): ToolDescriptor {
    const tool = this.tools.get(id);
    if (!tool) throw new Error(`TOOLS: unknown tool ${id}`);
    return tool;
  }

  async execute(id: string, input: unknown, principal: Principal, scope: string): Promise<{ output: unknown; receipt: ToolReceipt }> {
    const tool = this.get(id);
    if (!tool.scopes.includes(scope)) throw new Error(`TOOLS: scope denied for ${id}`);
    const startedAt = new Date().toISOString();
    const inputHash = hash(input);
    try {
      const output = await tool.execute(input, principal);
      const receipt = makeReceipt(tool, principal, inputHash, output, startedAt, "ok");
      return { output, receipt };
    } catch (error) {
      const receipt = makeReceipt(tool, principal, inputHash, String(error), startedAt, "error");
      throw Object.assign(new Error("TOOLS: execution failed"), { cause: error, receipt });
    }
  }

  list(): readonly ToolDescriptor[] { return [...this.tools.values()]; }
}

function hash(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex");
}

function makeReceipt(tool: ToolDescriptor, principal: Principal, inputHash: string, output: unknown, startedAt: string, status: ToolReceipt["status"]): ToolReceipt {
  return {
    receiptId: `tr_${hash({ tool: tool.id, principal: principal.id, inputHash, startedAt }).slice(0, 24)}`,
    toolId: tool.id,
    methodId: tool.methodId,
    principalId: principal.id,
    inputHash,
    outputHash: hash(output),
    startedAt,
    completedAt: new Date().toISOString(),
    status,
  };
}
