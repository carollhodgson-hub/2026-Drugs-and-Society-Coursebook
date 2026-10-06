(() => {
  const countryData = {
    iceland: {
      title: "Iceland · community prevention",
      stat: "Past-month drunkenness among surveyed 15–16-year-olds fell from 42% in 1998 to 5% in 2016.",
      policy: "Repeated local surveys informed coordinated action by families, schools, municipalities, recreation programs, and national policy.",
      lesson: "Prevention can change environments and relationships, not only individual knowledge.",
      caution: "The trend occurred alongside many social changes; it is not proof that one program caused every decline."
    },
    portugal: {
      title: "Portugal · decriminalization plus health services",
      stat: "Since 2001, possession of limited amounts for personal use has been handled administratively rather than as a criminal offense.",
      policy: "Portugal combined the legal change with treatment, harm reduction, and multidisciplinary responses; sale and trafficking remain crimes.",
      lesson: "Changing penalties and expanding services are separate policy choices that work together.",
      caution: "Outcomes differ by drug, age, year, and measure; decriminalization is not legalization."
    },
    canada: {
      title: "Canada · regulated adult cannabis",
      stat: "Canada legalized and regulated nonmedical cannabis for adults nationally in 2018 while retaining age, packaging, promotion, and impaired-driving rules.",
      policy: "The model creates legal production and retail channels whose prices, potency, access, public health, youth use, and illicit-market displacement can be measured.",
      lesson: "Legalization is the beginning of regulation and evaluation—not the end of policy.",
      caution: "A regulated market can still commercialize risk and does not eliminate every illegal supplier."
    },
    europe: {
      title: "European Union · targeted organized-crime response",
      stat: "Europol found drug trafficking in 50% of the 821 most threatening networks it studied; 86% used legal business structures.",
      policy: "The findings support financial investigations, ownership transparency, anti-corruption safeguards, victim protection, and enforcement focused on violent networks.",
      lesson: "A lawful market needs safeguards against infiltration, laundering, coercion, and exploitation.",
      caution: "These figures describe a selected group of the most threatening networks—not all sellers or all people who use drugs."
    }
  };

  const panel = document.querySelector("#country-panel");
  const buttons = [...document.querySelectorAll("[data-country]")];
  const renderCountry = (key) => {
    const item = countryData[key];
    if (!panel || !item) return;
    panel.innerHTML = `<h3>${item.title}</h3><p class="data">${item.stat}</p><p><strong>Policy:</strong> ${item.policy}</p><p><strong>Lesson:</strong> ${item.lesson}</p><p><strong>Caution:</strong> ${item.caution}</p>`;
    buttons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.country === key)));
  };
  buttons.forEach((button) => button.addEventListener("click", () => renderCountry(button.dataset.country)));
  renderCountry("iceland");

  const ids = ["edu", "health", "reg", "enforce"];
  const controls = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
  const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
  const updateLab = () => {
    if (ids.some((id) => !controls[id])) return;
    const v = Object.fromEntries(ids.map((id) => [id, Number(controls[id].value)]));
    ids.forEach((id) => { document.getElementById(`${id}-out`).value = v[id]; });
    const scores = {
      knowledge: clamp(v.edu * .75 + v.health * .15 + v.reg * .1),
      safety: clamp(v.health * .5 + v.reg * .4 + v.edu * .1),
      market: clamp(v.reg * .45 + v.enforce * .4 + v.health * .15),
      equity: clamp(v.health * .4 + v.edu * .3 + v.reg * .15 + v.enforce * .15)
    };
    Object.entries(scores).forEach(([key, value]) => { document.getElementById(`${key}-score`).textContent = `${value}/100`; });
    const balance = Math.max(...Object.values(v)) - Math.min(...Object.values(v));
    const reading = document.getElementById("lab-reading");
    if (balance > 55) reading.textContent = "This plan leans heavily on one institution. Consider what happens when education lacks services, regulation lacks enforcement, or enforcement lacks health and opportunity.";
    else if (Math.min(...Object.values(v)) >= 65) reading.textContent = "This is a coordinated public-health model: knowledge, care, accountable markets, and focused protection reinforce one another. Its success would still require independent evaluation and equitable access.";
    else reading.textContent = "This mixed model has useful capacity but also a weak link. Raise the lowest investment and watch which social outcomes change.";
  };
  ids.forEach((id) => controls[id]?.addEventListener("input", updateLab));
  updateLab();
})();
