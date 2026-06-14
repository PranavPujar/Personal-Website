<script>
  // One entry on the Journey timeline. To add another event, just duplicate a
  // block in `journeyData` (src/routes/journey/+page.svelte) — no markup needed.
  // Styles live in the `── JOURNEY ──` section of src/app.css.
  let {
    title = '',
    description = '',
    dateText = '',     // month + year, e.g. 'June 2026' — anchors the item on the line
    cardLabel,         // text shown inside the glowing card (defaults to `title`)
    imageSrc           // optional: show an image in the card instead of the glow label
  } = $props();
</script>

<article class="journey-item">
  <!-- Left: text. Title + description stream in word-by-word (see stream.js). -->
  <div class="journey-content">
    <span class="journey-date-inline">{dateText}</span>
    <h3 class="journey-title">{title}</h3>
    <p class="journey-desc">{description}</p>
  </div>

  <!-- Middle: the glowing card (decorative — restates the title). -->
  <div class="journey-visual" aria-hidden="true">
    <div class="journey-card">
      {#if imageSrc}
        <img class="journey-card-img" src={imageSrc} alt="" />
      {:else}
        <span class="journey-card-aura"></span>
        <span class="journey-card-label">{cardLabel ?? title}</span>
      {/if}
    </div>
  </div>

  <!-- Right: chronology rail — a dot on the continuous line + the month/year. -->
  <div class="journey-rail">
    <span class="journey-date">{dateText}</span>
    <span class="journey-dot"></span>
  </div>
</article>
