<script>
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import AnimatedThemeToggler from '$lib/AnimatedThemeToggler.svelte';
  import { Dock, DockIcon } from '$lib/components/magic/dock';
  import { streamReset } from '$lib/stores/app.js';

  let { ready = false } = $props();
  let mobileOpen = $state(false);

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

<nav id="main-nav" class:visible={ready}>
  <a href="/" class="nav-name nav-link" style="text-decoration: none; color: inherit;" onclick={handleHome}>
    <span class="nav-name-text">Pranav Pujar</span>
    <span class="nav-subtitle">Software Engineer &amp; ML Researcher</span>
  </a>

  <div class="nav-right">
    <ul class="nav-links">
      <li><a href="/CV.pdf" target="_blank" rel="noopener noreferrer" class="nav-link">CV</a></li>
      <li><a href="/career" class="nav-link">Career</a></li>
      <li><a href="/featured" class="nav-link">Featured</a></li>
    </ul>

    <button
      class="menu-trigger"
      aria-label="Toggle menu"
      onclick={(e) => { stopProp(e); mobileOpen = !mobileOpen; }}
    >
      {mobileOpen ? 'Close' : 'More'}
    </button>

    <AnimatedThemeToggler />
  </div>

  <div class="mobile-dropdown" class:open={mobileOpen} onclick={stopProp} role="presentation">
    <Dock>
      <DockIcon>
        <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" class="dropdown-link nav-link" onclick={closeMenu}>CV</a>
      </DockIcon>
      <DockIcon>
        <a href="/career" class="dropdown-link nav-link">Career</a>
      </DockIcon>
      <DockIcon>
        <a href="/featured" class="dropdown-link nav-link">Featured</a>
      </DockIcon>
    </Dock>
  </div>
</nav>
