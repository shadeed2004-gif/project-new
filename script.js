let currentInput = "";
let letters = [];

const display = document.getElementById("display");

document.querySelectorAll(".letters button").forEach(btn => {
    btn.addEventListener("click", () => {
        currentInput = btn.textContent; // store current letter
        display.textContent += currentInput;
    });
});

document.getElementById("plus").addEventListener("click", () => {
    if (currentInput) {
        letters.push(currentInput);
        display.textContent += " + ";
        currentInput = "";
    }
});

document.getElementById("equals").addEventListener("click", () => {
    if (currentInput) letters.push(currentInput);
    display.textContent = letters.join("");
    letters = [];
    currentInput = "";
});

document.getElementById("clear").addEventListener("click", () => {
    currentInput = "";
    letters = [];
    display.textContent = "";
});
