import { createHash } from "node:crypto";
import type { PidConfig } from "./config.js";

export type PidKind = "ORCID" | "DOI" | "ISNI";

export interface PidRecord {
  kind: PidKind;
  value: string;
  canonical: string;
  source: "config";
  validFormat: boolean;
}

export interface PidCheck {
  name: string;
  passed: boolean;
  severity: "info" | "warning" | "error";
  details: string;
}

export interface ReconciliationReport {
  passed: boolean;
  reconciledAt: string;
  recordCount: number;
  records: readonly PidRecord[];
  checks: readonly PidCheck[];
  fingerprint: string;
}

const ORCID = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/i;
const ISNI = /^(?:\d{4} ){3}\d{3}[\dX]$|^\d{16}$/i;
const DOI = /^10\.\d{4,9}\/[\S]+$/i;

function normalizeOrcid(value: string): string {
  return value.replace(/^https?:\/\/(?:orcid\.org\/)?/i, "").trim().toUpperCase();
}

function normalizeIsni(value: string): string {
  return value.replace(/^https?:\/\/(?:isni\.org\/)?/i, "").replace(/[-\s]/g, "").trim().toUpperCase();
}

function normalizeDoi(value: string): string {
  return value.replace(/^https?:\/\/(?:doi\.org\/|dx\.doi\.org\/)/i, "").replace(/^doi:\s*/i, "").trim().toLowerCase();
}

function validOrcid(value: string): boolean {
  const normalized = normalizeOrcid(value);
  if (!ORCID.test(normalized)) return false;
  const digits = normalized.replace(/-/g, "");
  let total = 0;
  for (const char of digits.slice(0, -1)) total = (total + Number(char)) * 2;
  const remainder = total % 11;
  const check = (12 - remainder) % 11;
  return (check === 10 ? "X" : String(check)) === digits.at(-1);
}

function validIsni(value: string): boolean {
  const normalized = normalizeIsni(value);
  if (!ISNI.test(normalized)) return false;
  const digits = normalized.replace(/\s/g, "");
  let total = 0;
  for (const char of digits.slice(0, -1)) total = (total + Number(char)) * 2;
  const remainder = total % 11;
  const check = (12 - remainder) % 11;
  return (check === 10 ? "X" : String(check)) === digits.at(-1);
}

function add(
  records: PidRecord[],
  checks: PidCheck[],
  kind: PidKind,
  raw: string | undefined,
): void {
  if (!raw) return;
  const canonical =
    kind === "ORCID" ? normalizeOrcid(raw) :
    kind === "ISNI" ? normalizeIsni(raw) :
    normalizeDoi(raw);
  const validFormat =
    kind === "ORCID" ? validOrcid(raw) :
    kind === "ISNI" ? validIsni(raw) :
    DOI.test(canonical);

  records.push({ kind, value: raw, canonical, source: "config", validFormat });
  checks.push({
    name: `${kind} format`,
    passed: validFormat,
    severity: validFormat ? "info" : "error",
    details: validFormat ? `${kind} has a valid checksum/format` : `${kind} failed canonical validation`,
  });
}

function fingerprint(records: readonly PidRecord[]): string {
  return createHash("sha256")
    .update(JSON.stringify(records.map(({ kind, canonical }) => ({ kind, canonical })).sort((a, b) => (a.kind + a.canonical).localeCompare(b.kind + b.canonical))))
    .digest("hex");
}

export async function reconcilePids(cfg: PidConfig): Promise<ReconciliationReport> {
  const records: PidRecord[] = [];
  const checks: PidCheck[] = [];

  add(records, checks, "ORCID", cfg.identifiers.orcid);
  add(records, checks, "DOI", cfg.identifiers.zenodoDoi);
  add(records, checks, "DOI", cfg.identifiers.dataCiteDoi);
  add(records, checks, "ISNI", cfg.identifiers.isni);

  const unique = new Set(records.map((record) => `${record.kind}:${record.canonical}`));
  checks.push({
    name: "identifier uniqueness",
    passed: unique.size === records.length,
    severity: unique.size === records.length ? "info" : "error",
    details: unique.size === records.length ? "No duplicate canonical identifiers" : "Duplicate canonical identifiers detected",
  });

  if (cfg.strict && records.length === 0) {
    checks.push({
      name: "identifier presence",
      passed: false,
      severity: "error",
      details: "Strict reconciliation requires at least one configured PID",
    });
  }

  if (cfg.expected.namespace && !cfg.expected.namespace.trim()) {
    checks.push({ name: "namespace", passed: false, severity: "error", details: "Configured namespace is empty" });
  }

  const passed = checks.every((check) => check.passed || check.severity !== "error");
  return {
    passed,
    reconciledAt: new Date().toISOString(),
    recordCount: records.length,
    records,
    checks,
    fingerprint: fingerprint(records),
  };
}
