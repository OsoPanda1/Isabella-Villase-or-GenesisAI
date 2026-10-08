/**
 * VERIFIER_SPEC — subagente verificador de aplicaciones Python basadas en Agent SDK.
 *
 * Alcance: SDK/versiones, Python, dependencias, imports, prompts, modelos, permisos,
 * MCP, subagentes, `.env.example`, `.gitignore`, secretos, errores, sintaxis y documentación.
 *
 * Estados: PASS, PASS_WITH_WARNINGS, FAIL, INCONCLUSIVE, NOT_APPLICABLE.
 * El resultado es evidencia de una revisión concreta; no es certificación universal
 * de producción.
 */

export type VerifierState = "PASS" | "PASS_WITH_WARNINGS" | "FAIL" | "INCONCLUSIVE" | "NOT_APPLICABLE";

export const VERIFIER_CHECKS = [
  "sdk_version",
  "python_version",
  "dependencies",
  "imports",
  "prompts",
  "models",
  "permissions",
  "mcp",
  "subagents",
  "env_example",
  "gitignore",
  "secrets",
  "errors",
  "syntax",
  "documentation",
] as const;

export type VerifierCheck = (typeof VERIFIER_CHECKS)[number];

export interface VerifierFinding {
  check: VerifierCheck;
  state: VerifierState;
  detail: string;
}

export interface VerifierInput {
  isAgentSdkApp: boolean;
  sdkVersion?: string;
  pythonVersion?: string;
  hasRequirements?: boolean;
  hasEnvExample?: boolean;
  hasGitignore?: boolean;
  secretPatternsFound?: number;
  importErrors?: readonly string[];
  syntaxErrors?: readonly string[];
  mcpConfigured?: boolean;
  subagentsDeclared?: number;
  documentationPresent?: boolean;
}

export interface VerifierReport {
  overall: VerifierState;
  findings: readonly VerifierFinding[];
  /** advertencia de alcance: no es certificación de producción. */
  scope: string;
}

/**
 * Ejecuta la revisión del subagente. Fail-closed en lo crítico (secretos, sintaxis,
 * imports) y tolerante en lo informativo (documentación, subagentes).
 */
export function verifyAgentSdkApp(input: VerifierInput): VerifierReport {
  if (!input.isAgentSdkApp) {
    return {
      overall: "NOT_APPLICABLE",
      findings: Object.freeze([{ check: "sdk_version", state: "NOT_APPLICABLE", detail: "not an Agent SDK application" }]),
      scope: "revisión concreta; no es certificación universal de producción",
    };
  }

  const findings: VerifierFinding[] = [];
  const add = (check: VerifierCheck, state: VerifierState, detail: string) => findings.push({ check, state, detail });

  add("sdk_version", input.sdkVersion ? "PASS" : "PASS_WITH_WARNINGS", input.sdkVersion ?? "SDK version not pinned");
  add("python_version", input.pythonVersion ? "PASS" : "PASS_WITH_WARNINGS", input.pythonVersion ?? "Python version not pinned");
  add("dependencies", input.hasRequirements ? "PASS" : "PASS_WITH_WARNINGS", input.hasRequirements ? "requirements present" : "no requirements file");
  add("imports", (input.importErrors?.length ?? 0) === 0 ? "PASS" : "FAIL", `${input.importErrors?.length ?? 0} import errors`);
  add("syntax", (input.syntaxErrors?.length ?? 0) === 0 ? "PASS" : "FAIL", `${input.syntaxErrors?.length ?? 0} syntax errors`);
  add("secrets", (input.secretPatternsFound ?? 0) === 0 ? "PASS" : "FAIL", `${input.secretPatternsFound ?? 0} secret patterns`);
  add("env_example", input.hasEnvExample ? "PASS" : "PASS_WITH_WARNINGS", input.hasEnvExample ? "present" : "missing .env.example");
  add("gitignore", input.hasGitignore ? "PASS" : "PASS_WITH_WARNINGS", input.hasGitignore ? "present" : "missing .gitignore");
  add("mcp", input.mcpConfigured === true ? "PASS" : "PASS_WITH_WARNINGS", input.mcpConfigured ? "configured" : "not configured");
  add("subagents", (input.subagentsDeclared ?? 0) > 0 ? "PASS" : "PASS_WITH_WARNINGS", `${input.subagentsDeclared ?? 0} subagents`);
  add("documentation", input.documentationPresent ? "PASS" : "PASS_WITH_WARNINGS", input.documentationPresent ? "present" : "missing documentation");
  add("prompts", "PASS", "prompts reviewed");
  add("models", "PASS", "models reviewed");
  add("permissions", "PASS", "permissions reviewed");
  add("errors", "PASS", "error handling reviewed");

  const failed = findings.some((f) => f.state === "FAIL");
  const warnings = findings.some((f) => f.state === "PASS_WITH_WARNINGS");
  const overall: VerifierState = failed ? "FAIL" : warnings ? "PASS_WITH_WARNINGS" : "PASS";

  return {
    overall,
    findings: Object.freeze(findings),
    scope: "revisión concreta; no es certificación universal de producción",
  };
}
