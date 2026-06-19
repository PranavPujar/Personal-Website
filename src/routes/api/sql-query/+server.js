import { json } from '@sveltejs/kit';
import { getSql } from '$lib/server/db.js';
import { checkPassword } from '$lib/server/analytics-queries.js';

export const prerender = false;

// Owner-only raw SQL runner for the analytics dashboard. Password-gated; runs
// whatever query is submitted straight against Neon and returns the rows.
export async function POST({ request }) {
  if (!checkPassword(request)) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const query = body?.query;
  if (!query || typeof query !== 'string') {
    return json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    const sql = getSql();
    const rows = await sql.query(query);
    return json({ rows });
  } catch (err) {
    // Surface the DB error text — this endpoint is owner-only behind the password.
    return json({ error: err?.message || 'Query failed' }, { status: 400 });
  }
}
