// Server-only Neon client. Files under $lib/server can never be imported into
// client bundles, so the connection string stays off the browser.
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

let _sql;

/** Lazily create the Neon HTTP query function (so import doesn't throw when env is absent). */
export function getSql() {
  if (!_sql) {
    if (!env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
    _sql = neon(env.DATABASE_URL);
  }
  return _sql;
}
