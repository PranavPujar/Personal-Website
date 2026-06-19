<script>
  // Inline bio link with the "underline grows into a background highlight" hover
  // effect. Renders a plain inline <a>, so long link phrases — e.g. "The
  // University of Texas at Arlington" — wrap across lines like normal text.
  // The effect + brand colours live in app.css (a.hover-link*), which uses
  // box-decoration-break: clone so the highlight follows each wrapped line.
  // stream.js still treats the <a> as a single word-reveal unit.
  let { href, variant = "default", children, onclick: onclickProp } = $props();

  const cls = $derived(
    variant === "default" ? "hover-link" : `hover-link hover-link-${variant}`
  );
</script>

<a class={cls} {href} target="_blank" rel="noopener noreferrer" onclick={onclickProp}>
  {@render children?.()}
</a>
