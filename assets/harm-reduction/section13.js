(() => {
  const tiers = {
    source: {
      icon: "🌾",
      kicker: "Level 1 · International and national",
      title: "Source reduction",
      who: "national governments, foreign governments, development agencies, and law enforcement.",
      action:
        "crop eradication, precursor controls, alternative-development programs, and efforts to reduce production.",
      trade:
        "production may fall in one location yet move elsewhere—the “balloon effect.” Alternative livelihoods work only when farmers have durable ways to earn income.",
    },
    border: {
      icon: "🚢",
      kicker: "Level 2 · Borders and ports",
      title: "Interdiction",
      who: "the Coast Guard, Customs and Border Protection, the DEA, and partner agencies.",
      action:
        "detect and seize drugs before or as they enter the country by sea, air, land, or mail.",
      trade:
        "large seizures can coexist with substantial supply. Routes, methods, prices, and organizations adapt.",
    },
    network: {
      icon: "🕸️",
      kicker: "Level 3 · Major domestic networks",
      title: "Disruption of distribution networks",
      who: "federal investigators, prosecutors, financial investigators, and partner agencies.",
      action:
        "target high-level trafficking organizations, money flows, communications, and logistics.",
      trade:
        "removing leaders may disrupt supply, but fragmentation can also generate replacement, competition, or violence.",
    },
    wholesale: {
      icon: "📦",
      kicker: "Level 4 · State and local",
      title: "Wholesaler enforcement",
      who: "state bureaus, local police and sheriffs, prosecutors, and task forces.",
      action:
        "target distributors who move larger quantities into regional and local markets.",
      trade:
        "enforcement can relocate supply and impose major court and incarceration costs; evidence is needed to distinguish scale and role.",
    },
    street: {
      icon: "🚓",
      kicker: "Level 5 · Neighborhood and street",
      title: "Street enforcement",
      who: "local police, sheriffs, undercover officers, informants, courts, and corrections.",
      action:
        "target retail sellers and possession through patrol, surveillance, stings, searches, and confidential informants.",
      trade:
        "this level most directly touches users and neighborhoods, producing arrest records, distrust, unequal exposure, and replacement by new sellers.",
    },
  };
  const detail = document.querySelector("#tier-detail");
  document.querySelectorAll("[data-tier]").forEach((btn) =>
    btn.addEventListener("click", () => {
      document
        .querySelectorAll("[data-tier]")
        .forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const t = tiers[btn.dataset.tier];
      detail.innerHTML = `<div class="tier-icon" aria-hidden="true">${t.icon}</div><p class="kicker">${t.kicker}</p><h3>${t.title}</h3><p><strong>Who:</strong> ${t.who}</p><p><strong>Action:</strong> ${t.action}</p><p><strong>Tradeoff:</strong> ${t.trade}</p>`;
    }),
  );
  const options = [
    ["prohibition", "Prohibition"],
    ["decrim", "Decriminalization"],
    ["limited", "Limited adult market"],
    ["medical", "Medical harm-reduction regulation"],
    ["laissez", "Laissez-faire legalization"],
  ];
  const base = {
    moderate: {
      prohibition: [38, 20, 22, 35, 24, 20],
      decrim: [50, 35, 42, 58, 48, 66],
      limited: [65, 74, 52, 68, 77, 73],
      medical: [86, 82, 92, 86, 72, 78],
      laissez: [48, 78, 38, 55, 68, 82],
    },
    low: {
      prohibition: [42, 22, 25, 40, 28, 18],
      decrim: [62, 42, 48, 68, 58, 70],
      limited: [82, 80, 62, 82, 84, 80],
      medical: [84, 78, 86, 84, 68, 76],
      laissez: [74, 82, 42, 78, 76, 88],
    },
    high: {
      prohibition: [34, 18, 18, 28, 20, 18],
      decrim: [48, 30, 44, 52, 42, 62],
      limited: [35, 68, 40, 47, 58, 67],
      medical: [90, 86, 94, 88, 76, 78],
      laissez: [20, 72, 25, 32, 50, 76],
    },
  };
  const bars = document.querySelector("#policy-bars"),
    profile = document.querySelector("#risk-profile"),
    sliders = [...document.querySelectorAll("[data-weight]")];
  function draw() {
    sliders.forEach(
      (s) => (document.querySelector("#w-" + s.dataset.weight).value = s.value),
    );
    const weights = sliders.map((s) => +s.value),
      total = weights.reduce((a, b) => a + b, 0) || 1;
    const scores = options.map(([id, name]) => ({
      name,
      score: Math.round(
        base[profile.value][id].reduce((sum, v, i) => sum + v * weights[i], 0) /
          total,
      ),
    }));
    const max = Math.max(...scores.map((s) => s.score));
    bars.innerHTML = scores
      .map(
        (s) =>
          `<div class="bar-row ${s.score === max ? "best" : ""}"><b>${s.name}${s.score === max ? " ★" : ""}</b><div class="bar-track"><div class="bar-fill" style="width:${s.score}%"></div></div><output>${s.score}</output></div>`,
      )
      .join("");
    const winner = scores.find((s) => s.score === max);
    document.querySelector("#model-reading").innerHTML =
      `With these assumptions, <strong>${winner.name}</strong> has the highest illustrative score. Harm reduction can tighten or loosen access by risk while preserving care and evaluation. Change a weight or risk profile to test the conclusion.`;
  }
  sliders.forEach((s) => s.addEventListener("input", draw));
  profile.addEventListener("change", draw);
  document.querySelector("#reset-model").addEventListener("click", () => {
    profile.value = "moderate";
    sliders.forEach((s, i) => (s.value = [5, 4, 5, 4, 3, 3][i]));
    draw();
  });
  draw();
  const systemButtons = [...document.querySelectorAll("[data-system]")];
  const systemMessages = [
    "No coordinated protections are active.",
    "One level reduces a specific form of harm, but people can still fall through gaps between institutions.",
    "Two levels create a stronger bridge, but prevention, immediate safety, or long-term stability is still missing.",
    "All three levels reinforce one another: fewer preventable harms, more survival and treatment connection, greater stability, and more people able to participate in families, work, and community life.",
  ];
  function updateSystem() {
    const active = systemButtons.filter(
      (button) => button.getAttribute("aria-pressed") === "true",
    );
    document.querySelectorAll("[data-node]").forEach((node) =>
      node.classList.toggle(
        "active",
        active.some((button) => button.dataset.system === node.dataset.node),
      ),
    );
    const count = active.length;
    document.querySelector("#benefit-fill").style.width = `${count * 33.34}%`;
    document.querySelector("#benefit-label").textContent =
      `${count} of 3 levels coordinated`;
    document.querySelector("#system-title").textContent =
      count === 3 ? "A coordinated social response" : "Building the plan";
    document.querySelector("#system-result").textContent =
      systemMessages[count];
  }
  systemButtons.forEach((button) =>
    button.addEventListener("click", () => {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("aria-pressed") === "true" ? "false" : "true",
      );
      updateSystem();
    }),
  );
  document.querySelector("#activate-all").addEventListener("click", () => {
    systemButtons.forEach((button) =>
      button.setAttribute("aria-pressed", "true"),
    );
    updateSystem();
  });
})();
