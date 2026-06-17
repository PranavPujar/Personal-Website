<script>
  import Timeline from "$lib/Timeline.svelte";

  // Journey entries, newest first. Copy a block to add an event.

  const journeyData = [
    {
      title: "Incoming SDE II",
      location: "San Jose, CA",
      dateText: "Aug'26",
      logo: "/logos/adobe.png",
      description:
        "Two months away from joining Adobe!\n\n" +
        "Will be working on Agentic AI initiatives within Adobe Experience Platform.",
    },
    {
      title: "Graduate ML Research Assistant",
      location: "Arlington, TX",
      dateText: "Aug'25 - Jul'26",
      description:
        "Conducting machine learning research involving custom graph neural network architectures for GeneSieve.\n" +
        "Software engineering for an NSF-funded project to mitigate home damage due to hurricanes.Developed a Graph Neural Network to rank genes by likelihood of influencing plant traits in GeneSieve. Designed the model architecture and data pipeline in PyTorch."
    },
    {
      title: "Software Engineering Intern",
      location: "San Jose, CA",
      dateText: "May'25-Aug'25",
      logo: "/logos/adobe.png",
      description:
        "Built AI-powered monitoring systems that proactively detected customer journey failures across Adobe Experience Platform. Developed production APIs and data pipelines while learning how enterprise software operates at massive scale.",
    },
    {
      title: "Software Engineering Intern",
      location: "Austin, TX",
      dateText: "Jan'24 - May'24",
      logo: "/logos/amd.png",
      description:
        "Developed developer productivity and automation tooling used across engineering teams at AMD. Built real-time workflow tracking systems with Kafka, FastAPI, and Python while reducing execution times from minutes to seconds.",
    },
    {
      title: "UT Arlington",
      location: "Arlington, TX",
      dateText: "2024",
      description:
        "Graduated Magna Cum Laude with a Bachelor of Science in Computer Science. Earned recognition including Freshman Distinction Roll and multiple Dean's List honors throughout my academic career.",
    },
    {
      title: "IDIR Lab — Undergraduate Research Assistant",
      location: "Arlington, TX",
      dateText: "2023-2024",
      description:
        "Helped build the backend infrastructure and data pipelines powering GeneSieve. Applied machine learning, feature engineering, and statistical analysis to improve biological search systems and accelerate scientific discovery.",
    },
    {
      title: "Learning Assistant Center — Tutor",
      location: "Arlington, TX",
      dateText: "2023",
      description:
        "Tutored students with mental disabilities across mathematics and finance courses. Developed a passion for mentoring while helping students strengthen academic skills and confidence.",
    },
    {
      title: "UTA College of Engineering — Research Assistant",
      location: "Arlington, TX",
      dateText: "2022-2023",
      description:
        "Conducted bioinformatics and machine learning research on CRISPR-CAS proteins. Contributed to classifier and generative model development achieving over 96% prediction accuracy, leading to a research publication.",
    },
    {
      title: "Mathematics Tutor",
      location: "Arlington, TX",
      dateText: "2022-2023",
      description:
        "Tutored students in Calculus I & II, Linear Algebra, Algebra, and related mathematics courses. Focused on building strong problem-solving skills and quantitative reasoning foundations.",
    },
    {
      title: "Dean's Office Student Assistant",
      location: "Arlington, TX",
      dateText: "2021-2022",
      description:
        "Supported operations within the UT Arlington College of Engineering Dean's Office. Assisted with events, technology systems, inventory management, and administrative coordination while developing professional communication skills.",
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
