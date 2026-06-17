<script>
  // Spotlight card: a radial gradient follows the cursor and fades in on hover.
  // Same API as the shadcn/"magic" MagicCard, reimplemented with Svelte 5 runes
  // + CSS vars (no svelte-motion dependency).
  import { cn } from "$lib/utils";

  let {
    children,
    class: className = "",
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
  } = $props();

  // Start the spotlight far off-screen so it's hidden until the cursor enters.
  let mouseX = $state(-9999);
  let mouseY = $state(-9999);
  let hovered = $state(false);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    hovered = true;
  }

  function handleMouseLeave() {
    hovered = false;
    mouseX = -9999;
    mouseY = -9999;
  }

  let bg = $derived(
    `radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`
  );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  role="presentation"
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
  class={cn(
    "group relative flex size-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border text-black dark:text-white justify-center py-4",
    className
  )}
>
  <div class="relative z-10">
    {@render children?.()}
  </div>
  <div
    class="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
    style="background: {bg}; opacity: {hovered ? gradientOpacity : 0};"
  ></div>
</div>

<style>
  .size-full {
    width: 100%;
    height: 100%;
  }
</style>
