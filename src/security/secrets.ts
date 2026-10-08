import { timingSafeEqual } from "node:crypto";

export function requiredSecret(name: string, explicit?: string): string {
  const value = explicit ?? process.env[name];
  if (!value || value.length < 32) {
    throw new Error(`SECURITY: ${name} must be supplied externally and contain at least 32 characters.`);
  }
  return value;
}

export function equalSecret(a: string, b: string): boolean {
  const aa = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  return aa.length === bb.length && timingSafeEqual(aa, bb);
}

export function isTestRuntime(): boolean {
  return process.env.VITEST === "true" || process.env.NODE_ENV === "test";
}
