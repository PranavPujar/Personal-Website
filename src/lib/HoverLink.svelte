<script>
  // Inline bio link with the "underline grows into a background highlight"
  // hover effect (src/lib/components/fancy/underline-to-background). Renders a
  // real <a> (as="a") so navigation + the stream.js word-reveal still work:
  // stream.js treats <a> as a single reveal unit.
  import { UnderlineToBackground } from "$lib/components/fancy/underline-to-background";
  import { theme } from "$lib/stores/theme.js";

  let { href, variant = "default", children } = $props();

  // Colour the word morphs to as the highlight fills in. Branded links (red/
  // blue fill) read best with white text; the default links use the page
  // background so the text reads against the var(--text)-coloured fill.
  const targetTextColor = $derived(
    variant === "default" ? ($theme === "light" ? "#ffffff" : "#040d21") : "#ffffff"
  );

  const cls = $derived(
    variant === "default" ? "hover-link" : `hover-link hover-link-${variant}`
  );
</script>

<!-- Re-key on theme so the component re-reads its base (fill) colour, which it
     samples from computed style at mount rather than reactively. -->
{#key $theme}
  <UnderlineToBackground
    as="a"
    class={cls}
    {href}
    {targetTextColor}
    target="_blank"
    rel="noopener noreferrer"
  >
    {@render children?.()}
  </UnderlineToBackground>
{/key}
