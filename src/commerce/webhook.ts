/** COMMERCE — verificación de firma de webhook y procesamiento idempotente. */

import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export interface WebhookInput {
  provider: string;
  externalEventId: string;
  eventType: string;
}

export interface NormalizedWebhookEvent {
  provider: string;
  externalEventId: string;
  eventType: string;
  payloadHash: string;
  receivedAt: string;
}

export function verifyWebhookSignature(
  rawBody: string,
  signature: string | undefined,
  secret: string,
): boolean {
  if (!signature || secret.length === 0) return false;
  const candidate = signature.startsWith("sha256=") ? signature.slice("sha256=".length) : signature;
  if (!/^[0-9a-f]{64}$/.test(candidate)) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(candidate, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function normalizeWebhookEvent(input: WebhookInput): NormalizedWebhookEvent {
  if (!input.externalEventId || input.externalEventId.length > 256) {
    throw new Error("INVALID_EXTERNAL_EVENT_ID");
  }
  if (!/^[a-z][a-z0-9_]{1,63}$/.test(input.provider)) {
    throw new Error("INVALID_PROVIDER");
  }
  if (!input.eventType || input.eventType.length > 64) {
    throw new Error("INVALID_EVENT_TYPE");
  }
  return {
    provider: input.provider,
    externalEventId: input.externalEventId,
    eventType: input.eventType,
    payloadHash: createHash("sha256").update(`${input.provider}.${input.externalEventId}`).digest("hex"),
    receivedAt: new Date().toISOString(),
  };
}

export interface IdempotencyRegistry {
  isDuplicate(key: string): boolean;
  consume(key: string): void;
}

export function createIdempotencyRegistry(): IdempotencyRegistry {
  const seen = new Set<string>();
  return {
    isDuplicate(key) {
      return seen.has(key);
    },
    consume(key) {
      seen.add(key);
    },
  };
}

export function idempotencyKey(provider: string, externalEventId: string): string {
  return `${provider}:${externalEventId}`;
}

export interface ProcessedWebhook {
  event: NormalizedWebhookEvent;
  dedupeKey: string;
  duplicate: boolean;
  recorded: boolean;
}

export function processWebhookEvent(
  input: WebhookInput,
  registry: IdempotencyRegistry,
): ProcessedWebhook {
  const event = normalizeWebhookEvent(input);
  const dedupeKey = idempotencyKey(event.provider, event.externalEventId);
  const duplicate = registry.isDuplicate(dedupeKey);
  if (duplicate) {
    return { event, dedupeKey, duplicate: true, recorded: false };
  }
  registry.consume(dedupeKey);
  return { event, dedupeKey, duplicate: false, recorded: true };
}

export function webhookEventId(): string {
  return randomUUID();
}