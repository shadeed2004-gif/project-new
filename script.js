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
    statusText.textContent = "Scanning...";
    setTimeout(() => {
        statusText.textContent = "Analyzing palm lines...";
    }, 2000);

    setTimeout(() => {
        statusText.textContent = "Predicting your future...";
    }, 4000);

    setTimeout(() => {
        const predictions = [
            `💍 Your marriage will happen on **${randomDate(2025, 2035)}**.`,
            `💼 You will get your dream job on **${randomDate(2025, 2030)}**.`,
            `🌴 You will go on a vacation to Maldives on **${randomDate(2025, 2028)}**.`,
            `👶 You will have your first child on **${randomDate(2026, 2035)}**.`,
            `🏆 You will win a big award on **${randomDate(2025, 2035)}**.`,
            `🚀 You will meet an alien on **${randomDate(2025, 2050)}**.`,
            `💰 You will win the lottery on **${randomDate(2025, 2030)}**.`,
            `🍕 You will eat the best pizza of your life on **${randomDate(2025, 2026)}**.`
        ];

        resultBox.innerHTML = predictions.map(p => `<p>${p}</p>`).join("");
        resultBox.classList.remove("hidden");
        statusText.textContent = "Scan complete!";
    }, 6000);
}
