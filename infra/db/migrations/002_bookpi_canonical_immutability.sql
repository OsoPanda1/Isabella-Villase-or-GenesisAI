ALTER TABLE bookpi_events ADD COLUMN IF NOT EXISTS canonical TEXT;

UPDATE bookpi_events SET canonical = NULL WHERE canonical IS NULL;

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
BEGIN
  IF expected_integrity_seed IS NULL OR length(expected_integrity_seed) < 32 THEN
    RAISE EXCEPTION 'BOOKPI: integrity secret must be supplied externally';
  END IF;
  FOR ev IN SELECT * FROM bookpi_events ORDER BY sequence ASC LOOP
    total := total + 1;
    IF ev.canonical IS NULL OR ev.prev_hash <> prior OR encode(digest(ev.canonical, 'sha256'), 'hex') <> ev.hash THEN
      bad := bad + 1;
    END IF;
    IF encode(digest(expected_integrity_seed || ':' || ev.hash, 'sha3-512'), 'hex') <> ev.integrity THEN
      bad := bad + 1;
    END IF;
    prior := ev.hash;
  END LOOP;
  RETURN QUERY SELECT (bad = 0), total;
END;
$$;
