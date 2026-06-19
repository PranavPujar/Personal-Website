#!/usr/bin/env node
// Idempotent database migration: applies scripts/init-db.sql to DATABASE_URL.
// Usage: node scripts/migrate.js
// DATABASE_URL is read from the environment, falling back to .env.local
// (so `vercel env pull .env.local` is all you need locally).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .env.local loader (only if DATABASE_URL isn't already in the env).
function loadEnvLocal() {
  if (process.env.DATABASE_URL) return;
  try {
    const content = readFileSync(join(__dirname, '..', '.env.local'), 'utf8');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      }
    }
  } catch {
    /* no .env.local — rely on the real environment */
  }
}

async function main() {
  loadEnvLocal();

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('✗ DATABASE_URL is not set. Add a Neon DB in Vercel, then run `vercel env pull .env.local`.');
    process.exit(1);
  }

  const sql = neon(url);
  const schema = readFileSync(join(__dirname, 'init-db.sql'), 'utf8');

  // Split into individual statements (the schema has no embedded semicolons);
  // strip line comments so each chunk is a single executable statement.
  const statements = schema
    .split(';')
    .map((s) => s.replace(/--.*$/gm, '').trim())
    .filter(Boolean);

  try {
    for (const stmt of statements) {
      await sql.query(stmt);
    }
    console.log(`✓ Migration complete — ${statements.length} statements applied (idempotent).`);
    process.exit(0);
  } catch (err) {
    console.error('✗ Migration failed:', err.message);
    process.exit(1);
  }
}

main();
