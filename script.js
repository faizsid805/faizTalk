console.log("RobiTalk is ready 💬");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "boys") {
  document.body.classList.add("boys-theme");
}

let direction = "IN_TO_HI";

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const langSwitch = document.getElementById ("langSwitch");
const switchLabel = document.querySelector(".switch-label");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const themeToggle = document.getElementById("themeToggle");
const btnText = document.querySelector(".btn-text");
const loader = document.querySelector(".loader");
const copyText = document.querySelector(".copy-text");
const copyIcon = document.querySelector(".copy-icon");
const dictionary = {
  IN_TO_HI: {
    "aku": "main",
    "kamu": "tum",
    "senang": "khush",
    "cinta": "pyaar",
    "hari": "din",
    "baik": "accha",
    "apa": "kya",
    "terima kasih": "dhanyavaad"
  },
  HI_TO_IN: {
    "main": "aku",
    "tum": "kamu",
    "khush": "senang",
    "pyaar": "cinta",
    "din": "hari",
    "accha": "baik",
    "kya": "apa",
    "dhanyavaad": "terima kasih"
  }
};
const phraseDictionary = {
  HI_TO_IN: {
    "khana khaya": "sudah makan?",
    "kya kar rahi ho": "lagi apa?",
    "kahan ho": "kamu di mana?",
    "kya hua": "ada apa?",
    "ghar pahonch ke text krna": "kalau sudah sampai rumah kabari ya",
    "mein thik hu": "aku baik-baik saja",
    "busy ho": "lagi sibuk?",
    "mein help karu": "aku bantu?",
    "chup kyu ho": "kenapa diam?",
    "gussa ho": "kamu marah?",
    "mein to gussa nhi ho": "aku tidak marah kok",
    "aaj cute lg rhi ho": "hari ini kamu terlihat lucu",
    "mujhe namaz ke liye jana hai": "aku harus pergi sholat",
    "thodi der ke baad ata hu": "aku kembali sebentar lagi"
  },
  IN_TO_HI: {
    "sudah makan?": "khana khaya?",
    "lagi apa?": "kya kar rhi ho?",
    "kamu di mana?": "kahan ho?",
    "ada apa?": "kya hua?",
    "kalau sudah sampai rumah kabari ya": "ghar pahonch ke text krna",
    "aku baik-baik saja": "mein thik hu",
    "lagi sibuk?": "busy ho?",
    "aku bantu?": "mein help karu?",
    "kenapa diam?": "chup kyu ho?",
    "kamu marah?": "gussa ho?",
    "aku tidak marah kok": "mein to gussa nhi ho",
    "hari ini kamu terlihat lucu": "aaj cute lg rhi ho",
    "aku harus pergi sholat": "mujhe namaz ke liye jana hai",
    "aku kembali sebentar lagi": "thodi der ke baad ata hu"
  }
};
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[?.,!]/g, "")     // punctuation remove
    .replace(/\s+/g, " ")       // extra spaces remove
    .trim()
    .replace("kr", "kar")
    .replace("rhi", "rahi")
    .replace("rha", "raha");
}

/* 🔄 Toggle Language */

langSwitch.addEventListener("click", () => {
  langSwitch.classList.toggle("active");

  if (direction === "IN_TO_HI") {
    direction = "HI_TO_IN";
    switchLabel.textContent = "HI";
  } else {
    direction = "IN_TO_HI";
    switchLabel.textContent = "IN";
  }
});

/* 🚀 Translate Action */
function translate() {
  const rawText = inputText.value.trim();
const text = normalizeText(rawText);

  if (text === "") {
    outputText.value = "";
    return;
  }

  translateBtn.disabled = true;

  // show loader
  btnText.style.display = "none";
  loader.style.display = "inline-block";

setTimeout(() => {
 let phraseFound = false;

for (let phrase in phraseDictionary[direction]) {
  if (text.includes(phrase)) {
    outputText.value = phraseDictionary[direction][phrase];
    autoResize(outputText);

    translateBtn.disabled = false;
    btnText.style.display = "inline-block";
    loader.style.display = "none";

    phraseFound = true;
    break;
  }
}

if (phraseFound) return;

  const words = text.toLowerCase().split(" ");
let translated = [];

words.forEach(word => {
  if (dictionary[direction][word]) {
    translated.push(dictionary[direction][word]);
  } else {
    translated.push(word);
  }
});

outputText.value = translated.join(" ");
autoResize(outputText);
  autoResize(outputText);

  outputText.classList.remove("output-reveal");
  void outputText.offsetWidth; // force restart
  outputText.classList.add("output-reveal");

  translateBtn.disabled = false;
  btnText.style.display = "inline-block";
  loader.style.display = "none";

}, 800);
}

translateBtn.addEventListener("click", translate);

/* ⌨️ Enter = Translate (Shift+Enter = new line) */
inputText.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    translate();
  }
});

/* 🧹 Clear output if input empty */
inputText.addEventListener("input", () => {
  if (inputText.value.trim() === "") {
    outputText.value = "";
  }
});

/* 📋 Copy Button */



themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("boys-theme");

  if (document.body.classList.contains("boys-theme")) {
    localStorage.setItem("theme", "boys");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "pink");
    themeToggle.textContent = "🌙";
  }
});
if (savedTheme === "boys") {
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}
function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

inputText.addEventListener("input", () => {
  autoResize(inputText);
});
outputText.addEventListener("input", () => {
  autoResize(outputText);
});
const charCounter = document.getElementById("charCounter");

inputText.addEventListener("input", () => {
  const count = inputText.value.length;
  charCounter.textContent = `${count} characters`;
});
copyBtn.addEventListener("click", () => {
  if (outputText.value.trim() === "") return;

  navigator.clipboard.writeText(outputText.value);

  // hide text, show check icon
  copyText.style.display = "none";
  copyIcon.style.display = "inline";

  copyBtn.classList.add("copy-success");

  setTimeout(() => {
    copyText.style.display = "inline";
    copyIcon.style.display = "none";
    copyBtn.classList.remove("copy-success");
  }, 1200);
});
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  });
});