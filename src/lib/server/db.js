// Server-only Neon client. Files under $lib/server can never be imported into
// client bundles, so the connection string stays off the browser.
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

let _sql;

/** Lazily create the Neon HTTP query function (so import doesn't throw when env is absent). */
export function getSql() {
  if (!_sql) {
    // Vercel's Neon integration prefixes its env vars with `neondb_`; fall back
    // to an unprefixed DATABASE_URL for other setups.
    const url = env.neondb_DATABASE_URL ?? env.DATABASE_URL;
    if (!url) {
      throw new Error('neondb_DATABASE_URL (or DATABASE_URL) is not set');
    }
    _sql = neon(url);
  }
  return _sql;
}
