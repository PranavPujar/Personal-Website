# Pranav Pujar — Portfolio

Personal portfolio site built with SvelteKit 2 + Svelte 5, deployed on Vercel.

## Analytics Database Setup

The site includes a first-party, privacy-friendly analytics system (no IPs stored)
backed by a Neon Postgres database. To set it up:

1. Go to your Vercel dashboard → **Storage** → **Add Database** → select **Neon**.
2. `DATABASE_URL` is injected into your project environment automatically — do **not** set it by hand.
3. For local development, link the project and pull env vars:
   ```bash
   vercel env pull .env.local
   ```
4. Add the non-Vercel-managed variables to `.env.local`:
   ```
   ANALYTICS_PASSWORD=idli
   ANTHROPIC_API_KEY=your_key_here
   ```
5. Run the migration (idempotent — safe to re-run):
   ```bash
   node scripts/migrate.js
   ```

The password-protected dashboard lives at `/analytics` (not linked anywhere on the site).
