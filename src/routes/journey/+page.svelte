<script>
  import Timeline from "$lib/Timeline.svelte";
  import JourneyTopNav from "$lib/JourneyTopNav.svelte";

  // Journey entries, newest first. Copy a block to add an event.

  // ask jade myers when my stuff will be on the CSE page (the student story)
  // check in on the billboard photoshoot -
  //check in on the video shoot for uta commercial - makesomethignbeauifulfw

  // UTA mark swaps with the theme: a dark logo on the light bg, a white logo
  // on the dark bg.
  const utaLogo = {
    light: "/logos/utalightmode.png",
    dark: "/logos/utadarkmode.png",
  };

  const journeyData = [
    {
      title: "Incoming SDE II",
      location: "San Jose, CA",
      dateText: "Aug '26",
      logo: "/logos/adobe.png",
      description:
        "Two months away from joining Adobe!\n" +
        "Agentic AI @ <a class='journey-link' href='https://business.adobe.com/products/experience-platform/adobe-experience-platform.html' target='_blank' rel='noopener noreferrer'>Adobe Experience Platform</a>.",
    },
    {
      title: "M.S. in Computer Science (Thesis)",
      dateText: "Aug '26",
      logo: utaLogo,
      description:
        "Outstanding Masters Student of the Year - 2026.\n\n" +
        "Won the Lonestar Scholarship, a prestigious award given to top-performing graduate students. The scholarship granted me in-state tuition eligibility, resulting in over $20,000 in tuition savings.\n\n" +
        "On track to earn my fully-funded M.S. in Computer Science in just one year, with a Thesis on Machine Learning Research &amp; Applications in Bioinformatics. Defending July 29.",
    },
    {
      title: "Graduate ML Research Assistant",
      dateText: "Aug '25 - Jul '26",
      logo: "/logos/idir.png",
      description:
        "Developed software for an NSF-funded project focused on reducing hurricane-related residential damage. \n\n" +
        "Architected and developed a custom PyTorch-based Graph Neural Network for gene ranking in GeneSieve, successfully placing the true gene within the top 40% of candidates in ~92% of test cases. \n\n" +
        "Published GeneSieve research paper in <a class='journey-link' href='https://journals.plos.org/ploscompbiol/' target='_blank' rel='noopener noreferrer'>PLoS Computational Biology</a>. \n\n" +
        "Placed #3 in the IDIR Chess Tournament that I organized!",
    },
    {
      title: "Software Engineering Intern",
      location: "San Jose, CA",
      dateText: "May '25-Aug '25",
      logo: "/logos/adobe.png",
      description:
        "Built AI-powered monitoring systems that proactively detected customer journey failures across Adobe Experience Platform (AEP).\n\n" +
        "Developed &amp; deployed Knowledge Graph querying APIs into production. Worked with Software Engineering and ML teams to create the data flow pipeline integrating these APIs into the Proactive Monitoring Agent.",
    },
    {
      title: "Software Engineering Intern",
      location: "Austin, TX",
      dateText: "Jan '24 - May '24",
      logo: "/logos/amd.png",
      description:
      "Enhanced AMD EPYC™ server CPU internal automation tools using Apache Kafka &amp FastAPI. This drove internal tool adoption by 140 users across 20 teams. Saved time, cut costs.\n\n" +
      "Made register control scripts 27× faster (54s → 2s), saving thousands of billable engineering hours."
    },
    {
      title: "B.S. in Computer Science",
      dateText: "2024",
      logo: utaLogo,
      description:
        "Won the Maverick Academic Scholarship, providing $88,000 in tuition support across four years.\n\n" +
        "Magna Cum Laude.\n" +
        "Freshman Distinction Roll.\n" +
        "Dean's List: <a class='journey-link' href='https://www.uta.edu/academics/schools-colleges/engineering/students/deans-list/2022-spring-deans-list' target='_blank' rel='noopener noreferrer'>Spring'22</a>, <a class='journey-link' href='https://www.uta.edu/academics/schools-colleges/engineering/students/deans-list/2023-spring-deans-list' target='_blank' rel='noopener noreferrer'>Spring'23</a>, <a class='journey-link' href='https://www.uta.edu/academics/schools-colleges/engineering/students/deans-list/2024-spring-deans-list' target='_blank' rel='noopener noreferrer'>Spring'24</a>, <a class='journey-link' href='https://www.uta.edu/academics/schools-colleges/engineering/students/deans-list/2024-fall-deans-list' target='_blank' rel='noopener noreferrer'>Fall'24</a>."
    },
    {
      title: "Undergraduate Research Assistant",
      dateText: "2023-2024",
      logo: "/logos/idir.png",
      description:
        "Helped build the backend infrastructure and data pipelines powering GeneSieve. Applied machine learning, feature engineering, and statistical analysis to improve biological search systems and accelerate scientific discovery.",
    },
    {
      title: "Tutor for Students with Special Needs",
      dateText: "2023",
      logo: utaLogo,
      description:
        "Tutored students with mental disabilities across mathematics and finance courses. Very fulfilling role, and not an easy job.",
    },
    {
      title: "Undergraduate Research Assistant",
      dateText: "2022-2023",
      logo: utaLogo,
      description:
        "Met <a class='journey-link' href='https://www.uta.edu/academics/faculty/profile?user=shouyiw' target='_blank' rel='noopener noreferrer'>Dr. Wang</a> through a connection from the Dean's Office, won a competitive research award with his support and found myself in my first research opportunity.\n\n"+
        "Bioinformatics &amp machine learning research on CRISPR-CAS proteins. Developed a classifier and generative model achieving over 96% prediction accuracy.\n\n" +
        "Published a <a class='journey-link' href='https://scholar.google.com/citations?view_op=view_citation&hl=en&user=b5yGCz8AAAAJ&citation_for_view=b5yGCz8AAAAJ:d1gkVwhDpl0C' target='_blank' rel='noopener noreferrer'>research paper</a> on the topic in a peer-reviewed journal."
    },
    {
      title: "Math Tutor",
      dateText: "2022-2023",
      logo: utaLogo,
      description:
        "Enjoyed tutoring college freshmen in Calculus I &amp; II, Linear Algebra, Statistics.",
    },
    {
      title: "Dean's Office Student Assistant",
      dateText: "2021-2022",
      logo: utaLogo,
      description:
        "Supported event planning and handled hundreds of calls within the Dean of Engineering's Office. \n\n" +
        "Mostly just replaced coffee and did some admin stuff tbh. Met a guy who knew a guy, and thats how I got into my first research opportunity!",
    },
  ];

  // Map into the shape Timeline.svelte expects: each item shows the role title,
  // the year below it, then the logo, with the description as the content.
  const timelineData = journeyData.map((d) => ({
    title: d.title,
    year: d.dateText,
    location: d.location,
    logo: d.logo,
    content: d.description,
  }));
</script>

<svelte:head>
  <title>Journey — Pranav Pujar</title>
</svelte:head>

<JourneyTopNav />

<Timeline {timelineData} />

<style>
  /* The global footer uses a negative margin-top to overlap the home page's
     globe. On the journey page we want it to sit below the full timeline
     instead, so cancel that overlap. Scoped to this page: the rule is only in
     the DOM while /journey is mounted. */
  :global(#scroll-container .footer) {
    margin-top: 0;
  }
</style>
