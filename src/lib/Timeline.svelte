<script lang="ts">
  import { onMount, type ComponentType } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { get } from "svelte/store";
  import { appReady } from "$lib/stores/app.js";
  import { theme } from "$lib/stores/theme.js";
  import { streamOnScroll } from "$lib/stream.js";
  import HoverLink from "$lib/HoverLink.svelte";
  import posthog from 'posthog-js';

  type ThemedLogo = { light: string; dark: string };
  type TimelineItem = {
    title: string;
    year?: string;
    location?: string;
    content: ComponentType | string;
    logo?: string | ThemedLogo;
  };

  // A logo may be a single path or a { light, dark } pair (e.g. the UTA mark,
  // which needs a dark logo on the light bg and a white logo on the dark bg).
  function logoSrc(logo: string | ThemedLogo | undefined, mode: string) {
    if (!logo) return undefined;
    return typeof logo === "string" ? logo : mode === "light" ? logo.light : logo.dark;
  }

  // ── PER-LOGO SIZE KNOBS ──
  // Each unique logo is sized independently (px width). Tweak a value to resize
  // just that logo everywhere it appears; default is used for any other logo.
  const LOGO_WIDTHS: Record<string, number> = {
    adobe: 290,
    amd: 280,
    idir: 260,
    uta: 260,
    default: 200,
  };
  function logoKey(logo: string | ThemedLogo | undefined): string {
    const path = typeof logo === "string" ? logo : logo?.dark ?? "";
    return (
      ["adobe", "amd", "idir", "uta"].find((k) => path.includes(k)) ?? "default"
    );
  }
  function logoWidth(logo: string | ThemedLogo | undefined): number {
    return LOGO_WIDTHS[logoKey(logo)] ?? LOGO_WIDTHS.default;
  }
  export let timelineData: TimelineItem[] = [];

  let rootEl: HTMLDivElement; // whole journey section (streaming scope)
  let lineEl: HTMLDivElement; // the timeline body (positioning context for dots + line)
  let trackHeight = 0; // full height of the faint background line

  // The animated progress fill. Driven directly from scroll position so it maps
  // linearly from "section enters view" → "very bottom of the page", where it
  // lands exactly on the last item's dot.
  let fillHeight = tweened(0, { duration: 180, easing: cubicOut });
  let fillOpacity = tweened(0, { duration: 180, easing: cubicOut });

  function measure() {
    if (lineEl) trackHeight = lineEl.scrollHeight;
  }

  function update() {
    if (!lineEl) return;
    const wh = window.innerHeight;
    const rect = lineEl.getBoundingClientRect();
    const dots = lineEl.querySelectorAll<HTMLElement>("[data-timeline-dot]");
    if (!dots.length) return;

    // Where the last dot's centre sits relative to the top of the line track.
    const last = dots[dots.length - 1].getBoundingClientRect();
    const lastDotY = last.top + last.height / 2 - rect.top;

    const scrollEl = document.scrollingElement || document.documentElement;
    const scrollY = scrollEl.scrollTop;
    const maxScroll = Math.max(1, scrollEl.scrollHeight - wh);
    const lineTopDoc = rect.top + scrollY;
    const start = lineTopDoc - wh * 0.6; // begin filling as the section enters view
    const denom = Math.max(1, maxScroll - start);
    let p = (scrollY - start) / denom;
    p = Math.min(1, Math.max(0, p));

    fillHeight.set(p * lastDotY); // p === 1 at page bottom → reaches the last dot
    fillOpacity.set(Math.min(1, p * 12));
  }

  onMount(() => {
    measure();
    update();

    const onScroll = () => update();
    const onResize = () => {
      measure();
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Recompute when the body's height settles (e.g. logos finish loading).
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    if (lineEl) ro.observe(lineEl);

    // Scroll-triggered word streaming, gated on appReady like the landing page.
    let stopStream: (() => void) | undefined;
    const startStreaming = () => {
      stopStream = streamOnScroll(rootEl, {
        selector:
          ".journey-subtitle, .journey-role, .journey-year, .journey-location, .journey-desc",
        speedDiv: 1.2,
      });
    };
    let unsub: (() => void) | undefined;
    if (get(appReady)) startStreaming();
    else
      unsub = appReady.subscribe((ready: boolean) => {
        if (ready) {
          startStreaming();
          unsub?.();
        }
      });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      stopStream?.();
      unsub?.();
    };
  });
</script>

