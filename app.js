// Yo'q tugmasi bosilganda tugmani o'chirish va xabar chiqarish
function removeNoBtn() {
  const noBtn = document.getElementById("noBtn");
  const warningText = document.getElementById("warningText");

  // Yo'q tugmasini yo'qotamiz
  noBtn.style.display = "none";

  // Ogohlantirish yozuvini chiqaramiz
  warningText.textContent = "Sizda faqat bitta tanlov bor! 😉❤️";
}

// "Ha" tugmasi bosilganda 2-sahifaga o'tish
function nextStep() {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  step1.classList.add("hidden");
  step2.classList.remove("hidden");
}

// Background uchun avtomatik suzuvchi yuraklar generatori
function createHeart() {
  const heartsBg = document.getElementById("heartsBg");
  const heart = document.createElement("div");
  
  heart.classList.add("floating-heart");
  heart.innerHTML = "❤️";
  
  // Tasodifiy joylashuv va o'lcham
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";

  heartsBg.appendChild(heart);

  // Yurakcha ekrandan chiqib ketgach o'chirish
  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Har 300 millisekundda yangi yurakcha yaratish
setInterval(createHeart, 300);