import { verifyChainLink, ZERO_HASH } from "./crypto";
import { buildBookPiEvent } from "./emitter";
import type { BookPiEventRecord, BookPiEventSeed, BookPiStorage } from "./types";

export interface PostgresLike {
  query(text: string, params?: unknown[]): Promise<{ rows: unknown[] }>;
}

export interface PostgresBookPiRow {
  id: string; type: string; sequence: number; prev_hash: string; timestamp: string;
  actor_id: string | null; payload: unknown; schema_version: string; meta: unknown;
  header: unknown; hash: string; integrity: string; canonical: string;
}

export const BOOKPI_TABLE = "bookpi_events";

const rowToRecord = (row: PostgresBookPiRow): BookPiEventRecord => ({
  id: row.id, type: row.type, sequence: row.sequence, prevHash: row.prev_hash, timestamp: row.timestamp,
  actorId: row.actor_id ?? undefined, header: row.header as BookPiEventRecord["header"],
  payload: row.payload as BookPiEventRecord["payload"], schemaVersion: row.schema_version,
  meta: (row.meta ?? {}) as BookPiEventRecord["meta"], hash: row.hash, integrity: row.integrity, canonical: row.canonical,
});

function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: unknown }).code === "23505";
}

/**
 * Postgres adapter. Concurrency is handled by retrying sequence allocation after
 * a unique collision; the migration additionally installs a sequence and trigger.
 * Production deployments should use a dedicated append-only DB role.
 */
export function createPostgresStorage(pool: PostgresLike, table = BOOKPI_TABLE): BookPiStorage {
  const quote = (ident: string): string => `"${ident.replaceAll('"', '""')}"`;

  async function getLastEvent(): Promise<BookPiEventRecord | null> {
    const { rows } = await pool.query(`SELECT * FROM ${quote(table)} ORDER BY sequence DESC LIMIT 1`);
    const row = rows[0] as PostgresBookPiRow | undefined;
    return row ? rowToRecord(row) : null;
  }

  async function appendEvent(seed: BookPiEventSeed, ctx: { secret?: string } = {}): Promise<BookPiEventRecord> {
    let lastError: unknown;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const last = await getLastEvent();
      const sequence = last ? last.sequence + 1 : 1;
      const prevHash = last ? last.hash : ZERO_HASH;
      const record = buildBookPiEvent(seed, {
        sequence, prevHash, timestamp: new Date().toISOString(), secret: ctx.secret,
      });
      try {
        await pool.query(
          `INSERT INTO ${quote(table)}
           (id, type, sequence, prev_hash, timestamp, actor_id, payload, schema_version, meta, header, hash, integrity, canonical)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
          [record.id, record.type, record.sequence, record.prevHash, record.timestamp, record.actorId ?? null,
           record.payload, record.schemaVersion, record.meta, record.header, record.hash, record.integrity, record.canonical],
        );
        return record;
      } catch (error) {
        lastError = error;
        if (!isUniqueViolation(error)) throw error;
      }
    }
    throw new Error("BOOKPI: concurrent append failed after 4 retries", { cause: lastError });
  }

  async function listEvents(): Promise<BookPiEventRecord[]> {
    const { rows } = await pool.query(`SELECT * FROM ${quote(table)} ORDER BY sequence ASC`);
    return (rows as PostgresBookPiRow[]).map(rowToRecord);
  }

  async function verifyChain(opts: { secret?: string } = {}): Promise<{ valid: boolean; count: number; failures: string[] }> {
    const events = await listEvents();
    const failures: string[] = [];
    let prevHash = ZERO_HASH;
    for (const event of events) {
      if (event.prevHash !== prevHash) failures.push(`evento ${event.sequence} (${event.id}): prevHash no encadena`);
      if (!verifyChainLink(event, opts.secret)) failures.push(`evento ${event.sequence} (${event.id}): hash/integridad inválidos`);
      prevHash = event.hash;
    }
    return { valid: failures.length === 0, count: events.length, failures };
  }

  return { getLastEvent, appendEvent, listEvents, verifyChain };
}
