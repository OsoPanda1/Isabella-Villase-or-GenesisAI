-- BookPI append-only evidence ledger.
-- Event hash: SHA-256(canonical event core).
-- Integrity seal: SHA3-512(secret:event_hash).
CREATE SEQUENCE IF NOT EXISTS bookpi_events_sequence_seq;

CREATE TABLE IF NOT EXISTS bookpi_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  sequence BIGINT NOT NULL UNIQUE DEFAULT nextval('bookpi_events_sequence_seq'),
  prev_hash TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  actor_id TEXT,
  payload JSONB NOT NULL,
  schema_version TEXT NOT NULL,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  header JSONB NOT NULL,
  hash TEXT NOT NULL,
  integrity TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER SEQUENCE bookpi_events_sequence_seq OWNED BY bookpi_events.sequence;
CREATE INDEX IF NOT EXISTS idx_bookpi_events_sequence ON bookpi_events(sequence ASC);
CREATE INDEX IF NOT EXISTS idx_bookpi_events_type ON bookpi_events(type);
CREATE INDEX IF NOT EXISTS idx_bookpi_events_timestamp ON bookpi_events(timestamp DESC);

CREATE OR REPLACE FUNCTION bookpi_validate_chain(expected_integrity_seed TEXT)
RETURNS TABLE(valid boolean, checked_events bigint)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  prior TEXT := repeat('0', 64);
  ev RECORD;
  bad INTEGER := 0;
  total BIGINT := 0;
  expected_hash TEXT;
BEGIN
  IF expected_integrity_seed IS NULL OR length(expected_integrity_seed) < 32 THEN
    RAISE EXCEPTION 'BOOKPI: integrity secret must be supplied externally';
  END IF;

  FOR ev IN SELECT * FROM bookpi_events ORDER BY sequence ASC LOOP
    total := total + 1;
    expected_hash := encode(digest(
      jsonb_build_object(
        'type', ev.type,
        'id', ev.id,
        'sequence', ev.sequence,
        'prevHash', ev.prev_hash,
        'timestamp', ev.timestamp,
        'actorId', ev.actor_id,
        'header', ev.header,
        'payload', ev.payload,
        'schemaVersion', ev.schema_version,
        'meta', ev.meta
      )::text,
      'sha256'
    ), 'hex');

    IF ev.prev_hash <> prior OR ev.hash <> expected_hash THEN
      bad := bad + 1;
    END IF;
    IF encode(digest(expected_integrity_seed || ':' || expected_hash, 'sha3-512'), 'hex') <> ev.integrity THEN
      bad := bad + 1;
    END IF;
    prior := ev.hash;
  END LOOP;
  RETURN QUERY SELECT (bad = 0), total;
END;
$$;

-- WORM boundary: application role must receive SELECT/INSERT only.
-- REVOKE UPDATE/DELETE/TRUNCATE is intentional. Grant statements are deployment-role specific.
REVOKE UPDATE, DELETE, TRUNCATE ON bookpi_events FROM PUBLIC;
REVOKE UPDATE, DELETE, TRUNCATE ON SEQUENCE bookpi_events_sequence_seq FROM PUBLIC;
