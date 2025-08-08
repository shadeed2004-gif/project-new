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
    { text: "നിങ്ങൾ വിവാഹം കഴിക്കും", type: "marriage" },
    { text: "നിങ്ങൾ നിങ്ങളുടെ സ്വപ്ന ജോലിയിലേക്ക് പ്രവേശിക്കും", type: "job" },
    { text: "നിങ്ങൾ മരിക്കും", type: "death" },
    { text: "നിങ്ങൾ ജോലി നഷ്ടപ്പെടും", type: "job_loss" },
    { text: "നിങ്ങൾ ദാരിദ്രത അനുഭവിക്കും", type: "bad_finance" },
    { text: "നിങ്ങൾ മാൾദ്വീപുകളിൽ യാത്ര ചെയ്യും", type: "vacation" },
    { text: "നിങ്ങളെ ഭ്രാന്തന്മാർ പിടികൂടും", type: "alien" },
    { text: "നിങ്ങൾ ലോട്ടറി ജയിക്കും", type: "luck" },
    { text: "നിങ്ങൾ ജീവിതത്തിലെ മികച്ച പിസ്സ കഴിക്കും", type: "fun" },
    { text: "നിങ്ങളുടെ ശത്രു നിങ്ങളെ കണ്ടെത്തും", type: "bad_event" },
    { text: "നിങ്ങൾ പൊതുവേദിയിൽ ലജ്ജപെടും", type: "bad_event" },
    { text: "നിങ്ങൾ അനേകം സ്വഭാവങ്ങളുള്ള വാരസത്വം ലഭിക്കും", type: "luck" },
    { text: "നിങ്ങൾ ഒരു പാചക മത്സരം ജയിക്കും", type: "luck" },
    { text: "നിങ്ങൾ ഒരു രഹസ്യ കഴിവ് കണ്ടെത്തും", type: "good_event" },
    { text: "നിങ്ങൾ മൂന്നുമണിക്കൂർ ട്രാഫിക്കിൽ കുടുങ്ങും", type: "bad_event" },
    { text: "നിങ്ങൾ കടങ്ങളല്ലാതെ പണം നൽകും", type: "good_finance" },
    { text: "നിങ്ങൾ നിങ്ങളുടെ ആത്മാവ് കണ്ടെത്തും", type: "marriage" },
    { text: "നിങ്ങൾ ഒരു രഹസ്യ മൃഗം വളർത്തും", type: "fun" },
    { text: "നിങ്ങൾ ഫോൺ നഷ്ടപ്പെടും", type: "bad_event" },
    { text: "നിങ്ങൾ ലോക റെക്കോർഡ് തകർക്കും", type: "good_event" },
    { text: "നിങ്ങൾ ഇഷ്ടപ്പെട്ട ഷോ ബിംഗുചെയ്യും", type: "fun" },
    { text: "നിങ്ങൾ ഒരു പാട്ട് മറക്കാതെ പാടും", type: "bad_event" },
    { text: "നിങ്ങൾ ചിരിച്ചുകൊണ്ട് കരയും", type: "fun" },
    { text: "നിങ്ങൾ അനൗദ്യോഗികമായി പ്രശസ്തനാകും", type: "good_event" },
    { text: "നിങ്ങൾ കീകൾ മറക്കും", type: "bad_event" },
    { text: "നിങ്ങൾ യാത്രയിൽ വഴിതെറ്റും", type: "bad_event" },
    { text: "നിങ്ങൾ വസ്ത്രം പൊള്ളിക്കും", type: "bad_event" },
    { text: "നിങ്ങൾ പുതിയ ഹോബിയും കണ്ടെത്തും", type: "good_event" },
    { text: "നിങ്ങൾ ലിഫ്റ്റിൽ കുടുങ്ങും", type: "bad_event" },
    { text: "നിങ്ങൾ ഒരു പിസ്സാ സൗജന്യമായി ലഭിക്കും", type: "fun" },
    { text: "നിങ്ങൾ വലിയ ശബ്ദത്തോടെ പാടുന്നു പിടിക്കും", type: "bad_event" },
    { text: "നിങ്ങൾ ഓഫീസിൽ കാപ്പി ഒഴിക്കും", type: "bad_event" },
    { text: "നിങ്ങൾ അതൃപ്തികരമായ കണ്ടുപിടിത്തം ചെയ്യും", type: "fun" },
    { text: "നിങ്ങൾ പൊതുവേദിയിൽ വീഴ്ച്ചപ്പെടും", type: "bad_event" },
    { text: "നിങ്ങൾ വേഗതക്കുറവു ലഭിക്കും", type: "bad_event" },
    { text: "നിങ്ങൾ അപ്രതീക്ഷിത പാർട്ടി കാണും", type: "luck" },
    { text: "നിങ്ങൾ റോഡിൽ പണം കണ്ടെത്തും", type: "luck" },
    { text: "നിങ്ങൾ വീട്ടിൽ തങ്ങൾ പുറത്തേക്കു പോകും", type: "bad_event" }
];

function getDateOffsetRange(type) {
    switch(type) {
        case "marriage": return [2, 15];
        case "job": return [0, 7];
        case "job_loss": return [0, 10];
        case "bad_finance": return [1, 15];
        case "vacation": return [0, 4];
        case "alien": return [5, 25];
        case "luck": return [0, 10];
        case "fun": return [0, 3];
        case "bad_event": return [0, 10];
        case "good_event": return [0, 10];
        case "good_finance": return [1, 10];
        case "death": return [50, 100];
        default: return [0, 10];
    }
}

function startScanning() {
    const scanStages = [
        "കൈരേഖകൾ സ്കാൻ ചെയ്യുന്നു...",
        "നിങ്ങളുടെ മോശം ജീവിത തിരഞ്ഞെടുപ്പുകൾ കണ്ടെത്തുന്നു...",
        "നിങ്ങളുടെ പിഴവുകൾ നിരീക്ഷിക്കുന്നു...",
        "നിങ്ങളുടെ വിധിയെക്കുറിച്ച് ചിരിക്കുന്നു...",
        "നിങ്ങളുടെ പ്രതീക്ഷകൾ നശിപ്പിക്കാൻ ഒരുങ്ങുന്നു..."
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
        const shuffled = allPredictions.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 7);  // 7 predictions now

        const formattedPredictions = selected.map(({text, type}) => {
            const [minOffset, maxOffset] = getDateOffsetRange(type);
            const dateStr = randomDateFromToday(minOffset, maxOffset);
            return `🔮 ${text} **${dateStr}**.`;
        });

        resultBox.innerHTML = formattedPredictions.map(p => `<p>${p}</p>`).join("");
        resultBox.classList.remove("hidden");
        statusText.textContent = "സ്കാൻ പൂർത്തിയായി.";
    }, scanStages.length * 1200 + 1000);
}
