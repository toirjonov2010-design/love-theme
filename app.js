const steps = ["step1", "step2", "step3", "step4", "step5", "step6"];

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

  if (noBtn) noBtn.style.display = "block";
  if (warningText) warningText.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const noBtn = document.getElementById("noBtn");
  const retryBtn = document.getElementById("tryAgainBtn");
  const optionButtons = document.querySelectorAll(".option-btn");

  if (startBtn) {
    startBtn.addEventListener("click", () => goToNextStep("step2"));
  }

  if (noBtn) {
    noBtn.addEventListener("click", removeNoBtn);
  }

  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextStepId = button.dataset.next;
      if (nextStepId) {
        goToNextStep(nextStepId);
      }
    });
  });

  if (retryBtn) {
    retryBtn.addEventListener("click", resetQuiz);
  }
});
