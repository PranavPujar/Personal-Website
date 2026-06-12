<script>
  import Streamer from '$lib/Streamer.svelte';
</script>

<svelte:head>
  <title>Featured — Pranav Pujar</title>
</svelte:head>

<div class="view-content">
  <Streamer speedDiv={0.8}>
    <h2 class="section-title">Interviewed by the Computer Science Dept. @ UTA for Winning Outstanding Masters Student Award</h2>
  </Streamer>

  <a
    href="https://www.youtube.com/watch?v=Wk0nP-3bYaQ&t=2s"
    target="_blank"
    rel="noopener noreferrer"
    class="video-card featured-video"
    aria-label="Watch interview on YouTube"
  >
    <img
      class="video-thumb"
      src="/src/files/featured-thumbnail.png"
      alt="Interview thumbnail"
      loading="lazy"
    />
    <span class="video-play" aria-hidden="true"></span>
  </a>
</div>
