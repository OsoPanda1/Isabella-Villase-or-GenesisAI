-- BookPI append-only ledger (WORM-diseñado).
-- Canon: SHA3-512 hash chaining, protocolo tamv-federation-v1.

CREATE TABLE IF NOT EXISTS bookpi_events (
  id             TEXT        PRIMARY KEY,
  type           TEXT        NOT NULL,
  sequence       BIGINT      NOT NULL UNIQUE,
  prev_hash      TEXT        NOT NULL,
  timestamp      TIMESTAMPTZ NOT NULL,
  actor_id       TEXT,
  payload        JSONB       NOT NULL,
  schema_version TEXT        NOT NULL,
  meta           JSONB       NOT NULL DEFAULT '{}'::jsonb,
  header         JSONB       NOT NULL,
  hash           TEXT        NOT NULL,
  integrity      TEXT        NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Inmutabilidad operativa: no UPDATE, no DELETE salvo rotación completa del
-- artefacto. Los permisos se conceden sólo con INSERT + SELECT.
CREATE INDEX IF NOT EXISTS idx_bookpi_events_sequence   ON bookpi_events (sequence ASC);
CREATE INDEX IF NOT EXISTS idx_bookpi_events_type       ON bookpi_events (type);
CREATE INDEX IF NOT EXISTS idx_bookpi_events_timestamp  ON bookpi_events (timestamp DESC);

-- Verificación canónica de cadena (debe devolver exactamente 1 fila con
-- valid = true) — re-hash SHA3-512 de la columna hash.
CREATE OR REPLACE FUNCTION bookpi_validate_chain(
  expected_integrity_seed TEXT DEFAULT 'bookpi-development'
) RETURNS TABLE (valid boolean, checked_events bigint) AS $$
DECLARE
  prior TEXT := repeat('0', 64);
  ev    RECORD;
  bad   INTEGER := 0;
  total BIGINT := 0;
BEGIN
  FOR ev IN SELECT * FROM bookpi_events ORDER BY sequence ASC LOOP
    total := total + 1;
    IF ev.prev_hash <> prior THEN
      bad := bad + 1;
    END IF;
    IF encode(sha3_512(expected_integrity_seed || ':' || ev.hash), 'hex') <> ev.integrity THEN
      bad := bad + 1;
    END IF;
    prior := ev.hash;
  END LOOP;
  RETURN QUERY SELECT (bad = 0) AS valid, total AS checked_events;
END;
$$ LANGUAGE plpgsql IMMUTABLE;