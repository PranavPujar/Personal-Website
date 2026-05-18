<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { appReady, streamReset } from '$lib/stores/app.js';
  import { streamView } from '$lib/stream.js';

  let { children, speedDiv = 1 } = $props();
  let container;

  onMount(() => {
    let unsubReady;

    if (get(appReady)) {
      // Already ready (e.g. navigated back to this page)
      streamView(container, speedDiv);
    } else {
      // First load — wait for appReady to fire
      unsubReady = appReady.subscribe(ready => {
        if (ready && container) {
          streamView(container, speedDiv);
          unsubReady?.();
        }
      });
    }

    const unsubReset = streamReset.subscribe(n => {
      if (n > 0 && container) streamView(container, speedDiv);
    });

    return () => { unsubReady?.(); unsubReset(); };
  });
</script>

<div bind:this={container}>
  {@render children()}
</div>
