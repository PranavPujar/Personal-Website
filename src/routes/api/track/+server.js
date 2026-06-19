import { json } from '@sveltejs/kit';
import { getSql } from '$lib/server/db.js';

export const prerender = false;

// Public ingest endpoint. Stores a session row, closes it out, or records a
// click. IP addresses are never accepted, logged, or stored.
export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { eventType, sessionId } = body ?? {};

  try {
    const sql = getSql();

    if (eventType === 'session_start') {
      if (!sessionId) return json({ error: 'Missing sessionId' }, { status: 400 });
      const { city = null, region = null, country = null, timezone = null } = body;
      await sql`
        INSERT INTO sessions (id, city, region, country, timezone, started_at)
        VALUES (${sessionId}, ${city}, ${region}, ${country}, ${timezone}, NOW())
        ON CONFLICT (id) DO NOTHING`;
      return json({ ok: true });
    }

    if (eventType === 'session_end') {
      const { duration_sec } = body;
      if (!sessionId || duration_sec == null) {
        return json({ error: 'Missing fields' }, { status: 400 });
      }
      await sql`
        UPDATE sessions SET ended_at = NOW(), duration_sec = ${duration_sec}
        WHERE id = ${sessionId}`;
      return json({ ok: true });
    }

    if (eventType === 'click') {
      const { label, page = null } = body;
      if (!sessionId || !label) return json({ error: 'Missing fields' }, { status: 400 });
      await sql`
        INSERT INTO events (session_id, event_type, label, page, occurred_at)
        VALUES (${sessionId}, 'click', ${label}, ${page}, NOW())`;
      return json({ ok: true });
    }

    return json({ error: 'Unknown eventType' }, { status: 400 });
  } catch (err) {
    console.error('[/api/track] error:', err);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
