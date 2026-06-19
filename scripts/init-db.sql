CREATE TABLE IF NOT EXISTS sessions (
  id            TEXT PRIMARY KEY,
  city          TEXT,
  region        TEXT,
  country       TEXT,
  timezone      TEXT,
  started_at    TIMESTAMPTZ NOT NULL,
  ended_at      TIMESTAMPTZ,
  duration_sec  INTEGER
);

CREATE TABLE IF NOT EXISTS events (
  id            SERIAL PRIMARY KEY,
  session_id    TEXT REFERENCES sessions(id) ON DELETE CASCADE,
  event_type    TEXT NOT NULL,
  label         TEXT,
  page          TEXT,
  occurred_at   TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_session    ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_label      ON events(label);
CREATE INDEX IF NOT EXISTS idx_events_occurred   ON events(occurred_at);
CREATE INDEX IF NOT EXISTS idx_sessions_region   ON sessions(region);
CREATE INDEX IF NOT EXISTS idx_sessions_started  ON sessions(started_at);
