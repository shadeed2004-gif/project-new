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

function randomDateFromToday(minYearsFromNow, maxYearsFromNow) {
    const now = new Date();
    const start = new Date(now.getFullYear() + minYearsFromNow, 0, 1);
    const end = new Date(now.getFullYear() + maxYearsFromNow, 11, 31);
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

function getDateOffsetRange(type) {
    switch(type) {
        case "marriage":
            return [2, 15];          // 2 to 15 years from now
        case "job":
            return [0, 7];           // up to 7 years from now
        case "job_loss":
            return [0, 10];
        case "bad_finance":
            return [1, 15];
        case "vacation":
            return [0, 4];
        case "alien":
            return [5, 25];
        case "luck":
            return [0, 10];
        case "fun":
            return [0, 3];
        case "bad_event":
            return [0, 10];
        case "good_event":
            return [0, 10];
        case "good_finance":
            return [1, 10];
        case "death":
            return [50, 100];        // death far away (50-100 years)
        default:
            return [0, 10];
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
            const [minOffset, maxOffset] = getDateOffsetRange(type);
            const dateStr = randomDateFromToday(minOffset, maxOffset);
            return `🔮 ${text} **${dateStr}**.`;
        });

        resultBox.innerHTML = formattedPredictions.map(p => `<p>${p}</p>`).join("");
        resultBox.classList.remove("hidden");
        statusText.textContent = "Scan complete.";
    }, scanStages.length * 1200 + 1000);
}
