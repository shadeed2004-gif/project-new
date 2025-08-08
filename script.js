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
        "Finding your life’s mistakes...",
        "Judging your decisions...",
        "Laughing at your future...",
        "Almost done ruining your hopes..."
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
        const predictions = [
            `💍 Marriage date: **${randomDate(2025, 2035)}** (good luck surviving).`,
            `💼 Job offer: **${randomDate(2025, 2030)}** – hopefully not in customer service.`,
            `🏚 Bankruptcy: **${randomDate(2026, 2040)}** – start saving now.`,
            `🌴 Vacation: **${randomDate(2025, 2028)}** – probably cancelled last minute.`,
            `🛸 Alien abduction: **${randomDate(2025, 2050)}** – don’t pack much.`,
            `💰 Lottery win: **${randomDate(2025, 2030)}** – and lose it in 3 weeks.`,
            `🍕 Best pizza: **${randomDate(2025, 2026)}** – enjoy it, it’s all downhill from there.`,
            `⚰ Death: **${randomDate(2080, 2100)}** – or earlier if you keep eating gas station sushi.`
        ];

        resultBox.innerHTML = predictions.map(p => `<p>${p}</p>`).join("");
        resultBox.classList.remove("hidden");
        statusText.textContent = "Scan complete. Try not to cry.";
    }, scanStages.length * 1200 + 1000);
}