<div class="w-full journey-bg font-sans" bind:this={rootEl}>
  <div class="journey-pad journey-header">
    <p class="journey-subtitle">
      A timeline of the roles I've held, and milestones I've achieved over the
      years. Browse my journey below, or check out a concise <HoverLink
        href="/resume.pdf"
        variant="adobe"
        onclick={() => posthog.capture('resume_viewed')}>resume</HoverLink
      >.
    </p>
  </div>

  <div class="journey-pad pb-20">
    <div class="relative overflow-hidden" bind:this={lineEl}>
      {#each timelineData as item, index}
        <div
          class="flex justify-start md:gap-10 {index === 0
            ? 'pt-6 md:pt-12'
            : 'pt-10 md:pt-40'}"
        >
          <div
            class="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
          >
            <div
              data-timeline-dot
              class="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"
            >
              <div
                class="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"
              />
            </div>
            <div class="hidden md:flex md:flex-col md:pl-20">
              <h3 class="journey-role">{item.title}</h3>
              {#if item.year || item.location}
                <div class="journey-meta">
                  {#if item.year}
                    <span class="journey-year">{item.year}</span>
                  {/if}
                  {#if item.location}
                    <span class="journey-location">
                      <span class="journey-pin" aria-hidden="true">📍</span>
                      {item.location}
                    </span>
                  {/if}
                </div>
              {/if}
              {#if item.logo}
                <img src={logoSrc(item.logo, $theme)} alt="" style="--logo-w: {logoWidth(item.logo)}px" class="journey-logo mt-4" />
              {/if}
            </div>
          </div>

          <div class="relative pl-20 pr-4 md:pl-4 w-full">
            <div class="md:hidden mb-4">
              <h3 class="journey-role">{item.title}</h3>
              {#if item.year || item.location}
                <div class="journey-meta">
                  {#if item.year}
                    <span class="journey-year">{item.year}</span>
                  {/if}
                  {#if item.location}
                    <span class="journey-location">
                      <span class="journey-pin" aria-hidden="true">📍</span>
                      {item.location}
                    </span>
                  {/if}
                </div>
              {/if}
              {#if item.logo}
                <img src={logoSrc(item.logo, $theme)} alt="" style="--logo-w: {logoWidth(item.logo)}px" class="journey-logo block mt-3" />
              {/if}
            </div>
            {#if typeof item.content === "string"}
              <!-- HTML so descriptions can include inline links (e.g. <a>);
                   stream.js reveals each <a> as a single word unit. -->
              <p class="journey-desc">{@html item.content}</p>
            {:else}
              <svelte:component this={item.content} />
            {/if}
          </div>
        </div>
      {/each}

      <div
        style="height: {trackHeight}px;"
        class="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] timeline-line"
      >
        <div
          style="height: {$fillHeight}px; opacity: {$fillOpacity};"
          class="absolute inset-x-0 top-0 w-[2px] rounded-full timeline-fill"
        />
      </div>
    </div>
  </div>
</div>

<style>
  /* Match the left/right gutter the nav, title and subtitle use. */
  .journey-pad {
    padding-left: var(--side-margin);
    padding-right: var(--side-margin);
  }

  /* Follow the site theme background (dark navy / white) rather than the
     Tailwind neutral fallback. */
  .journey-bg {
    background: var(--bg);
  }

  /* Tight header. */
  .journey-header {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }

  .journey-subtitle {
    color: var(--text);
    font-size: clamp(1rem, 0.7rem + 1vw, 1.2rem); /* match the about/bio body */
    opacity: 1;
  }

  /* ╔══════════════════════════════════════════════════════════════╗
     ║  SIZE KNOBS — edit these to resize each journey item's parts  ║
     ║    • TITLE → .journey-role  →  font-size                      ║
     ║    • YEAR  → .journey-year  →  font-size                      ║
     ║    • LOGO  → LOGO_WIDTHS in <script>                          ║
     ╚══════════════════════════════════════════════════════════════╝ */
  .journey-role {
    font-size: clamp(1rem, 1rem + 1.8vw, 1.5rem); /* ← TITLE size */
    font-weight: 700;
    line-height: 1.12;
    color: var(--text);
  }
  .journey-year {
    font-size: clamp(0.8rem, 0.8rem + 1vw, 1.25rem); /* ← YEAR size */
    font-weight: 600;
    color: color-mix(in srgb, var(--text) 60%, transparent);
  }

  /* Year + location sit on one line, location to the right of the year (all
     viewports). */
  .journey-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 0.7rem;
    margin-top: 0.4rem;
  }
  
  .journey-logo {
    /* per-logo width comes from the inline --logo-w var (see LOGO_WIDTHS). */
    width: var(--logo-w);
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
  /* Mobile viewports: every logo renders 15px narrower. */
  @media (max-width: 700px) {
    .journey-logo { width: calc(var(--logo-w) - 60px); }
  }

  .journey-location {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    font-size: clamp(0.8rem, 0.8rem + 1vw, 1.25rem);
    font-weight: 500;
    color: color-mix(in srgb, var(--text) 45%, transparent);
  }
  .journey-pin {
    font-size: 1.05em;
    line-height: 1;
    flex: none;
  }

  .journey-desc {
    color: color-mix(in srgb, var(--text) 82%, transparent);
    font-size: clamp(1rem, 0.7rem + 1vw, 1.2rem); /* match the about/bio body */
    line-height: 1.6;
    margin: 0;
    white-space: pre-line; /* honor explicit "\n" in a description as a line break */
  }

  /* The static timeline line is invisible; only the progress fill shows,
     coloured per theme (white in dark mode, the dark-mode bg in light mode). */
  .timeline-line {
    background: transparent;
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
  }
  .timeline-fill {
    background: #ffffff;
  }
  :global(html.light-mode) .timeline-fill {
    background: #040d21;
  }
</style>

