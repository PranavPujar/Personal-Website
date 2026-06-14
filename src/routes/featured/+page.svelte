<script>
  import Streamer from '$lib/Streamer.svelte';

  const VIDEO_ID = 'Wk0nP-3bYaQ';
  let playing = $state(false);
  let iframeEl = $state(null);
  let cardEl = $state(null);
  let playerWidth = $state(0);

  // Size the player to exactly match the thumbnail's rendered width.
  const measure = () => {
    if (cardEl) playerWidth = cardEl.getBoundingClientRect().width;
  };

  const open = () => {
    measure();
    playing = true;
  };
  const close = () => (playing = false);

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  // ── "Watch interview" pill: smooth cursor-follow ──────────────────────────
  // The pill chases the cursor with a per-frame lerp (RAF) for buttery motion.
  // Position AND scale are driven via transform (translate3d → GPU). The pill is
  // fully opaque, so we show/hide it by *scaling* (never fading): it grows in at
  // the cursor and collapses to nothing within 2px of any edge, so it gracefully
  // shrinks away as the cursor moves out of the thumbnail.
  let watchEl = $state(null);
  let rafId = 0;
  let hovering = false;
  const pos = { x: 0, y: 0, s: 0 };     // eased position + scale
  const target = { x: 0, y: 0, s: 0 };  // desired position + scale

  function renderWatch() {
    if (watchEl) {
      watchEl.style.transform =
        `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${pos.s})`;
    }
  }

  function watchTick() {
    const ease = 0.15; // lower = smoother/longer trail, higher = snappier
    pos.x += (target.x - pos.x) * ease;
    pos.y += (target.y - pos.y) * ease;
    pos.s += (target.s - pos.s) * ease;
    renderWatch();
    if (!hovering && pos.s < 0.01) { // collapsed & gone → stop to save the CPU
      pos.s = 0;
      renderWatch();
      rafId = 0;
      return;
    }
    rafId = requestAnimationFrame(watchTick);
  }

  function trackCursor(e) {
    const r = cardEl.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    target.x = x;
    target.y = y;
    // Full size when ≥2px from every edge; ramps to 0 across the last 2px so the
    // pill shrinks away right as the cursor leaves the thumbnail.
    const dEdge = Math.min(x, y, r.width - x, r.height - y);
    target.s = Math.max(0, Math.min(1, dEdge / 2));
  }

  function onCardEnter(e) {
    if (e.pointerType === 'touch') return; // follow is a fine-pointer affordance
    hovering = true;
    trackCursor(e);
    pos.x = target.x; // appear at the cursor, no slide-in from a stale spot
    pos.y = target.y;
    pos.s = 0;        // grow in from nothing
    renderWatch();
    if (!rafId) rafId = requestAnimationFrame(watchTick);
  }

  function onCardMove(e) {
    if (e.pointerType === 'touch') return;
    if (!hovering) { onCardEnter(e); return; }
    trackCursor(e);
  }

  function onCardLeave() {
    hovering = false; // shrink away; the loop self-stops once collapsed
    target.s = 0;
  }

  // Stop the loop if we navigate away mid-hover.
  $effect(() => () => { if (rafId) cancelAnimationFrame(rafId); });

  // Keep the player matched to the thumbnail when the viewport changes.
  $effect(() => {
    if (!playing) return;
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  });

  // Tell the embed to pause (used when the tab is backgrounded, e.g. the user
  // clicks the player's "YouTube" button which opens the video in a new tab).
  function pauseVideo() {
    iframeEl?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
      '*'
    );
  }

  // Pause when the tab loses visibility (the YouTube button opens a new tab).
  $effect(() => {
    if (!playing) return;
    const onVisibility = () => {
      if (document.hidden) pauseVideo();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  });
</script>

<svelte:head>
  <title>Featured — Pranav Pujar</title>
</svelte:head>

<svelte:window onkeydown={onKeydown} />

<div class="view-content">
  <Streamer speedDiv={0.8}>
    <!-- <h2 class="section-title featured-title">Interviewed by the Computer Science Dept. @ UTA for Winning Outstanding Masters Student Award</h2> -->

    <figure class="video-figure">
      <button
        type="button"
        class="video-card"
        aria-label="Play interview"
        bind:this={cardEl}
        onclick={open}
        onpointerenter={onCardEnter}
        onpointermove={onCardMove}
        onpointerleave={onCardLeave}
      >
        <img
          class="video-thumb"
          src="/src/files/featured-thumbnail.jpg"
          alt="Interview thumbnail"
          loading="lazy"
        />
        <span class="video-scrim" aria-hidden="true"></span>

        <span class="thumb-overline" aria-hidden="true" data-speed-div="0.5" data-stream-mode="letter">
          <span class="thumb-overline-line">Outstanding</span>
          <span class="thumb-overline-line">Masters Student</span>
          <span class="thumb-overline-line">2026</span>
        </span>

        <span class="video-watch" aria-hidden="true" bind:this={watchEl}>
          <span class="video-watch-icon"></span>
          Watch interview
        </span>
        <span class="video-play" aria-hidden="true"></span>
      </button>

      <figcaption class="video-caption">
        <span class="video-caption-meta">
          <span>Interview</span>
          <span>4 min</span>
        </span>
      </figcaption>
    </figure>
  </Streamer>
</div>

{#if playing}
  <div class="video-overlay">
    <div class="video-dim" role="presentation" onclick={close}></div>

    <div class="video-modal-stage" style={playerWidth ? `width: ${playerWidth}px` : ''}>
      <button type="button" class="video-modal-close" aria-label="Close video" onclick={close}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div class="video-modal-inner" role="dialog" aria-modal="true" aria-label="Interview video player" tabindex="-1">
        <iframe
          bind:this={iframeEl}
          class="video-embed"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&enablejsapi=1`}
          title="&quot;Outstanding Masters Student 2026&quot; Interview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
{/if}
