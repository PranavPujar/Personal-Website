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
        "Developed developer productivity and automation tooling used across engineering teams at AMD. Built real-time workflow tracking systems with Kafka, FastAPI, and Python while reducing execution times from minutes to seconds.",
    },
    {
      title: "B.S. in Computer Science",
      dateText: "2024",
      logo: utaLogo,
      description:
        "Magna Cum Laude. Freshman Distinction Roll. Dean's List: Spring'22, Spring'23, Spring'24, Fall'24. won REU award from Dean of Eng given to 7 students. Maverick Academic Scholarship worth $8000/yr plus in state. ",
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
        "Tutored students with mental disabilities across mathematics and finance courses. Developed a passion for mentoring while helping students strengthen academic skills and confidence.",
    },
    {
      title: "Undergraduate Research Assistant",
      dateText: "2022-2023",
      logo: utaLogo,
      description:
        "Conducted bioinformatics and machine learning research on CRISPR-CAS proteins. Contributed to classifier and generative model development achieving over 96% prediction accuracy, leading to a research publication.\n\n" +
        "Published a research paper on the topic in a peer-reviewed journal.\n\n" +
        "Won the scholarship for this REU 2000$",
    },
    {
      title: "Math Tutor",
      dateText: "2022-2023",
      logo: utaLogo,
      description:
        "Tutored college freshmen in Calculus I &amp; II, Linear Algebra, Algebra.",
    },
    {
      title: "Dean's Office Student Assistant",
      dateText: "2021-2022",
      logo: utaLogo,
      description:
        "Supported event planning and handled calls within the Dean of Engineering's Office. \n\n" +
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
