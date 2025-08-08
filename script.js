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
            `💍 You will get married on **${randomDate(2025, 2035)}**.`,
            `💼 You will get your dream job on **${randomDate(2025, 2030)}**.`,
            `💀 You will die on **${randomDate(2070, 2100)}** (mark your calendar).`,
            `📉 You will lose your job on **${randomDate(2025, 2035)}**.`,
            `🏚 You will go bankrupt on **${randomDate(2026, 2040)}**.`,
            `🌴 You will travel to the Maldives on **${randomDate(2025, 2028)}**.`,
            `🛸 You will be abducted by aliens on **${randomDate(2025, 2050)}**.`,
            `💰 You will win the lottery on **${randomDate(2025, 2030)}**.`,
            `🍕 You will eat the best pizza of your life on **${randomDate(2025, 2026)}**.`,
            `⚠ Your worst enemy will find you on **${randomDate(2025, 2035)}**.`,
            `😂 You will embarrass yourself in public on **${randomDate(2025, 2035)}**.`
        ];

        // Shuffle predictions and take only 5
        const shuffled = allPredictions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        resultBox.innerHTML = selected.map(p => `<p>${p}</p>`).join("");
        resultBox.classList.remove("hidden");
        statusText.textContent = "Scan complete.";
    }, scanStages.length * 1200 + 1000);
}
