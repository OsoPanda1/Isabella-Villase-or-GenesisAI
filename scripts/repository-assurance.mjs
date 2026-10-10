#!/usr/bin/env node
/**
 * Isabella Genesis repository assurance audit.
 * Dependency-free, read-only structural checks. This is not a penetration test,
 * cryptographic validation, production health check, or compliance certification.
 */
import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const checks = [];
const add = (id, severity, ok, detail, evidence = []) =>
  checks.push({ id, severity, status: ok ? "PASS" : severity === "BLOCKER" ? "FAIL" : "WARN", detail, evidence });

async function read(relative) {
  try { return await readFile(path.join(root, relative), "utf8"); }
  catch { return null; }
}
async function exists(relative) {
  try { await access(path.join(root, relative)); return true; }
  catch { return false; }
}
const pkgText = await read("package.json");
let pkg = null;
try { pkg = pkgText ? JSON.parse(pkgText) : null; } catch {}
add("RA-001", "BLOCKER", !!pkg, "package.json existe y es JSON válido.", ["package.json"]);
if (pkg) {
  add("RA-002", "BLOCKER", typeof pkg.scripts?.typecheck === "string", "Existe un script de typecheck ejecutable.", ["package.json:scripts.typecheck"]);
  add("RA-003", "BLOCKER", typeof pkg.scripts?.test === "string", "Existe un script de pruebas.", ["package.json:scripts.test"]);
  add("RA-004", "BLOCKER", typeof pkg.scripts?.build === "string", "Existe un script de build.", ["package.json:scripts.build"]);
  add("RA-005", "WARN", !!pkg.packageManager, "packageManager fija explícitamente el gestor y su versión.", ["package.json:packageManager"]);
  add("RA-006", "WARN", !!pkg.engines?.node, "La versión mínima de Node está declarada.", ["package.json:engines.node"]);
}
const lock = await exists("pnpm-lock.yaml");
const npmLock = await exists("package-lock.json");
const yarnLock = await exists("yarn.lock");
add("RA-007", "BLOCKER", Number(lock) + Number(npmLock) + Number(yarnLock) === 1,
  "Existe exactamente un lockfile principal para instalaciones reproducibles.",
  ["pnpm-lock.yaml", "package-lock.json", "yarn.lock"]);
const ci = await read(".github/workflows/ci.yml");
add("RA-008", "WARN", !!ci, "Existe workflow CI principal.", [".github/workflows/ci.yml"]);
if (ci) {
  add("RA-009", "BLOCKER", /pull_request:/.test(ci), "El CI se activa en pull requests.", [".github/workflows/ci.yml"]);
  add("RA-010", "BLOCKER", /--frozen-lockfile/.test(ci), "El CI instala dependencias con lockfile congelado.", [".github/workflows/ci.yml"]);
  add("RA-011", "WARN", /typecheck/.test(ci) && /test/.test(ci) && /build/.test(ci),
    "El CI menciona typecheck, pruebas y build.", [".github/workflows/ci.yml"]);
}
for (const [id, file, description] of [
  ["RA-012", "SECURITY.md", "Política de reporte y respuesta de seguridad."],
  ["RA-013", "docs/ESTADO-REAL-ACTUAL.md", "Registro de estado real y limitaciones."],
  ["RA-014", "scripts/security-suite.mjs", "Suite de invariantes de seguridad."],
  ["RA-015", "scripts/production-evidence.mjs", "Generador de evidencia del gate productivo."],
]) {
  add(id, "WARN", await exists(file), description, [file]);
}
const readme = await read("README.md");
add("RA-016", "WARN",
  !!readme && /Contrato de veracidad/i.test(readme) && /Bloqueo de instalación reproducible/i.test(readme) && /Fases de evolución/i.test(readme),
  "README documenta límites de veracidad, reproducibilidad y fases de evolución.",
  ["README.md"]);
const server = await read("src/server.ts");
add("RA-017", "BLOCKER",
  !!server && /\/api\/v1\/readyz/.test(server) && /currentOpsState/.test(server) && /readinessEvidence/.test(server),
  "Readiness HTTP se vincula a estado operativo evaluado y evidencia explícita.",
  ["src/server.ts"]);
