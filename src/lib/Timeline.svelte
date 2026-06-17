<script lang="ts">
  import { onMount, type ComponentType } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { get } from "svelte/store";
  import { appReady } from "$lib/stores/app.js";
  import { streamOnScroll } from "$lib/stream.js";
  import HoverLink from "$lib/HoverLink.svelte";

  type TimelineItem = {
    title: string;
    year?: string;
    location?: string;
    content: ComponentType | string;
    logo?: string;
  };
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
    <p class="journey-subtitle text-sm md:text-base">
      A timeline of the roles I've held, and milestones I've achieved over the
      years. Browse my journey below, or check out a concise <HoverLink
        href="/resume.pdf"
        variant="adobe">resume</HoverLink
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
              {#if item.year}
                <span class="journey-year">{item.year}</span>
              {/if}
              {#if item.location}
                <span class="journey-location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.location}
                </span>
              {/if}
              {#if item.logo}
                <img src={item.logo} alt="" class="journey-logo mt-4" />
              {/if}
            </div>
          </div>

          <div class="relative pl-20 pr-4 md:pl-4 w-full">
            <div class="md:hidden mb-4">
              <h3 class="journey-role">{item.title}</h3>
              {#if item.year}
                <span class="journey-year">{item.year}</span>
              {/if}
              {#if item.location}
                <span class="journey-location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.location}
                </span>
              {/if}
              {#if item.logo}
                <img src={item.logo} alt="" class="journey-logo block mt-3" />
              {/if}
            </div>
            {#if typeof item.content === "string"}
              <p class="journey-desc">{item.content}</p>
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
    opacity: 1;
  }

  /* ╔══════════════════════════════════════════════════════════════╗
     ║  SIZE KNOBS — edit these to resize each journey item's parts  ║
     ║    • TITLE → .journey-role  →  font-size                      ║
     ║    • YEAR  → .journey-year  →  font-size                      ║
     ║    • LOGO  → .journey-logo  →  width                          ║
     ╚══════════════════════════════════════════════════════════════╝ */
  .journey-role {
    font-size: clamp(1rem, 1rem + 1.8vw, 1.5rem); /* ← TITLE size */
    font-weight: 700;
    line-height: 1.12;
    color: var(--text);
  }
  .journey-year {
    display: block;
    margin-top: 0.4rem;
    font-size: clamp(0.8rem, 0.8rem + 1vw, 1.3rem); /* ← YEAR size */
    font-weight: 600;
    color: color-mix(in srgb, var(--text) 60%, transparent);
  }
  .journey-logo {
    width: 200px; /* ← LOGO size */
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .journey-location {
    display: inline-flex;
    align-items: center;
    gap: 0.32rem;
    margin-top: 0.4rem;
    font-size: clamp(0.6rem, 0.6rem + 1vw, 1rem);
    font-weight: 500;
    color: color-mix(in srgb, var(--text) 45%, transparent);
  }
  .journey-location svg {
    width: 0.95em;
    height: 0.95em;
    flex: none;
  }

  .journey-desc {
    color: color-mix(in srgb, var(--text) 82%, transparent);
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
