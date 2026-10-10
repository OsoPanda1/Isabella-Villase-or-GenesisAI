import { createHash, timingSafeEqual } from "node:crypto";
import type { GenesisRoutingDecision } from "./genesis-moe";

export const IGE_CHUNK_SCHEMA = "ige-chunk/v1" as const;
export type ArbitrationResult = "ALLOW" | "BLOCK" | "MODIFY";

export interface GenesisEthicsTrace {
  guardiansInvoked: string[];
  flags: string[];
  arbitrationResult: ArbitrationResult;
}
export interface GenesisChunkDraft {
  schemaVersion: typeof IGE_CHUNK_SCHEMA;
  requestId: string;
  sessionId: string;
  sequence: number;
  timestamp: string;
  latencyMs: number;
  text: string;
  routing: GenesisRoutingDecision;
  ethicsTrace: GenesisEthicsTrace;
  previousChunkHash?: string;
}
export interface GenesisChunk extends GenesisChunkDraft {
  chunkHash: string;
}

/**
 * Canonical JSON for this local schema: sorted object keys, stable array order,
 * finite numbers only, no undefined/functions/symbols or class instances.
 * This is an application-specific canonicalizer, not RFC 8785 certification.
 */
export function canonicalGenesisJson(value: unknown): string {
  if (typeof value === "string") {
    assertWellFormedUnicode(value);
    const serialized = JSON.stringify(value);
    if (serialized === undefined) throw new TypeError("IGE: unable to serialize string");
    return serialized;
  }
  if (value === null || typeof value === "boolean") {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) throw new TypeError("IGE: unable to serialize primitive");
    return serialized;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("IGE: canonical JSON rejects non-finite numbers");
    const serialized = JSON.stringify(Object.is(value, -0) ? 0 : value);
    if (serialized === undefined) throw new TypeError("IGE: unable to serialize number");
    return serialized;
  }
  if (Array.isArray(value)) return "[" + value.map((item) => canonicalGenesisJson(item)).join(",") + "]";
  if (typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) throw new TypeError("IGE: canonical JSON accepts plain objects only");
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    return "{" + keys.map((key) => {
      assertWellFormedUnicode(key);
      if (record[key] === undefined) throw new TypeError("IGE: canonical JSON rejects undefined values");
      return JSON.stringify(key) + ":" + canonicalGenesisJson(record[key]);
    }).join(",") + "}";
  }
  throw new TypeError("IGE: unsupported value in canonical JSON");
}

export function assertWellFormedUnicode(text: string): void {
  for (let i = 0; i < text.length; i += 1) {
    const unit = text.charCodeAt(i);
    if (unit >= 0xd800 && unit <= 0xdbff) {
      const next = text.charCodeAt(i + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) throw new TypeError("IGE: text contains an unpaired high surrogate");
      i += 1;
    } else if (unit >= 0xdc00 && unit <= 0xdfff) {
      throw new TypeError("IGE: text contains an unpaired low surrogate");
    }
  }
}

function validateDraft(draft: GenesisChunkDraft): void {
  if (!draft || draft.schemaVersion !== IGE_CHUNK_SCHEMA) throw new TypeError("IGE: unsupported chunk schema");
  if (typeof draft.requestId !== "string" || !draft.requestId.trim() || draft.requestId.length > 128) throw new TypeError("IGE: invalid requestId");
  if (typeof draft.sessionId !== "string" || !draft.sessionId.trim() || draft.sessionId.length > 128) throw new TypeError("IGE: invalid sessionId");
  if (!Number.isSafeInteger(draft.sequence) || draft.sequence < 0) throw new RangeError("IGE: sequence must be a non-negative safe integer");
  if (typeof draft.timestamp !== "string" || !Number.isFinite(Date.parse(draft.timestamp))) throw new TypeError("IGE: timestamp must be a valid date string");
  if (typeof draft.latencyMs !== "number" || !Number.isFinite(draft.latencyMs) || draft.latencyMs < 0) throw new RangeError("IGE: latencyMs must be finite and non-negative");
  if (typeof draft.text !== "string") throw new TypeError("IGE: text must be a string");
  assertWellFormedUnicode(draft.text);
  if (!draft.routing || draft.routing.requestId !== draft.requestId) throw new TypeError("IGE: routing requestId must match chunk requestId");
  if (!draft.ethicsTrace || !Array.isArray(draft.ethicsTrace.guardiansInvoked) || !Array.isArray(draft.ethicsTrace.flags)) {
    throw new TypeError("IGE: ethicsTrace must include guardiansInvoked and flags arrays");
  }
  if (!["ALLOW", "BLOCK", "MODIFY"].includes(draft.ethicsTrace.arbitrationResult)) throw new TypeError("IGE: invalid arbitration result");
  if (draft.sequence === 0 && draft.previousChunkHash !== undefined) throw new TypeError("IGE: sequence zero cannot reference a previous chunk");
  if (draft.sequence > 0 && !/^[a-f0-9]{64}$/.test(draft.previousChunkHash ?? "")) {
    throw new TypeError("IGE: subsequent chunks require a previous SHA-256 hash");
  }
}

function digest(draft: GenesisChunkDraft): string {
  return createHash("sha256").update(canonicalGenesisJson(draft), "utf8").digest("hex");
}

/** Creates an integrity digest; this is not a signature or proof of authorship. */
export function buildGenesisChunk(draft: GenesisChunkDraft): GenesisChunk {
  validateDraft(draft);
  return { ...draft, chunkHash: digest(draft) };
}

export function verifyGenesisChunk(chunk: GenesisChunk): boolean {
  if (!chunk || typeof chunk.chunkHash !== "string" || !/^[a-f0-9]{64}$/.test(chunk.chunkHash)) return false;
  const { chunkHash, ...draft } = chunk;
  try {
    validateDraft(draft);
    const expected = Buffer.from(digest(draft), "hex");
    const actual = Buffer.from(chunkHash, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
