const allPredictions = [
  { text: "You will get married on", type: "marriage" },
  { text: "You will get your dream job on", type: "job" },
  { text: "You will die on", type: "death" },
  { text: "You will lose your job on", type: "job_loss" },
  { text: "You will go bankrupt on", type: "bad_finance" },
  { text: "You will travel to the Maldives on", type: "vacation" },
  { text: "You will be abducted by aliens on", type: "alien" },
  { text: "You will win the lottery on", type: "luck" },
  { text: "You will eat the best pizza of your life on", type: "fun" },
  { text: "Your worst enemy will find you on", type: "bad_event" },
  { text: "You will embarrass yourself in public on", type: "bad_event" },
  { text: "You will get a surprise inheritance on", type: "luck" },
  { text: "You will win a cooking contest on", type: "luck" },
  { text: "You will find a secret talent on", type: "good_event" },
  { text: "You will finally pay off all debts on", type: "good_finance" },
  { text: "You will meet your soulmate on", type: "marriage" },
  { text: "You will adopt a mysterious pet on", type: "fun" },
  { text: "You will get stuck in traffic for 3 hours on", type: "bad_event" },
  { text: "You will binge-watch your favorite show on", type: "fun" },
  { text: "You will get a tattoo you regret on", type: "bad_event" },
  // add more with logical types
];

function getDateRange(type) {
  switch(type) {
    case "marriage":
      return [2027, 2040]; // next 2 to 17 years
    case "job":
      return [2025, 2032]; // soon job related
    case "job_loss":
      return [2025, 2035];
    case "bad_finance":
      return [2026, 2040];
    case "vacation":
      return [2025, 2029];
    case "alien":
      return [2030, 2050];
    case "luck":
      return [2025, 2035];
    case "fun":
      return [2025, 2028];
    case "bad_event":
      return [2025, 2035];
    case "good_event":
      return [2025, 2035];
    case "good_finance":
      return [2027, 2035];
    case "death":
      return [2080, 2110]; // far future
    default:
      return [2025, 2040];
  }
}

function startScanning() {
  // ... scanStages and intervals same as before ...

  setTimeout(() => {
    // Shuffle and pick 5 unique predictions
    const shuffled = allPredictions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    // Format predictions with logical date ranges
    const formattedPredictions = selected.map(({text, type}) => {
      const [startYear, endYear] = getDateRange(type);
      const dateStr = randomDate(startYear, endYear);
      return `🔮 ${text} **${dateStr}**.`;
    });

    resultBox.innerHTML = formattedPredictions.map(p => `<p>${p}</p>`).join("");
    resultBox.classList.remove("hidden");
    statusText.textContent = "Scan complete.";
  }, scanStages.length * 1200 + 1000);
}
