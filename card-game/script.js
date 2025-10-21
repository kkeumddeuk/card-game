// 카드 속 이미지 여기서 넣는 거임.
const icons = [
  "./jaehee.png",
  "./riku.png",
  "./ryo.png",
  "./sakuya.png",
  "./sion.png",
  "./yushi.png",
];

let cards = [...icons, ...icons];
let firstCard = null,
  secondCard = null,
  lock = false,
  matchedPairs = 0;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createBoard() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  const s = shuffle(cards.slice());
  s.forEach((src) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.image = src;

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-front";

    // 위츄 여기에서 넣은 거임.
    const frontImg = document.createElement("img");
    frontImg.src = "./WISH.png"; // 여기에다가 위츄 경로를 넣어주면 됨.
    frontImg.className = "front-image";
    front.appendChild(frontImg);

    const back = document.createElement("div");
    back.className = "card-back";
    const img = document.createElement("img");
    img.src = src;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", () => flipCard(card));
    grid.appendChild(card);
  });
}

function showPopup() {
  const popupEl = document.getElementById("popup");
  if (popupEl) {
    popupEl.classList.remove("hidden");
    // 효과음 넣을 때 여기서 넣은건데, html에서 ID 찾아다가 여기다가 넣으면 됨
    const partySound = document.getElementById("party-sound");
    if (partySound) {
      partySound.currentTime = 0;
      partySound.play();
    }
  }
}

function flipCard(card) {
  if (lock) return;
  // 효과음 넣을 때 여기서 넣은건데, html에서 ID 찾아다가 여기다가 넣으면 됨
  const clickSound = document.getElementById("click-sound");
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  if (card.classList.contains("matched")) return;

  if (card.classList.contains("flipped")) {
    return;
  }

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  lock = true;

  if (firstCard.dataset.image === secondCard.dataset.image) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedPairs++;

    if (matchedPairs === icons.length) {
      setTimeout(() => {
        showPopup();
      }, 300);
    }
    setTimeout(() => {
      firstCard = null;
      secondCard = null;
      lock = false;
    }, 200);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      lock = false;
    }, 700);
  }
}

const popupCloseBtn = document.getElementById("popup-close");

popupCloseBtn.addEventListener("click", () => {
  const popupEl = document.getElementById("popup");
  if (popupEl) {
    popupEl.classList.add("hidden");
  }
  if (partySound) {
    partySound.pause();
    partySound.currentTime = 0;
  }
  resetGame();
});

function resetGame() {
  firstCard = null;
  secondCard = null;
  lock = false;
  matchedPairs = 0;
  cards = shuffle(cards.slice());
  createBoard();
}

createBoard();

const clickSound = document.getElementById("click-sound");

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });
});

const bg = document.querySelector(".floating-bg");

for (let i = 0; i < 30; i++) {
  const type = Math.random() > 0.5 ? "star" : "swirl";
  const el = document.createElement("div");
  el.className = type;

  const size = 15 + Math.random() * 30;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;

  el.style.left = `${Math.random() * 100}%`;
  el.style.top = `${Math.random() * 100}%`;

  // 배경 안에 떠다니는 거 색상 랜덤하게 뜰 수 있도록
  const colors = ["#9fffa5", "#b3deff", "#c9b6ff"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  if (type === "star") {
    el.style.background = color;
    el.style.boxShadow = `0 0 8px ${color}`;
  } else {
    el.style.borderColor = color;
  }

  el.style.animationDuration = `${10 + Math.random() * 10}s`;
  el.style.animationDelay = `${Math.random() * 5}s`;

  bg.appendChild(el);
}
