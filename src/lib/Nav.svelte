<script>
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import AnimatedThemeToggler from '$lib/AnimatedThemeToggler.svelte';
  import { Dock, DockIcon } from '$lib/components/magic/dock';
  import { streamReset } from '$lib/stores/app.js';

  let { ready = false } = $props();
  let mobileOpen = $state(false);

  // `intro` is present only during the initial load animation. Gating the load
  // keyframes on it lets the active item use a distinct keyframe without the
  // load animations ever restarting on later navigation (.nav-active toggles).
  // It is DERIVED from `ready` (not set in an effect) so the `intro` class lands
  // in the same render as `visible` — otherwise, for one tick, the active title
  // would show its persistent glow before the intro animation takes over,
  // causing a sudden flash instead of the graceful glow-in.
  let introDone = $state(false);
  const introPlaying = $derived(ready && !introDone);
  $effect(() => {
    if (ready && !introDone) {
      const id = setTimeout(() => { introDone = true; }, 3200);
      return () => clearTimeout(id);
    }
  });

  function stopProp(e) { e.stopPropagation(); }
  function closeMenu() { mobileOpen = false; }

  function handleHome(e) {
    if ($page.url.pathname === '/') {
      e.preventDefault();
      window.scrollTo(0, 0);
      streamReset.update(n => n + 1);
    }
  }

  beforeNavigate(() => { mobileOpen = false; });
</script>

<svelte:window onclick={closeMenu} />

<nav id="main-nav" class:visible={ready} class:intro={introPlaying}>
  <a href="/" class="nav-name nav-link" class:nav-active={$page.url.pathname === '/'} style="text-decoration: none; color: inherit;" onclick={handleHome}>
    <span class="nav-name-text">Pranav Pujar</span>
    <span class="nav-subtitle">Software Engineer &amp; ML Researcher</span>
  </a>

  <div class="nav-right">
    <ul class="nav-links">
      <li><a href="/journey" class="nav-link" class:nav-active={$page.url.pathname === '/journey'}>Journey</a></li>
      <li><a href="/featured" class="nav-link" class:nav-active={$page.url.pathname === '/featured'}>Featured</a></li>
      <li><a href="/blog" class="nav-link" class:nav-active={$page.url.pathname === '/blog'}>Blog</a></li>
    </ul>

    <AnimatedThemeToggler />

    <button
      class="menu-trigger"
      aria-label="Toggle menu"
      onclick={(e) => { stopProp(e); mobileOpen = !mobileOpen; }}
    >
      {mobileOpen ? 'Close' : 'More'}
    </button>
  </div>

  <div class="mobile-dropdown" class:open={mobileOpen} onclick={stopProp} role="presentation">
    <Dock>
      <DockIcon>
        <a href="/journey" class="dropdown-link nav-link" onclick={closeMenu}>Journey</a>
      </DockIcon>
      <DockIcon>
        <a href="/featured" class="dropdown-link nav-link" onclick={closeMenu}>Featured</a>
      </DockIcon>
      <DockIcon>
        <a href="/blog" class="dropdown-link nav-link" onclick={closeMenu}>Blog</a>
      </DockIcon>
    </Dock>
  </div>
</nav>
