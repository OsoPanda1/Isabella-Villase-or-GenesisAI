import { createHash } from "node:crypto";

export interface BookPiEventInput {
  id: string;
  timestamp: string;
  type: string;
  methodId: string;
  principal: string;
  riskTier: string;
  status: string;
}

export interface BookPiEvent extends BookPiEventInput {
  previousHash: string;
  hash: string;
}

export interface BookPiVerification {
  status: "EMPTY_CHAIN" | "VERIFIED_IN_MEMORY_CHAIN" | "INTEGRITY_FAILURE";
  valid: boolean;
  blocksValidated: number;
  chainHead: string | null;
  storage: "VOLATILE_IN_MEMORY";
  wormEnforced: false;
  durable: false;
}

const GENESIS_HASH = "0".repeat(64);

function eventPayload(event: BookPiEventInput, previousHash: string) {
  return {
    id: event.id,
    timestamp: event.timestamp,
    type: event.type,
    methodId: event.methodId,
    principal: event.principal,
    riskTier: event.riskTier,
    status: event.status,
    previousHash,
  };
}

function hashPayload(payload: ReturnType<typeof eventPayload>): string {
  return createHash("sha256").update(JSON.stringify(payload), "utf8").digest("hex");
}

/**
 * Append-only, process-local hash chain.
 * It detects modification/reordering while the process is alive, but it is NOT
 * durable storage, a WORM ledger, a Merkle tree, or a signed external audit log.
 */
export class InMemoryBookPiLedger {
  private readonly events: BookPiEvent[] = [];

  append(input: BookPiEventInput): BookPiEvent {
    if (![input.id, input.timestamp, input.type, input.methodId, input.principal, input.riskTier, input.status].every((value) => value.trim())) {
      throw new Error("BOOKPI_EVENT_FIELDS_REQUIRED");
    }
    if (!Number.isFinite(Date.parse(input.timestamp))) throw new Error("BOOKPI_EVENT_TIMESTAMP_INVALID");
    const previousHash = this.events.at(-1)?.hash ?? GENESIS_HASH;
    const payload = eventPayload(input, previousHash);
    const entry = Object.freeze({ ...payload, hash: hashPayload(payload) });
    this.events.push(entry);
    return { ...entry };
  }

  list(): readonly BookPiEvent[] {
    return this.events.map((event) => Object.freeze({ ...event }));
  }

  verify(): BookPiVerification {
    let previousHash = GENESIS_HASH;
    for (let index = 0; index < this.events.length; index += 1) {
      const event = this.events[index];
      if (!event) continue;
      const payload = eventPayload(event, event.previousHash);
      const expectedHash = hashPayload(payload);
      if (event.previousHash !== previousHash || event.hash !== expectedHash) {
        return {
          status: "INTEGRITY_FAILURE",
          valid: false,
          blocksValidated: index,
          chainHead: this.events.at(-1)?.hash ?? null,
          storage: "VOLATILE_IN_MEMORY",
          wormEnforced: false,
          durable: false,
        };
      }
      previousHash = event.hash;
    }
    return {
      status: this.events.length === 0 ? "EMPTY_CHAIN" : "VERIFIED_IN_MEMORY_CHAIN",
      valid: true,
      blocksValidated: this.events.length,
      chainHead: this.events.at(-1)?.hash ?? null,
      storage: "VOLATILE_IN_MEMORY",
      wormEnforced: false,
      durable: false,
    };
  }

  snapshot() {
    return {
      count: this.events.length,
      events: this.list(),
      ...this.verify(),
      ledgerType: "VOLATILE_IN_MEMORY_HASH_CHAIN" as const,
      merkleRoot: null,
    };
  }
}

export const bookPiLedger = new InMemoryBookPiLedger();
