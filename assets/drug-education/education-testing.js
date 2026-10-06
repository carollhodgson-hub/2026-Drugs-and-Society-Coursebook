document.querySelectorAll("[data-test-scenario] button").forEach((button) => {
  button.addEventListener("click", () => {
    const feedback = document.getElementById("scenario-feedback");
    const correct = button.dataset.answer === "right";
    feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    feedback.textContent = correct
      ? "Yes. A presumptive result is one piece of evidence. Confirm it, interpret the detection window and legitimate medications, and investigate the event itself."
      : "Not yet. A urine result can show prior exposure, but usually cannot establish impairment or causation at the time of the accident.";
  });
});

const bacCalculator = document.querySelector("[data-bac-calculator]");
if (bacCalculator) {
  const form = document.getElementById("bac-form");
  const rangeOut = document.getElementById("bac-range");
  const centerOut = document.getElementById("bac-center");
  const interpretation = document.getElementById("bac-interpretation");
  const foodNote = document.getElementById("bac-food-note");
  const marker = document.getElementById("bac-marker");

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function renderBAC(event) {
    if (event) event.preventDefault();
    const pounds = clamp(Number(document.getElementById("bac-weight").value) || 0, 80, 500);
    const distribution = Number(document.getElementById("bac-model").value);
    const drinks = clamp(Number(document.getElementById("bac-drinks").value) || 0, 0, 20);
    const hours = clamp(Number(document.getElementById("bac-hours").value) || 0, 0, 24);
    const food = document.getElementById("bac-food").value;
    const alcoholGrams = drinks * 14;
    const bodyGrams = pounds * 453.592;
    const preElimination = bodyGrams ? (alcoholGrams / (bodyGrams * distribution)) * 100 : 0;
    const low = Math.max(0, preElimination - 0.02 * hours);
    const high = Math.max(0, preElimination - 0.01 * hours);
    const center = Math.max(0, preElimination - 0.015 * hours);
    rangeOut.textContent = `${low.toFixed(3)}–${high.toFixed(3)}%`;
    centerOut.textContent = `Central classroom estimate: ${center.toFixed(3)}%`;
    marker.style.left = `${Math.min(center / 0.2, 1) * 100}%`;
    interpretation.textContent = center === 0
      ? "The formula reaches zero, but that does not prove alcohol is absent or that driving is safe."
      : center < 0.03
        ? "Even a lower estimate can involve measurable effects, especially for a particular person or task."
        : center < 0.08
          ? "Judgment, coordination, and reaction can be affected below 0.08%."
          : "This estimate is in a range associated with substantial impairment and serious safety risk.";
    const notes = {
      meal: "A substantial meal may slow absorption and delay or lower the peak, but the calculator does not guess a food multiplier.",
      some: "Some food may change absorption and peak timing; the amount and timing cannot be captured reliably here.",
      none: "With little or no food, alcohol may be absorbed more quickly and the peak may arrive sooner."
    };
    foodNote.textContent = notes[food];
  }
  form.addEventListener("submit", renderBAC);
  form.addEventListener("input", renderBAC);
  renderBAC();
}

const gateway = document.querySelector("[data-gateway-explorer]");
if (gateway) {
  const input = document.getElementById("gateway-age");
  const ageOut = document.getElementById("gateway-age-output");
  const band = document.getElementById("gateway-band");
  const focus = document.getElementById("gateway-focus");
  const bars = document.getElementById("gateway-bars");
  const lesson = document.getElementById("gateway-lesson");
  const topics = ["Beer / wine", "Cigarettes", "Hard liquor", "Marijuana", "Other illicit drugs", "Inhalants"];
  const windows = {
    early: { band: "Late childhood / transition", focus: "Medication safety, alcohol basics, nicotine, and trusted-adult help", values: [3,2,1,1,0,2], lesson: "Teach concrete safety, coping, media literacy, and how to seek help. Inhalant prevention belongs across ages because common household products can be misused." },
    middle: { band: "Early adolescence", focus: "Nicotine, alcohol strength, and changing peer routines", values: [4,4,3,2,1,2], lesson: "Address access, perceived norms, peer settings, mental health, and refusal or exit skills before exposure increases." },
    late: { band: "Middle adolescence", focus: "Alcohol, marijuana, mixing, and emerging illicit-market access", values: [4,4,4,4,2,2], lesson: "Add potency, consent, driving, counterfeit products, confidential help, and accurate distinctions among substances." },
    older: { band: "Late adolescence / young adulthood", focus: "Higher-risk patterns, polysubstance use, overdose response, and treatment", values: [4,4,4,5,4,2], lesson: "Combine prevention with harm reduction, treatment access, naloxone education, mixing risks, and routes back to school and work." }
  };
  const labels = ["Not emphasized", "Introduce", "Repeat yearly", "Growing relevance", "High relevance", "Priority topic"];
  function renderGateway() {
    const age = Number(input.value);
    ageOut.value = age;
    const data = age <= 11 ? windows.early : age <= 14 ? windows.middle : age <= 17 ? windows.late : windows.older;
    band.textContent = data.band;
    focus.textContent = data.focus;
    lesson.textContent = data.lesson;
    bars.innerHTML = topics.map((name, i) => `<div class="gateway-row"><b>${name}</b><span class="gateway-track"><span class="gateway-fill" style="width:${data.values[i] * 20}%"></span></span><span class="gateway-status">${labels[data.values[i]]}</span></div>`).join("");
  }
  input.addEventListener("input", renderGateway);
  renderGateway();
}
