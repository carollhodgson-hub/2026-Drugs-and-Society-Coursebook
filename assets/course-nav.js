(() => {
  const chapters = [
    [1, "What Is a Drug?", "index.html"],
    [2, "Drugs Across History", "history.html"],
    [3, "Drug Laws and Social Control", "drug-laws.html"],
    [4, "Pharmacological Taxonomy", "taxonomy-atlas.html"],
    [5, "Drugs, Brain, and Body", "brain-body.html"],
    [6, "Drug-Using Subcultures", "subcultures.html"],
    [7, "Why People Use Drugs", "theories.html"],
    [8, "Negative Health Consequences", "negative-health.html"],
    [9, "Drug-Using Lifestyles", "drug-lifestyles.html"],
    [10, "Institutional Correlates", "medical-benefits.html"],
    [11, "Drugs and the Economy", "drugs-economy.html"],
    [12, "Drugs and Crime", "drugs-crime.html"],
    [13, "Policy and Harm Reduction", "harm-reduction.html"],
    [14, "Treatment and Recovery", "treatment-recovery.html"],
    [15, "Education and Testing", "drug-education-testing.html"],
    [16, "Future Drug Policy", "future-policy.html"],
    [
      "PROJECT",
      "Moral Entrepreneur to Drug Specialist",
      "moral-entrepreneur-project.html",
    ],
    ["APA", "Using APA Style", "appendix-apa.html"],
    ["CAREER", "Career Connections", "career-connections.html"],
    ["ACCESS", "Accessibility & Privacy", "accessibility-privacy.html"],
  ];
  const script = document.currentScript;
  const assetBase = new URL("./", script.src);
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("course-nav.css", assetBase);
  document.head.append(css);
  const inTopics = location.pathname.includes("/topics/");
  const current = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  const hrefFor = (n, file) =>
    n === 1
      ? inTopics
        ? "../index.html"
        : "index.html"
      : inTopics
        ? file
        : "topics/" + file;
  const landing = inTopics ? "./" : "topics/";
  const nav = document.createElement("aside");
  nav.className = "course-toc";
  nav.id = "courseToc";
  nav.setAttribute("aria-label", "Coursebook chapters");
  nav.dataset.open = "false";
  let list = "";
  chapters.forEach(([n, title, file]) => {
    if (n === 1 || n === 9)
      list += `<div class="course-toc__unit">Unit ${n === 1 ? "One" : "Two"} · Sections ${n === 1 ? "1–8" : "9–16"}</div><ol>`;
    if (n === "PROJECT")
      list += '<div class="course-toc__unit">Appendices</div><ol>';
    const active =
      (n === 1 && !inTopics && current === "index.html") ||
      (inTopics && current === file);
    const label = typeof n === "number" ? `<strong>${n}.</strong> ` : "";
    list += `<li><a href="${hrefFor(n, file)}"${active ? ' aria-current="page"' : ""}>${label}${title}</a></li>`;
    if (n === 8 || n === 16 || n === "ACCESS") list += "</ol>";
  });
  nav.innerHTML = `<button class="course-toc__close" type="button">Close chapters</button><span class="course-toc__title">Beyond the Substance</span><a class="course-toc__home" href="${landing}">Book landing page</a>${list}`;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "course-toc-toggle";
  button.setAttribute("aria-controls", "courseToc");
  button.setAttribute("aria-expanded", "false");
  button.textContent = "Chapters";
  const close = () => {
    nav.dataset.open = "false";
    button.setAttribute("aria-expanded", "false");
    document.body.classList.remove("toc-open");
  };
  button.addEventListener("click", () => {
    const open = nav.dataset.open !== "true";
    nav.dataset.open = String(open);
    button.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("toc-open", open);
  });
  nav.querySelector(".course-toc__close").addEventListener("click", close);
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a") && innerWidth < 1180) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  document.body.prepend(nav);
  document.body.append(button);
  document.body.classList.add("has-course-toc");

  const projectPrompts = {
    "index.html": [
      "Preserve your starting point",
      "Choose one drug. Record what you currently believe its main public danger is, where that belief came from, and the policy you initially favor. Label these as initial beliefs—not verified facts—and save the statement unchanged.",
    ],
    "history.html": [
      "Build a drug history timeline",
      "Identify early uses, marketing or medical roles, changes in public meaning, and two turning points that altered how society responded to your drug.",
    ],
    "drug-laws.html": [
      "Compare law and public perception",
      "Trace important former and current laws. Note what evidence, group interests, fears, or social conditions shaped them and identify one intended and one unintended consequence.",
    ],
    "taxonomy-atlas.html": [
      "Create an identity card",
      "Record the pharmacological class, source plant or chemicals, pharmaceutical and brand names when applicable, slang terms, common routes, and important dose or interaction cautions.",
    ],
    "brain-body.html": [
      "Build a brain-and-body evidence table",
      "Separate short-term effects, long-term effects, tolerance, dependence, and major individual or contextual differences. Cite evidence for each important claim.",
    ],
    "subcultures.html": [
      "Analyze a subculture or setting",
      "Identify a group or setting associated with the drug. Explain its norms, language, socialization, access, identity, and any protective practices without stereotyping every member.",
    ],
    "theories.html": [
      "Apply two theories",
      "Use two theories to explain initiation, escalation, maintenance, reduction, or recovery. Compare what each explains well and what each leaves unanswered.",
    ],
    "negative-health.html": [
      "Create a harm profile",
      "Distinguish acute, chronic, interaction, overdose, and social risks. Show which harms arise from the substance and which are intensified by dose, route, supply, setting, or policy.",
    ],
    "drug-lifestyles.html": [
      "Examine everyday life and legal context",
      "Explain how routines, stigma, price, supply, housing, healthcare access, and legal status can magnify or reduce harm beyond the pharmacological effect alone.",
    ],
    "medical-benefits.html": [
      "Map institutional influences",
      "Choose the most relevant institutions—family, healthcare, education, work, military, law enforcement, or sports—and show how their rules and roles shape use and response.",
    ],
    "drugs-economy.html": [
      "Build a social cost-and-benefit map",
      "Consider healthcare, treatment, enforcement, incarceration, employment, productivity, premature death, family effects, tax revenue, and legal or illegal markets.",
    ],
    "drugs-crime.html": [
      "Classify the crime connection",
      "Test drug-to-crime, crime-to-drug, common-cause, law-created, and Goldstein pathway explanations. Use the models that fit your evidence rather than assuming one causal arrow.",
    ],
    "harm-reduction.html": [
      "Identify the current policy model",
      "Explain whether the drug is addressed through prohibition, decriminalization, legalization, medical regulation, harm reduction, or a combination—and which institutions control access.",
    ],
    "treatment-recovery.html": [
      "Design an evidence-based treatment plan",
      "Compare treatments appropriate to this drug, barriers to care, whole-person needs, continuing support, and one carefully justified improvement.",
    ],
    "drug-education-testing.html": [
      "Design an education plan",
      "Propose developmentally appropriate, accurate education for the populations most likely to encounter the drug. Address families, schools, peers, privacy, and testing when relevant.",
    ],
    "future-policy.html": [
      "Make and evaluate a policy proposal",
      "Recommend a long-term policy, name its tradeoffs and possible latent dysfunctions, specify how outcomes would be measured, and compare it with your Section 1 position.",
    ],
  };
  const project =
    inTopics && current === "index.html" ? null : projectPrompts[current];
  if (project) {
    const box = document.createElement("aside");
    box.className = "project-builder";
    box.setAttribute("aria-labelledby", "projectBuilderTitle");
    box.innerHTML = `<span class="project-builder__tag">Build your Drug Specialist Project</span><h2 id="projectBuilderTitle">${project[0]}</h2><p>${project[1]}</p><a href="${inTopics ? "moral-entrepreneur-project.html" : "topics/moral-entrepreneur-project.html"}">Open the complete project guide</a>`;
    const target = document.querySelector(
      ".cite-this,#sources,.sources,.next,main footer",
    );
    const main = document.querySelector("main");
    if (target) target.before(box);
    else if (main) main.append(box);
  }

  const careers = {
    "index.html": [
      "Social construction and professional judgment",
      "Human-services specialists, prevention educators, community-health workers, and policy analysts distinguish evidence from labels when assessing needs and explaining risk.",
    ],
    "history.html": [
      "History, culture, and public communication",
      "Health educators, advocates, researchers, and public historians use historical context to identify recurring drug scares, unequal treatment, and changing medical practice.",
    ],
    "drug-laws.html": [
      "Law, social control, and advocacy",
      "Court, reentry, public-administration, and legal-service professionals evaluate intended outcomes, unequal enforcement, and unintended consequences.",
    ],
    "taxonomy-atlas.html": [
      "Classification and health literacy",
      "Treatment intake staff, healthcare workers, pharmacists, poison-control specialists, and first responders need accurate names, drug families, routes, interactions, and emerging-product knowledge.",
    ],
    "brain-body.html": [
      "Biopsychosocial assessment",
      "Behavioral-health, rehabilitation, nursing, and case-management professionals connect physiology with dose, route, setting, tolerance, and individual differences without stereotyping.",
    ],
    "subcultures.html": [
      "Cultural competence and outreach",
      "Youth workers, outreach specialists, qualitative researchers, and prevention professionals learn how groups transmit language, norms, identity, access, and techniques.",
    ],
    "theories.html": [
      "Case formulation and program design",
      "Counseling-support workers, researchers, and program planners use multiple theories to understand initiation, continuation, change, and recovery without relying on one cause.",
    ],
    "negative-health.html": [
      "Health communication and referral",
      "Treatment staff, EMS, nursing, maternal-child health, and harm-reduction workers recognize acute, chronic, prenatal, interaction, and overdose risks.",
    ],
    "drug-lifestyles.html": [
      "Trauma-informed systems thinking",
      "Outreach, housing, infectious-disease, and recovery workers distinguish drug effects from harms produced by unsafe supply, exclusion, and illegal-market routines.",
    ],
    "medical-benefits.html": [
      "Institutional and occupational assessment",
      "Family services, employee assistance, military and veteran programs, healthcare, policing, and sports organizations examine how institutional roles shape substance use and response.",
    ],
    "drugs-economy.html": [
      "Program evaluation and resource decisions",
      "Nonprofit managers, administrators, researchers, and workforce specialists compare health, enforcement, employment, family, and lost-human-capital costs.",
    ],
    "drugs-crime.html": [
      "Incident-level analysis and victim services",
      "Diversion, courts, reentry, victim services, and criminology professionals separate correlation, causal pathways, market violence, and law-created offenses.",
    ],
    "harm-reduction.html": [
      "Policy comparison and implementation",
      "Government, advocacy, public-health, and regulatory professionals compare prohibition, decriminalization, legalization, regulation, and harm reduction.",
    ],
    "treatment-recovery.html": [
      "Recovery-oriented practice",
      "Substance-use programs, case managers, peer-support specialists, residential services, and recovery courts match evidence-based services to whole-person needs.",
    ],
    "drug-education-testing.html": [
      "Prevention, privacy, and assessment",
      "School, prevention, workplace, laboratory, athletics, and student-services professionals design age-appropriate education and evaluate testing accuracy, privacy, and due process.",
    ],
    "future-policy.html": [
      "Cross-sector policy innovation",
      "Researchers, educators, clinicians, regulators, social entrepreneurs, and community planners coordinate knowledge, care, safer markets, evaluation, and targeted protection.",
    ],
  };
  const career = inTopics && current === "index.html" ? null : careers[current];
  if (career) {
    const box = document.createElement("aside");
    box.className = "career-connection";
    box.setAttribute("aria-labelledby", "careerConnectionTitle");
    box.innerHTML = `<span class="career-connection__tag">Career connection</span><h2 id="careerConnectionTitle">${career[0]}</h2><p>${career[1]}</p><p class="career-connection__hst"><strong>Featured pathway:</strong> SOC-245 is required for Human Services Technology: Substance Abuse and Recovery Studies.</p><a href="${inTopics ? "career-connections.html" : "topics/career-connections.html"}">Explore the complete career charts</a>`;
    const target = document.querySelector(
      ".cite-this,#sources,.sources,.next,main footer",
    );
    const main = document.querySelector("main");
    if (target) target.before(box);
    else if (main) main.append(box);
  }
})();
