<script>
  import Globe from "$lib/Globe.svelte";
  import ImageSlideshow from "$lib/ImageSlideshow.svelte";
  import Streamer from "$lib/Streamer.svelte";
  import HoverLink from "$lib/HoverLink.svelte";
  import { browser } from '$app/environment';

  const speedDiv = browser && window.innerWidth <= 1280 ? 1.9 / 1.3 : 1.9;
</script>

<svelte:head>
  <title>Pranav Pujar</title>
</svelte:head>

<div class="view-content">
  <Streamer {speedDiv}>
    <ImageSlideshow />
    <div class="bio">
      <p>
        I'm currently pursuing my Master's in Computer Science at <HoverLink
          href="https://www.uta.edu"
          variant="uta"
          >The University of Texas at Arlington</HoverLink
        >, on track to complete my B.S. and M.S. in five years by July 2026.
      </p>
      <p>
        This summer, I'll be joining <HoverLink
          href="https://business.adobe.com/products/experience-platform/adobe-experience-platform.html"
          variant="adobe">Adobe</HoverLink
        > in San Jose, CA as a Full-Time Software Engineer, working on Agentic AI
        within the Adobe Experience Platform. Along the way, I interned at companies
        across Dubai, Austin, and San Jose, including AMD and Adobe.
      </p>
      <p>
        During my time in college, I co-authored two research papers published
        in top venues and earned over $120,000 in scholarships, including one
        that covered 80% of my bachelor's tuition. I also worked as a Machine
        Learning Research Assistant at the <HoverLink
          href="https://idir.uta.edu/">IDIR Lab @ UTA</HoverLink
        >, where I contributed to a USDA-funded project
        <HoverLink
          href="https://idir.uta.edu/genesieve">GeneSieve</HoverLink
        >. During this time, I was mentored by Dr. Chengkai Li, Director of the
        lab and Associate Chair of the CSE Department at UTA.
      </p>
      <!-- <p>I am originally from India 🇮🇳, and grew up in Dubai, UAE 🇦🇪.</p> -->
      <p>
        Growing up between India 🇮🇳, Dubai 🇦🇪, and Texas 🇺🇸 gave me a blend of
        Indian roots, global perspective, and American ambition.
      </p>
      <p>
        Fun fact: My <HoverLink
          href="https://en.wikipedia.org/wiki/Mahadeva_Temple%2C_Itagi"
          >ancestral temple</HoverLink
        >, built in 1112 CE, is a National Monument!
      </p>
    </div>
  </Streamer>

  <Globe />
</div>
