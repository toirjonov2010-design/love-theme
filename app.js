let selectedName = "";
let selectedPhrase = "";

// Telegram Bot ma'lumotlari
const BOT_TOKEN = "8836223070:AAHL89YHRm_9E5M_6fLf4IiBU3jhRuEd7Xw";
const CHAT_ID = "8456581050";

function selectOption1(val) {
  const errorEl = document.getElementById("error-1");
  if (val === "Ismi bilan") {
    errorEl.innerText = "Sizda faqat tepadagi menyularga ruxsat bor! 😜";
  } else {
    selectedName = val;
    errorEl.innerText = "";
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
  }
}

function selectOption2(val) {
  const errorEl = document.getElementById("error-2");
  if (val === "Tur yo'qol") {
    errorEl.innerText = "Sizda faqat tepadagi menyularga ruxsat bor! 😜";
  } else {
    selectedPhrase = val;
    errorEl.innerText = "";
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-3").classList.remove("hidden");
  }
}

function moveNoButton() {
  const noBtn = document.getElementById("no-btn");
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);
  noBtn.style.position = "fixed";
  noBtn.style.left = `${Math.max(10, x)}px`;
  noBtn.style.top = `${Math.max(10, y)}px`;
}

function finishQuiz() {
  const music = document.getElementById("bg-music");
  if (music) {
    music.play().catch(() => {});
  }

  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  document.getElementById("step-3").classList.add("hidden");
  document.getElementById("step-final").classList.remove("hidden");

  sendResultToTelegram(selectedName, selectedPhrase);
}

function sendResultToTelegram(nameChoice, phraseChoice) {
  const message =
    `🎉 **Yangi so'rovnoma javobi!**\n\n` +
    `1. Uni nima deb chaqirishi: **${nameChoice}**\n` +
    `2. Yuziga qarab aytadigan so'zi: **${phraseChoice}**\n` +
    `3. Sevgi izhoriga javob: **Ha ❤️**`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  })
    .then((res) => console.log("Telegramga yuborildi!"))
    .catch((err) => console.error("Xatolik:", err));
}
