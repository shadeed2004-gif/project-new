function predictFuture() {
    const predictions = [
        "You will have great success in your career 🌟",
        "A surprise gift is coming your way 🎁",
        "You will travel to a beautiful place soon ✈",
        "Beware of someone trying to deceive you ⚠",
        "A small challenge will make you stronger 💪",
        "Love and happiness are on the horizon ❤",
        "Be cautious with your spending this month 💰",
        "Good news will arrive unexpectedly 📩"
    ];

    const randomIndex = Math.floor(Math.random() * predictions.length);
    document.getElementById("result").textContent = predictions[randomIndex];
}