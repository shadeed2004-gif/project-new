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
        const allPredictions = [
            "You will get married on",
            "You will get your dream job on",
            "You will die on",
            "You will lose your job on",
            "You will go bankrupt on",
            "You will travel to the Maldives on",
            "You will be abducted by aliens on",
            "You will win the lottery on",
            "You will eat the best pizza of your life on",
            "Your worst enemy will find you on",
            "You will embarrass yourself in public on",
            "You will get a surprise inheritance on",
            "You will win a cooking contest on",
            "You will find a secret talent on",
            "You will get stuck in traffic for 3 hours on",
            "You will finally pay off all debts on",
            "You will meet your soulmate on",
            "You will adopt a mysterious pet on",
            "You will lose your phone on",
            "You will break a world record on",
            "You will binge-watch your favorite show on",
            "You will get a tattoo you regret on",
            "You will cry laughing on",
            "You will accidentally become famous on",
            "You will forget your keys on",
            "You will get lost on a trip on",
            "You will have a wardrobe malfunction on",
            "You will discover a new hobby on",
            "You will get stuck in an elevator on",
            "You will win a free pizza on",
            "You will get caught singing loudly on",
            "You will spill coffee on your boss on",
            "You will invent something useless on",
            "You will trip in public on",
            "You will get a speeding ticket on",
            "You will have a surprise party on",
            "You will find money on the street on",
            "You will get locked out of your house on"
        ];

        // Shuffle and pick 5 unique predictions
        const shuffled = allPredictions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        // Create prediction lines with randomized dates and mix of good/bad vibes
        const formattedPredictions = selected.map(text => {
            let startYear, endYear;

            // Assign date ranges based on prediction tone
            if (text.includes("die") || text.includes("lose your job") || text.includes("bankrupt") || text.includes("embarrass") || text.includes("trip") || text.includes("spilling") || text.includes("locked out") || text.includes("malfunction") || text.includes("get caught") || text.includes("speeding ticket")) {
                // Bad stuff usually soon-ish or funny long term
                startYear = 2025;
                endYear = 2040;
            } else if (text.includes("married") || text.includes("dream job") || text.includes("win") || text.includes("meet") || text.includes("surprise") || text.includes("find") || text.includes("adopt") || text.includes("discover") || text.includes("binge-watch") || text.includes("party") || text.includes("money")) {
                // Good or fun stuff, next 10 years
                startYear = 2025;
                endYear = 2035;
            } else {
                // Neutral stuff
                startYear = 2025;
                endYear = 2040;
            }

            const dateStr = randomDate(startYear, endYear);
            return `🔮 ${text} **${dateStr}**.`;
        });

        resultBox.innerHTML = formattedPredictions.map(p => `<p>${p}</p>`).join("");
        resultBox.classList.remove("hidden");
        statusText.textContent = "Scan complete.";
    }, scanStages.length * 1200 + 1000);
}
