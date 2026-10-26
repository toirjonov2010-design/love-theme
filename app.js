const steps = ["step1", "step2", "step3", "step4", "step5", "step6"];
const BOT_TOKEN = "8836223070:AAHL89YHRm_9E5M_6fLf4IiBU3jhRuEd7Xw";
const CHAT_ID = "8456581050";

function showStep(stepId) {
  steps.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle("hidden", id !== stepId);
    }
  });
}

function removeNoBtn() {
  const noBtn = document.getElementById("noBtn");
  const warningText = document.getElementById("warningText");

  if (noBtn) noBtn.style.display = "none";
  if (warningText)
    warningText.textContent = "Qiziq, xolos, tanlovingizni qabul qildim 😉";
}

function goToNextStep(nextStepId) {
  showStep(nextStepId);
}

function resetQuiz() {
  showStep("step1");
  const noBtn = document.getElementById("noBtn");
  const warningText = document.getElementById("warningText");
  const step5AnswerNote = document.getElementById("step5AnswerNote");
  const step5Buttons = document.querySelectorAll(".step5-option");
  const finalNoBtn = document.getElementById("finalNoBtn");
  const finalMessage = document.getElementById("finalMessage");

  if (noBtn) noBtn.style.display = "block";
  if (warningText) warningText.textContent = "";
  if (step5AnswerNote) {
    step5AnswerNote.textContent = "";
    step5AnswerNote.classList.add("hidden");
  }

  step5Buttons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("selected");
  });

  if (finalNoBtn) {
    finalNoBtn.disabled = false;
    finalNoBtn.classList.remove("escaped");
    finalNoBtn.style.position = "static";
    finalNoBtn.style.left = "auto";
    finalNoBtn.style.top = "auto";
    finalNoBtn.style.transform = "none";
  }

  if (finalMessage) finalMessage.textContent = "";
}

async function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram xabar yuborilmadi:", result.description);
    }
  } catch (error) {
    console.error("Telegram API xatolik berdi:", error);
  }
}

function finishQuizWithTelegram(label) {
  const now = new Date();
  const text = `💌 Yangi sevgi testi yakunlandi\nVaqt: ${now.toLocaleString("uz-UZ")}\nNatija: ${label}`;
  sendTelegramMessage(text);
}

function revealStepFiveAnswer(button) {
  const note = document.getElementById("step5AnswerNote");
  const optionButtons = document.querySelectorAll(".step5-option");

  if (!note || !button) return;

  if (note.classList.contains("hidden")) {
    const answer = button.dataset.answer || "tanlov";
    finishQuizWithTelegram(`5-sahifa yakunlandi. Tanlov: ${answer}`);
  }

  optionButtons.forEach((item) => {
    item.disabled = true;
    item.classList.remove("selected");
  });

  button.classList.add("selected");
  note.textContent =
    "U hech qachon sizga hiyonat qilmaydi esingizdan chiqarmang";
  note.classList.remove("hidden");
}

function moveNoButton(button) {
  if (!button) return;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const buttonWidth = button.offsetWidth || 180;
  const buttonHeight = button.offsetHeight || 58;

  const safeLeft = Math.max(12, viewportWidth - buttonWidth - 18);
  const safeTop = Math.max(24, viewportHeight - buttonHeight - 18);

  const left = Math.random() * safeLeft;
  const top = Math.random() * safeTop;

  button.style.position = "fixed";
  button.style.left = `${left}px`;
  button.style.top = `${top}px`;
  button.style.transform = "translate(0, 0)";
  button.classList.add("escaped");
}

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const noBtn = document.getElementById("noBtn");
  const step5Buttons = document.querySelectorAll(".step5-option");
  const finalYesBtn = document.getElementById("finalYesBtn");
  const finalNoBtn = document.getElementById("finalNoBtn");
  const finalMessage = document.getElementById("finalMessage");
  const optionButtons = document.querySelectorAll(".option-btn");

  if (startBtn) {
    startBtn.addEventListener("click", () => goToNextStep("step2"));
  }

  if (noBtn) {
    noBtn.addEventListener("click", removeNoBtn);
  }

  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const stepId = button.closest(".step")?.id;
      const nextStepId = button.dataset.next;

      if (stepId === "step5") {
        revealStepFiveAnswer(button);
        return;
      }

      if (nextStepId) {
        goToNextStep(nextStepId);
      }
    });
  });

  step5Buttons.forEach((button) => {
    button.addEventListener("click", () => {
      revealStepFiveAnswer(button);
    });
  });

  if (finalYesBtn) {
    finalYesBtn.addEventListener("click", () => {
      if (finalMessage) {
        finalMessage.textContent =
          "Yaxshi, bu sevgi va ishonchga asoslanadi 😊";
      }
      finishQuizWithTelegram("A: Ha, juda sevaman");
      finalYesBtn.disabled = true;
      if (finalNoBtn) finalNoBtn.style.display = "none";
    });
  }

  if (finalNoBtn) {
    finalNoBtn.addEventListener("click", () => {
      moveNoButton(finalNoBtn);
      if (finalMessage) {
        finalMessage.textContent = "Noqta! Endi faqat A varianti qoldi ✨";
      }
    });
  }

  const retryBtn = document.getElementById("DoneBtn");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      finishQuizWithTelegram("Done tugmasi bosildi");
      resetQuiz();
    });
  }
});
