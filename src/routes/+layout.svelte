<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { beforeNavigate } from '$app/navigation';
  import Nav from '$lib/Nav.svelte';
  import Footer from '$lib/Footer.svelte';
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

  onMount(() => {
    const timer = setTimeout(async () => {
      appReady.set(true);

      if (window.matchMedia('(pointer: coarse)').matches) return;

      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      function raf(time) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis?.destroy();
    };
  });
</script>

<Nav ready={$appReady} />

<main id="scroll-container" class:ready={$appReady} data-route={$page.url.pathname}>
  {@render children()}
  <Footer />
</main>
