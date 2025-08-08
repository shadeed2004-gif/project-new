const imageUpload = document.getElementById("imageUpload");
const palmImage = document.getElementById("palmImage");
const scannerContainer = document.getElementById("scannerContainer");
const statusText = document.getElementById("statusText");
const resultBox = document.getElementById("result");

imageUpload.addEventListener("change", function() {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            palmImage.src = e.target.result;
            scannerContainer.classList.remove("hidden");
            resultBox.classList.add("hidden");
            startScanning();
        };
        reader.readAsDataURL(file);
    }
});

function randomDate(startYear, endYear) {
    const start = new Date(startYear, 0, 1);
    const end = new Date(endYear, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toDateString();
}

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
    { text: "You will get stuck in traffic for 3 hours on", type: "bad_event" },
    { text: "You will finally pay off all debts on", type: "good_finance" },
    { text: "You will meet your soulmate on", type: "marriage" },
    { text: "You will adopt a mysterious pet on", type: "fun" },
    { text: "You will lose your phone on", type: "bad_event" },
    { text: "You will break a world record on", type: "good_event" },
    { text: "You will binge-watch your favorite show on", type: "fun" },
    { text: "You will get a tattoo you regret on", type: "bad_event" },
    { text: "You will cry laughing on", type: "fun" },
    { text: "You will accidentally become famous on", type: "good_event" },
    { text: "You will forget your keys on", type: "bad_event" },
    { text: "You will get lost on a trip on", type: "bad_event" },
    { text: "You will have a wardrobe malfunction on", type: "bad_event" },
    { text: "You will discover a new hobby on", type: "good_event" },
    { text: "You will get stuck in an elevator on", type: "bad_event" },
    { text: "You will win a free pizza on", type: "fun" },
    { text: "You will get caught singing loudly on", type: "bad_event" },
    { text: "You will spill coffee on your boss on", type: "bad_event" },
    { text: "You will invent something useless on", type: "fun" },
    { text: "You will trip in public on", type: "bad_event" },
    { text: "You will get a speeding ticket on", type: "bad_event" },
    { text: "You will have a surprise party on", type: "luck" },
    { text: "You will find money on the street on", type: "luck" },
    { text: "You will get locked out of your house on", type: "bad_event" }
];

function getDateRange(type) {
    switch(type) {
        case "marriage":
            return [2027, 2040];        // Marriage in 2-17 years
        case "job":
            return [2025, 2032];        // Job in next few years
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
            return [2080, 2110];        // Death far in the future
        default:
            return [2025, 2040];
    }
}

function startScanning() {
    const scanStages = [
        "Scanning palm lines...",
        "Detecting your poor life choices...",
        "Judging your mistakes...",
        "Laughing at your fate...",
        "Almost done destroying your hopes..."
    ];

    let stageIndex = 0;
    const stageInterval = setInterval(() => {
        statusText.textContent = scanStages[stageIndex];
        stageIndex++;
        if (stageIndex >= scanStages.length) {
            clearInterval(stageInterval);
        }
    }, 1200);

    setTimeout(() => {
        // Shuffle and pick 5 unique predictions
        const shuffled = allPredictions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

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
