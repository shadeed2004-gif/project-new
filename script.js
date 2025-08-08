const video = document.getElementById('camera');
const scanBtn = document.getElementById('scanBtn');
const scannerLine = document.getElementById('scanner-line');
const resultBox = document.getElementById('result');

// Scripted random outputs
const outputs = [
    "You will have a lucky day 🍀",
    "A surprise is coming your way 🎁",
    "Beware of spilled coffee today ☕",
    "Someone will text you soon 📱",
    "Your palm says: nap time 😴",
    "Good news is on the horizon 🌅"
];

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { video.srcObject = stream; })
    .catch(err => { alert("Camera access denied!"); });

scanBtn.addEventListener('click', () => {
    resultBox.textContent = "";
    scannerLine.style.animation = "scan 2s linear infinite";

    // Fake scanning delay
    setTimeout(() => {
        scannerLine.style.animation = "none";
        const randomMessage = outputs[Math.floor(Math.random() * outputs.length)];
        resultBox.textContent = randomMessage;
    }, 5000);
});
