-- Analytics schema for the custom (non-Vercel) analytics.
-- Run this once against your Neon database (SQL Editor or psql).
-- No IP addresses are ever stored — only coarse geo + timing.

CREATE TABLE IF NOT EXISTS sessions (
  id           TEXT PRIMARY KEY,           -- client-generated session id
  city         TEXT,
  region       TEXT,                       -- state / province
  country      TEXT,
  timezone     TEXT,
  started_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at     TIMESTAMPTZ,
  duration_sec INTEGER
);

CREATE TABLE IF NOT EXISTS events (
  id          BIGSERIAL PRIMARY KEY,
  session_id  TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  event_type  TEXT NOT NULL,              -- currently always 'click'
  label       TEXT NOT NULL,              -- e.g. 'Resume Download', 'YouTube Interview'
  page        TEXT,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for the dashboard's group-by / join / filter patterns.
CREATE INDEX IF NOT EXISTS idx_events_session_id  ON events (session_id);
CREATE INDEX IF NOT EXISTS idx_events_type_label  ON events (event_type, label);
CREATE INDEX IF NOT EXISTS idx_events_occurred_at ON events (occurred_at);
CREATE INDEX IF NOT EXISTS idx_sessions_started   ON sessions (started_at);
CREATE INDEX IF NOT EXISTS idx_sessions_region    ON sessions (region);
