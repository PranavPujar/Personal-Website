<script>
  import { onMount } from 'svelte';
  import AnimatedThemeToggler from '$lib/AnimatedThemeToggler.svelte';

  // Persistent top bar for the journey page. It slides in once the main nav has
  // fully scrolled out of view, and retracts as soon as any of it scrolls back.
  let visible = $state(false);

  onMount(() => {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const io = new IntersectionObserver(
      ([entry]) => { visible = !entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(nav);
    return () => io.disconnect();
  });
</script>

<div class="journey-topnav" class:visible aria-hidden={!visible} inert={!visible}>
  <ul class="nav-links">
    <li><a href="/" class="nav-link">About</a></li>
    <li><a href="/featured" class="nav-link">Featured</a></li>
    <li><a href="/blog" class="nav-link">Blog</a></li>
  </ul>
  <div class="journey-topnav-toggle">
    <AnimatedThemeToggler />
  </div>
</div>
