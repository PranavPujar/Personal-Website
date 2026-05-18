<script>
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import Nav from '$lib/Nav.svelte';
  import Footer from '$lib/Footer.svelte';
  import SmoothCursor from '$lib/SmoothCursor.svelte';
  import { appReady } from '$lib/stores/app.js';
  import { theme } from '$lib/stores/theme.js';
  import { cancelStream } from '$lib/stream.js';
  import '../app.css';

  let { children } = $props();
  let lenis;

  theme.init();

  beforeNavigate(() => {
    cancelStream();
    if (lenis) lenis.scrollTo(0, { immediate: true });
  });

  onMount(async () => {
    const { default: Lenis } = await import('lenis');

    const timer = setTimeout(() => {
      appReady.set(true);

      // ── SMOOTH SCROLL TUNING ─────────────────────────────────────────
      // Uncomment and adjust the block below to re-enable smooth scrolling.
      //
      // lerp          (0–1)   interpolation per frame — lower = slower/smoother, higher = snappier
      // wheelMultiplier       how far each wheel tick travels
      // touchMultiplier       same for touch/trackpad
      //
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.4,
      });
      
      function raf(time) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      // ─────────────────────────────────────────────────────────────────
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis?.destroy();
    };
  });
</script>

<SmoothCursor />
<Nav ready={$appReady} />

<main id="scroll-container" class:ready={$appReady}>
  {@render children()}
  <Footer />
</main>
