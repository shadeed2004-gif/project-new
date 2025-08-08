const imageUpload = document.getElementById("imageUpload");
const palmImage = document.getElementById("palmImage");
const scannerContainer = document.getElementById("scannerContainer");
const statusText = document.getElementById("statusText");
const resultBox = document.getElementById("result");

const predictions = [
    "You will have an amazing day full of surprises!",
    "A mysterious person will bring you good news.",
    "Your hard work will soon pay off in unexpected ways.",
    "An opportunity will knock — be ready to answer.",
    "A new adventure awaits you this week.",
    "You will soon find something you thought was lost.",
    "Happiness will come from an unexpected source.",
    "A small risk will lead to a big reward."
];

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

function startScanning() {
    statusText.textContent = "Scanning...";
    setTimeout(() => {
        statusText.textContent = "Processing...";
    }, 2000);

    setTimeout(() => {
        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        resultBox.textContent = "🔮 " + randomPrediction;
        resultBox.classList.remove("hidden");
        statusText.textContent = "Scan complete!";
    }, 4000);
}
