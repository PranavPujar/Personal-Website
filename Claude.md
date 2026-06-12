# CLAUDE.md — Pranav Pujar Portfolio

Personal portfolio site. Read this before adding features so you don't re-scan the repo.

## Stack
- **SvelteKit 2 + Svelte 5 (runes)**, Vite 8, ESM (`"type": "module"`).
- **SPA, no SSR**: `src/routes/+layout.js` sets `ssr = false` and `prerender = false`. Static export via `@sveltejs/adapter-static` (fallback `index.html`).
- Deploy: **Vercel** (`vercel.json`), build → `build/`. Static assets live in `assets/` (configured as `kit.files.assets`), served from web root.
- Deps: `three` + `three-globe` (globe), `lenis` (smooth scroll), `@lucide/svelte`, `motion-sv`, `@vercel/analytics`.
- Scripts: `npm run dev` / `build` / `preview`. No tests, no linter/formatter configured — match existing style by hand.

## Svelte 5 conventions (use these, not legacy syntax)
- Props: `let { children, speedDiv = 1 } = $props();` — never `export let`.
- State: `$state(...)`, derived: `$derived(...)`, effects: `$effect(() => {...})`.
- Render children: `{@render children()}`. Events are attributes: `onclick={fn}` (not `on:click`).
- Stores still used for cross-component state (see below). Access in markup with `$store`.

## Layout & routing
- `src/routes/+layout.svelte` wraps every page: renders `<SmoothCursor>`, `<Nav>`, and `<main id="scroll-container">` containing the page + `<Footer>`. It inits theme, Lenis smooth scroll (desktop/fine-pointer only), and cancels text streaming on navigation.
- **To add a page**: create `src/routes/<slug>/+page.svelte`. Pattern (copy from `featured/+page.svelte`):
  ```svelte
  <script>
    import Streamer from '$lib/Streamer.svelte';
  </script>
  <svelte:head><title>Title — Pranav Pujar</title></svelte:head>
  <div class="view-content">
    <Streamer speedDiv={0.8}>
      <h2 class="section-title">Heading</h2>
      <p class="section-description">…</p>
    </Streamer>
  </div>
  ```
- **To add it to nav**: edit `src/lib/Nav.svelte` in TWO places — the desktop `<ul class="nav-links">` list AND the `.mobile-dropdown` `<Dock>`. Active state via `class:nav-active={$page.url.pathname === '/slug'}`.
- Existing routes: `/` (home — bio + globe + slideshow), `/journey`, `/featured`, `/blog`, `/fun-facts`. Several are "Coming Soon" stubs.

## Text streaming (signature effect)
- `Streamer.svelte` wraps content; `src/lib/stream.js` reveals words one-by-one on load/navigation.
- `streamView` only targets these selectors: **`.bio p`, `.section-title`, `.card p`, `.card h3`**. If you want new text to stream in, give it one of these classes (or extend the `targets` selector in `stream.js`).
- `speedDiv` controls speed (higher = faster). Pages use `0.8`; home uses `1.9` (`1.9/1.3` on ≤1280px).

## Stores
- `src/lib/stores/app.js`: `appReady` (gates first stream until ~100ms after mount), `streamReset` (bump to re-trigger home stream, e.g. clicking the name while on `/`).
- `src/lib/stores/theme.js`: `theme` custom store. `theme.init()` and `theme.toggle()`. Toggles `light-mode` class on `<html>`/`<body>`. **Persistence key differs by viewport**: `theme-mobile` if `width < 700`, else `theme`. Default `dark`. An inline script in `src/app.html` applies the saved theme pre-hydration to avoid flash.

## Styling
- **All global styles live in `src/app.css`** (~780 lines, organized by `/* ── SECTION ── */` comments). Components mostly use shared classes from here rather than scoped `<style>`. Prefer adding to `app.css` and reusing existing classes.
- **Theme via CSS variables** on `:root`, overridden under `html.light-mode`. Use these — don't hardcode colors:
  - `--bg`, `--text`, `--accent`, `--border`, `--card-bg`
  - Nav: `--nav-text`, `--nav-glow`, `--nav-bracket`
  - Layout: `--side-margin`, `--nav-title-size`, `--nav-subtitle-size`, `--nav-link-size`
  - Dark accent `#e86927` / bg `#040d21`; light accent `#0071e3` / bg `#ffffff`.
