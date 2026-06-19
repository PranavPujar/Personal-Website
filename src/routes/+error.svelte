<script>
  import { page } from '$app/stores';

  // Friendly copy per status; falls back to the framework-provided message.
  const COPY = {
    404: "This page doesn't exist — it may have moved, or never did.",
    500: 'Something went wrong on my end. Try again in a moment.'
  };
</script>

<svelte:head>
  <title>{$page.status} — Pranav Pujar</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="view-content error-view">
  <p class="error-status">{$page.status}</p>
  <h2 class="error-title">{$page.error?.message ?? 'Not Found'}</h2>
  <p class="error-desc">
    {COPY[$page.status] ?? 'Something unexpected happened.'}
  </p>
  <p class="error-back">
    <a href="/" class="text-link">← Back home</a>
  </p>
</div>

<style>
  /* Inherits .view-content (side-margin gutter + min-height) so it lines up with
     every other page instead of sitting flush against the viewport edge. */
  .error-view {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 70vh;
    padding-top: 4rem;
  }

  .error-status {
    font-size: clamp(3.5rem, 12vw, 7rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    margin: 0;
    color: var(--accent);
  }

  .error-title {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0.75rem 0 0;
    color: var(--text);
  }

  .error-desc {
    font-size: clamp(1rem, 0.7rem + 1vw, 1.15rem);
    font-weight: 300;
    line-height: 1.6;
    margin: 0.75rem 0 0;
    color: color-mix(in srgb, var(--text) 70%, transparent);
    max-width: 32ch;
  }

  .error-back {
    margin-top: 2rem;
    font-size: 1rem;
  }
</style>
