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
  sequence: number;
}

export interface BookPiVerification {
  status: "EMPTY_CHAIN" | "VERIFIED_IN_MEMORY_CHAIN" | "INTEGRITY_FAILURE";
  valid: boolean;
  blocksValidated: number;
  chainHead: string | null;
  storage: "VOLATILE_IN_MEMORY";
  wormEnforced: false;
  durable: false;
  verifiedAt?: string;
  brokenIndex?: number | null;
  diagnostics?: readonly string[];
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
    const sequence = this.events.length + 1;
    const payload = eventPayload(input, previousHash);
    const entry: BookPiEvent = Object.freeze({
      ...payload,
      sequence,
      hash: hashPayload(payload),
    });
    this.events.push(entry);
    return { ...entry };
  }

  list(limit?: number): readonly BookPiEvent[] {
    const list = limit && limit > 0 ? this.events.slice(-limit) : this.events;
    return list.map((event) => Object.freeze({ ...event }));
  }

  getEventById(id: string): BookPiEvent | null {
    const found = this.events.find((e) => e.id === id);
    return found ? Object.freeze({ ...found }) : null;
  }

  verify(): BookPiVerification {
    let previousHash = GENESIS_HASH;
    const diagnostics: string[] = [];
    const verifiedAt = new Date().toISOString();

    for (let index = 0; index < this.events.length; index += 1) {
      const event = this.events[index];
      if (!event) continue;
      const payload = eventPayload(event, event.previousHash);
      const expectedHash = hashPayload(payload);
      if (event.previousHash !== previousHash) {
        diagnostics.push(`Chain broken at block #${index + 1} (${event.id}): previousHash mismatch`);
        return {
          status: "INTEGRITY_FAILURE",
          valid: false,
          blocksValidated: index,
          chainHead: this.events.at(-1)?.hash ?? null,
          storage: "VOLATILE_IN_MEMORY",
          wormEnforced: false,
          durable: false,
          verifiedAt,
          brokenIndex: index,
          diagnostics: Object.freeze(diagnostics),
        };
      }
      if (event.hash !== expectedHash) {
        diagnostics.push(`Integrity failure at block #${index + 1} (${event.id}): hash mismatch`);
        return {
          status: "INTEGRITY_FAILURE",
          valid: false,
          blocksValidated: index,
          chainHead: this.events.at(-1)?.hash ?? null,
          storage: "VOLATILE_IN_MEMORY",
          wormEnforced: false,
          durable: false,
          verifiedAt,
          brokenIndex: index,
          diagnostics: Object.freeze(diagnostics),
        };
      }
      previousHash = event.hash;
    }

    diagnostics.push(`Chain intact: ${this.events.length} block(s) validated sequentially from genesis`);

    return {
      status: this.events.length === 0 ? "EMPTY_CHAIN" : "VERIFIED_IN_MEMORY_CHAIN",
      valid: true,
      blocksValidated: this.events.length,
      chainHead: this.events.at(-1)?.hash ?? null,
      storage: "VOLATILE_IN_MEMORY",
      wormEnforced: false,
      durable: false,
      verifiedAt,
      brokenIndex: null,
      diagnostics: Object.freeze(diagnostics),
    };
  }

  getSummary() {
    const events = this.events;
    const typeCounts: Record<string, number> = {};
    const riskCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};

    for (const ev of events) {
      typeCounts[ev.type] = (typeCounts[ev.type] ?? 0) + 1;
      riskCounts[ev.riskTier] = (riskCounts[ev.riskTier] ?? 0) + 1;
      statusCounts[ev.status] = (statusCounts[ev.status] ?? 0) + 1;
    }

    return {
      totalEvents: events.length,
      genesisHash: GENESIS_HASH,
      chainHead: events.at(-1)?.hash ?? null,
      firstTimestamp: events.at(0)?.timestamp ?? null,
      lastTimestamp: events.at(-1)?.timestamp ?? null,
      typeCounts,
      riskCounts,
      statusCounts,
    };
  }

  snapshot() {
    return {
      count: this.events.length,
      events: this.list(),
      ...this.verify(),
      summary: this.getSummary(),
      ledgerType: "VOLATILE_IN_MEMORY_HASH_CHAIN" as const,
      merkleRoot: null,
    };
  }
}

export const bookPiLedger = new InMemoryBookPiLedger();
