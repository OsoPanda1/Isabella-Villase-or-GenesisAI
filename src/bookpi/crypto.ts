import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { BookPiEventCore, BookPiEventRecord, JsonValue } from "./types";

export const ZERO_HASH =
  "0000000000000000000000000000000000000000000000000000000000000000";

export function canonicalJson(value: JsonValue): string {
  return stableStringify(value);
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((v) => stableStringify(v)).join(",")}]`;
  }
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  const parts: string[] = [];
  for (const key of keys) {
    const member = record[key];
    if (member !== undefined) {
      parts.push(`${JSON.stringify(key)}:${stableStringify(member)}`);
    }
  }
  return `{${parts.join(",")}}`;
}

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input, "utf8").digest("hex");
}

export function sha3_512Hex(input: string): string {
  return createHash("sha3-512").update(input, "utf8").digest("hex");
}

export function hmacSha256Hex(input: string, secret: string): string {
  return createHmac("sha256", secret).update(input, "utf8").digest("hex");
}

/** Núcleo canónico del evento (excluye integrity/hash/canonical). */
export function eventCore(seed: BookPiEventCore): string {
  return canonicalJson({
    type: seed.type,
    id: seed.id,
    sequence: seed.sequence,
    prevHash: seed.prevHash,
    timestamp: seed.timestamp,
    ...(seed.actorId ? { actorId: seed.actorId } : {}),
    header: seed.header,
    payload: seed.payload,
    schemaVersion: seed.schemaVersion,
    meta: seed.meta,
  });
}

export function computeEventHash(seed: BookPiEventCore): string {
  return sha256Hex(eventCore(seed));
}

/** Sello de integridad derivado del hash canónico: clave + hash → SHA3-512. */
export function computeEventIntegrity(hash: string, secret = "bookpi-development"): string {
  return sha3_512Hex(`${secret}:${hash}`);
}

export function signEvent(eventHash: string, actorId: string, secret: string): string {
  return hmacSha256Hex(`${actorId}:${eventHash}`, secret);
}

export function verifyEventSignature(
  signature: string,
  eventHash: string,
  actorId: string,
  secret: string,
): boolean {
  const expected = signEvent(eventHash, actorId, secret);
  const a = Buffer.from(signature, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export function verifyChainLink(record: BookPiEventRecord, secret = "bookpi-development"): boolean {
  const recomputedHash = sha256Hex(eventCore(record));
  const recomputedIntegrity = computeEventIntegrity(recomputedHash, secret);
  return recomputedHash === record.hash && recomputedIntegrity === record.integrity;
}

export function recomputeRecord(record: BookPiEventRecord, secret = "bookpi-development"): boolean {
  return verifyChainLink(record, secret);
}