const productionOps = await read("src/deployment/production-ops.ts");
add("RA-018", "BLOCKER",
  !!productionOps && /dependencies:not-configured/.test(productionOps) && /invalid-health-record/.test(productionOps),
  "Readiness rechaza ausencia de dependencias y registros de salud inválidos.",
  ["src/deployment/production-ops.ts"]);
const genesisModule = await read("src/cognition/genesis-moe.ts");
const genesisTests = await read("test/cognition/genesis-moe.test.ts");
const chunkModule = await read("src/cognition/genesis-chunk.ts");
const chunkTests = await read("test/cognition/genesis-chunk.test.ts");
add("RA-019", "BLOCKER",
  !!genesisModule && !!genesisTests && !!chunkModule && !!chunkTests,
  "Los contratos Genesis/IGE y sus archivos de prueba existen en el árbol.",
  ["src/cognition/genesis-moe.ts", "test/cognition/genesis-moe.test.ts", "src/cognition/genesis-chunk.ts", "test/cognition/genesis-chunk.test.ts"]);
const latencyModule = await read("src/deployment/latency-metrics.ts");
const latencyTests = await read("test/deployment/latency-metrics.test.ts");
const perfTests = await read("test/performance/critical-latency.test.ts");
add("RA-020", "BLOCKER",
  !!latencyModule && !!latencyTests && !!perfTests,
  "Bounded latency telemetry and CPU-only critical-path percentile benchmarks exist.",
  ["src/deployment/latency-metrics.ts", "test/deployment/latency-metrics.test.ts", "test/performance/critical-latency.test.ts"]);
add("RA-021", "BLOCKER",
  !!server && /\/api\/v1\/ops\/latency/.test(server) && /OPS_API_TOKEN/.test(server) && /latencyRegistry\.record/.test(server),
  "Route latency endpoint is instrumented and token-gated.",
  ["src/server.ts"]);
add("RA-022", "BLOCKER",
  !!server && !/src-tamv-001|src-rdm-002|src-agents-003|src-zenodo-004/.test(server),
  "Startup does not seed IKES with the audited placeholder source IDs/hashes.",
  ["src/server.ts"]);
const report = {
  schemaVersion: "1.0.0",
  audit: "isabella-genesis-repository-assurance",
  generatedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA || process.env.GIT_COMMIT || null,
  branch: process.env.GITHUB_REF_NAME || null,
  scope: "read-only structural repository checks",
  disclaimer: "PASS means only that the named structural check passed; it does not prove runtime behavior, security, integration, deployment, or compliance.",
  summary: {
    total: checks.length,
    passed: checks.filter(x => x.status === "PASS").length,
    failed: checks.filter(x => x.status === "FAIL").length,
    warnings: checks.filter(x => x.status === "WARN").length,
    blockers: checks.filter(x => x.severity === "BLOCKER" && x.status !== "PASS").length,
    ok: checks.every(x => x.severity !== "BLOCKER" || x.status === "PASS"),
  },
  checks,
};
const outDir = path.join(root, "artifacts", "assurance");
await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "repository-assurance.json"), JSON.stringify(report, null, 2) + "\n");
const md = [
  "# Repository assurance audit",
  "",
  `- Commit: ${report.commit || "unknown"}`,
  `- Branch: ${report.branch || "unknown"}`,
  `- Generated: ${report.generatedAt}`,
  `- Result: ${report.summary.ok ? "PASS (structural blockers clear)" : "FAIL (structural blockers found)"}`,
  `- Checks: ${report.summary.passed}/${report.summary.total} pass; ${report.summary.failed} fail; ${report.summary.warnings} warnings`,
  "",
  "> This report checks repository structure only. It is not proof of production readiness, runtime correctness, or security certification.",
  "",
  "| ID | Severity | Status | Detail |",
  "|---|---|---|---|",
  ...checks.map(c => `| ${c.id} | ${c.severity} | ${c.status} | ${c.detail.replaceAll("|", "\\|")} |`),
  "",
].join("\n");
await writeFile(path.join(outDir, "repository-assurance.md"), md);
console.log(md);
if (!report.summary.ok) process.exitCode = 1;
