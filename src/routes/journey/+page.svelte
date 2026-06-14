<script>
  import Timeline from "$lib/Timeline.svelte";

  // Journey entries, newest first. Copy a block to add an event.

  const journeyData = [
    {
      title: "Adobe — Incoming SDE II",
      dateText: "2026",
      description:
        "Joining Adobe HQ in San Jose as a Software Development Engineer II. Building Agentic AI solutions within Adobe Experience Platform while continuing my journey as a UT Arlington M.S. Computer Science student.",
    },
    {
      title: "IDIR Lab — Graduate Researcher",
      dateText: "2025–Present",
      description:
        "Conducting machine learning research involving custom neural architectures and graph neural networks for a USDA-funded gene discovery initiative. Also developing predictive analytics systems focused on mitigating hurricane-related home damage.",
    },
    {
      title: "Adobe — Software Engineering Intern",
      dateText: "2025",
      description:
        "Built AI-powered monitoring systems that proactively detected customer journey failures across Adobe Experience Platform. Developed production APIs and data pipelines while learning how enterprise software operates at massive scale.",
    },
    {
      title: "AAAI Publication",
      dateText: "2025",
      description:
        "Contributed to research that resulted in a publication accepted at the AAAI Conference on Artificial Intelligence, marking a major milestone in my research journey.",
    },
    {
      title: "AMD — Software Engineering Intern",
      dateText: "2024",
      description:
        "Developed developer productivity and automation tooling used across engineering teams at AMD. Built real-time workflow tracking systems with Kafka, FastAPI, and Python while reducing execution times from minutes to seconds.",
    },
    {
      title: "UT Arlington — B.S. Computer Science",
      dateText: "2024",
      description:
        "Graduated Magna Cum Laude with a Bachelor of Science in Computer Science. Earned recognition including Freshman Distinction Roll and multiple Dean's List honors throughout my academic career.",
    },
    {
      title: "IDIR Lab — Undergraduate Research Assistant",
      dateText: "2023–2024",
      description:
        "Helped build the backend infrastructure and data pipelines powering GeneSieve. Applied machine learning, feature engineering, and statistical analysis to improve biological search systems and accelerate scientific discovery.",
    },
    {
      title: "Learning Assistant Center — Tutor",
      dateText: "2023",
      description:
        "Tutored students with mental disabilities across mathematics and finance courses. Developed a passion for mentoring while helping students strengthen academic skills and confidence.",
    },
    {
      title: "UTA College of Engineering — Research Assistant",
      dateText: "2022–2023",
      description:
        "Conducted bioinformatics and machine learning research on CRISPR-CAS proteins. Contributed to classifier and generative model development achieving over 96% prediction accuracy, leading to a research publication.",
    },
    {
      title: "Mathematics Tutor",
      dateText: "2022–2023",
      description:
        "Tutored students in Calculus I & II, Linear Algebra, Algebra, and related mathematics courses. Focused on building strong problem-solving skills and quantitative reasoning foundations.",
    },
    {
      title: "Dean's Office Student Assistant",
      dateText: "2021–2022",
      description:
        "Supported operations within the UT Arlington College of Engineering Dean's Office. Assisted with events, technology systems, inventory management, and administrative coordination while developing professional communication skills.",
    },
  ];

  // Map into the shape Timeline.svelte expects: the date is the chronology
  // heading next to each dot; the content holds the event name + details.
  const timelineData = journeyData.map((d) => ({
    title: d.dateText,
    content: `${d.title} — ${d.description}`,
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
