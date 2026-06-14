<script>
  import Streamer from '$lib/Streamer.svelte';
  import JourneyItem from '$lib/JourneyItem.svelte';

  // ── Journey timeline data ───────────────────────────────────────────────
  // Add a career / education event by copy-pasting one block below. List them
  // newest-first (or however you like) — the vertical line, dots, and dates are
  // drawn automatically. `cardLabel` and `imageSrc` are optional.
  const journeyData = [
    {
      title: 'Antigravity SDK',
      dateText: 'June 2026',
      cardLabel: 'Antigravity SDK',
      description:
        "Prototype custom agents leveraging Antigravity's harness with minimal code. Simple Python scripts to iterate on agentic applications, automate software engineering tasks, and run evaluations on top of the Antigravity agent harness."
    }
    // ── copy this block to add another item ──
    // {
    //   title: 'Next Event',
    //   dateText: 'May 2026',
    //   cardLabel: 'Next Event',
    //   description: 'What you did, in a sentence or two.',
    //   // imageSrc: '/src/files/your-image.jpg',  // optional: image instead of the glow label
    // },
  ];
</script>

<svelte:head>
  <title>Journey — Pranav Pujar</title>
</svelte:head>

<div class="view-content">
  <Streamer speedDiv={0.8}>
    <h2 class="section-title">Journey</h2>
    <p class="section-description">
      I've worked many roles over the past few years, across different countries and industries. Check them out below!
    </p>

    <div class="journey-timeline">
      {#each journeyData as item}
        <JourneyItem {...item} />
      {/each}
    </div>
  </Streamer>
</div>
