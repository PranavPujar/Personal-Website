<script>
  import { onMount } from 'svelte';

  let video;

  onMount(() => {
    function resume() {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    }

    function onVisibility() {
      if (document.visibilityState === 'visible') resume();
    }

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', resume);
    document.addEventListener('touchstart', resume, { passive: true });

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', resume);
      document.removeEventListener('touchstart', resume);
    };
  });
</script>

<div class="profile-photo-wrap">
  <div class="profile-photo-circle">
    <video
      bind:this={video}
      class="slideshow-video"
      src="/src/files/slideshow.mp4"
      autoplay
      loop
      muted
      playsinline
    ></video>
  </div>
</div>