- Always provide a `html.light-mode` override for any new colored element (see `.text-link*` for the pattern).
- Reusable classes: `.view-content`, `.section-title`, `.section-description`, `.section-subtitle`, `.bio` / `.bio p`, `.text-link` (+ branded `.text-link-adobe`, `.text-link-uta`), `.grid` / `.card`.
- Responsive breakpoints: **700px** (mobile/desktop split) and **1280/1281px** (sub-laptop vs laptop+). Nav collapses to a centered column + dock dropdown below 1280px.
- Fonts loaded in `src/app.html` via Google Fonts: EB Garamond, Inter, Inter Tight, DM Mono, Montserrat, Onest (+ Emirates Essentials).
- External links: `target="_blank"`, add `rel="noopener noreferrer"`, class `text-link`.

## Magic UI components (`src/lib/components/magic/`)
Ported shadcn-style "magic" components, re-exported via thin wrappers in `src/lib/`:
- `Dock`/`DockIcon` (`dock/`) — used in mobile nav.
- `Pointer` (`pointer/`) → wrapped by `SmoothCursor.svelte`.
- `animated-theme-toggler.svelte` → wrapped by `AnimatedThemeToggler.svelte`.
- `blur-fade.svelte`, `smooth-cursor.svelte`.
Reuse these for fancy UI; `src/lib/utils.js` exports `cn(...)` for class merging.

## Globe (`src/lib/Globe.svelte`)
- Three.js + three-globe flight animation on the home page. Theme-reactive (recolors on light/dark).
- Data files in `src/files/`: `globe-data-min.json` (countries), `my-flights.json` (arcs), `my-airports.json` (points). Edit these JSONs to change globe content; tuning knobs (`GLOBAL_SPEED`, `TOTAL_CYCLE_TIME`) are constants at the top of the component.
- **Built once, persisted across navigations**: the renderer/scene/globe live at module scope (`built` guard). The flight (arc-dash) animation is driven by three-globe's internal `FrameTicker`, created once inside `new ThreeGlobe()` — so the globe must NOT be disposed/rebuilt on every mount or the flights stop and WebGL contexts leak. On mount we re-attach the same canvas and resume the render loop; on unmount we only `stopRendering()` + detach the canvas. Don't add a `renderer.dispose()`/rebuild-per-visit path.
- **Flight-line "counter-change" effect (dark mode only)**: `silhouettePatch()` string-injects an analytic sphere-silhouette mask into each arc's three-globe `ShaderMaterial` (lines dark navy over the globe disc, white past the horizon). Arc materials are cloned per-arc and created async, so `styleArcs()` patches them lazily from the render loop (guarded by `arcsStyled`). A `uEnabled` uniform gates it off in light mode (toggled in `updateGlobeMaterial` over the tracked `arcMats`). The patch keeps three-globe's dash `discard` logic and the animated `dashTranslate` uniform intact — if you change arc colors, do it via `ARC_OVER`/`ARC_OFF` (dark) or the `arcColor` accessor (light).
- Heavy/perf-sensitive — avoid touching unless the task is specifically about the globe.

## Assets
- Static files served from web root: `assets/CV.pdf` → `/CV.pdf`, `assets/favicon.png`. Slideshow/photos under `assets/src/files/` (e.g. `/src/files/slideshow.mp4`).
- `create_slideshow.py` regenerates `slideshow.mp4` from the numbered jpgs (standalone Python script, not part of the build).

## Conventions & gotchas
- 2-space indent. Components/wrappers `PascalCase.svelte` in `src/lib/`; magic primitives `kebab-case.svelte`.
- Import via `$lib/...` and `$app/...` aliases.
- `build/` and `.svelte-kit/` are generated — never edit by hand.
- Guard browser-only code with `import { browser } from '$app/environment'` or `onMount`.
- `notes.txt` is the owner's personal scratchpad (planned `/featured` items: CSE UTA YouTube video, UCMAS abacus, singing) — not instructions for you unless referenced.
- Don't run `git commit`/`push` or `npm run build` unless asked.
