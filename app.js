let selectedName = "";
let selectedPhrase = "";

// Telegram Bot ma'lumotlari
const BOT_TOKEN = "8836223070:AAHL89YHRm_9E5M_6fLf4IiBU3jhRuEd7Xw";
const CHAT_ID = "8456581050";

// --- 1. Boshlang'ich tugmalar mantiqi ---

function removeNoBtn() {
    const noBtn = document.getElementById("noBtn");
    const warningText = document.getElementById("warningText");

    if (noBtn) noBtn.style.display = "none";
    if (warningText) warningText.textContent = "Sizda faqat bitta tanlov bor! 😉❤️";
}

function nextStep() {
    const step1 = document.getElementById("step1");
    const step2_quiz1 = document.getElementById("step2_quiz1");

    if (step1) step1.classList.add("hidden");
    if (step2_quiz1) step2_quiz1.classList.remove("hidden");
}

// --- 2. Yangi so'rovnomalar mantiqi ---

function selectOption1(val) {
    const errorEl = document.getElementById('error-1');
    if (val === 'Ismi bilan') {
        errorEl.innerText = "Sizda faqat tepadagi menyularga ruxsat bor! 😜";
    } else {
        selectedName = val;
        errorEl.innerText = "";
        document.getElementById('step2_quiz1').classList.add('hidden');
        document.getElementById('step2_quiz2').classList.remove('hidden');
    }
}

function selectOption2(val) {
    const errorEl = document.getElementById('error-2');
    if (val === "Tur yo'qol") {
        errorEl.innerText = "Sizda faqat tepadagi menyularga ruxsat bor! 😜";
    } else {
        selectedPhrase = val;
        errorEl.innerText = "";
        document.getElementById('step2_quiz2').classList.add('hidden');
        document.getElementById('step3_final').classList.remove('hidden');
        
        // Yakunda Telegram'ga yuborish
        sendResultToTelegram(selectedName, selectedPhrase);
    }
}

// --- 3. Telegram'ga javoblarni yuborish ---

function sendResultToTelegram(nameChoice, phraseChoice) {
    const message = `🎉 **Yangi so'rovnoma javobi tushdi!**\n\n` +
                    `1. Uni nima deb chaqirishi: **${nameChoice}**\n` +
                    `2. Yuziga qarab aytadigan so'zi: **${phraseChoice}**\n` +
                    `3. Ozodbekning taklifiga javobi: **Ha, judayam sevaman! ❤️**`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    }).then(res => console.log("Telegramga yuborildi!"))
      .catch(err => console.error("Xatolik:", err));
}

// --- 4. Background uchun avtomatik suzuvchi yuraklar generatori ---

function createHeart() {
    const heartsBg = document.getElementById("heartsBg");
    if (!heartsBg) return;

    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤️";
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    heartsBg.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 300);