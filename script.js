// ---------- Setup ----------
const btn = document.getElementById('uselessBtn');
const stage = document.getElementById('stage');
const pressesEl = document.getElementById('presses');
const bestEl = document.getElementById('best');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const confettiLayer = document.getElementById('confettiLayer');

const COLORS = ['#ff5d5d', '#4d7cff', '#ffb703', '#06d6a0', '#a78bfa', '#f72585'];
const LABELS = ['Press Me', 'Nope', 'Too Slow', 'Try Again', 'Almost', 'Ha!', 'Missed', 'Catch Me', 'Nice Try', 'Nah'];
const MESSAGES = [
  "Go on. It's just a button.",
  "It moved. That's normal.",
  "Still nothing happened.",
  "You're very persistent.",
  "This button respects nobody.",
  "Some would call this a skill issue.",
  "The button is judging you.",
  "Perhaps try a different strategy. There isn't one.",
  "Legends say it can be caught.",
  "You are stronger than this button. Are you though?"
];
const WIN_MESSAGE = "🎉 You caught it! It has given up. You win nothing.";

let presses = 0;
let best = Number(localStorage.getItem('useless-best') || 0);
let hasWon = false;
bestEl.textContent = best;

// ---------- Sound (Web Audio, no external files) ----------
let audioCtx;
function beep(freq = 440, duration = 0.1, type = 'sine') {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio blocked or unsupported — bonus feature only, fail silently.
  }
}

// ---------- Interaction 1: Button dodges the cursor on hover ----------
function dodge() {
  if (hasWon) return;
  const stageRect = stage.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const maxX = stageRect.width - btnRect.width;
  const maxY = stageRect.height - btnRect.height;
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);
  btn.style.left = x + 'px';
  btn.style.top = y + 'px';
  btn.style.transform = 'translate(0, 0)';
  btn.classList.remove('wobble');
  void btn.offsetWidth;
  btn.classList.add('wobble');
  beep(600 + Math.random() * 200, 0.08, 'triangle');
}

btn.addEventListener('mouseenter', dodge);
btn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  dodge();
}, { passive: false });

// ---------- Interaction 2: Occasionally the button lets itself be clicked ----------
btn.addEventListener('click', () => {
  presses++;
  pressesEl.textContent = presses;
  if (presses > best) {
    best = presses;
    bestEl.textContent = best;
    localStorage.setItem('useless-best', best);
  }

  btn.textContent = LABELS[Math.floor(Math.random() * LABELS.length)];
  const color1 = COLORS[Math.floor(Math.random() * COLORS.length)];
  const color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
  btn.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
  messageEl.textContent = MESSAGES[Math.min(presses - 1, MESSAGES.length - 1)];
  beep(300, 0.12, 'square');

  // Confetti burst every 10 presses as a small reward
  if (presses % 10 === 0) {
    burstConfetti(30);
  }

  // ---------- Interaction 3 / Easter egg: the button gives up at 30 presses ----------
  if (presses >= 30 && !hasWon) {
    winGame();
  }
});

function winGame() {
  hasWon = true;
  btn.textContent = '🏳️ I Give Up';
  btn.classList.add('caught');
  btn.style.left = '50%';
  btn.style.top = '50%';
  btn.style.transform = 'translate(-50%, -50%)';
  messageEl.textContent = WIN_MESSAGE;
  burstConfetti(90);
  beep(500, 0.2, 'square');
  setTimeout(() => beep(750, 0.25, 'square'), 180);
}

// ---------- Confetti ----------
function burstConfetti(count) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    const duration = 1.4 + Math.random() * 1.6;
    piece.style.animationDuration = duration + 's';
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000 + 200);
  }
}

// ---------- Reset ----------
resetBtn.addEventListener('click', () => {
  presses = 0;
  hasWon = false;
  pressesEl.textContent = 0;
  btn.textContent = 'Press Me';
  btn.style.background = '';
  btn.classList.remove('caught');
  btn.style.left = '50%';
  btn.style.top = '50%';
  btn.style.transform = 'translate(-50%, -50%)';
  messageEl.textContent = "Go on. It's just a button.";
  beep(200, 0.15, 'triangle');
});

// ---------- Dark mode toggle (persisted) ----------
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  darkModeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('useless-theme', theme);
}
const savedTheme = localStorage.getItem('useless-theme') || 'light';
applyTheme(savedTheme);

darkModeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Center button on load
window.addEventListener('load', () => {
  btn.style.left = '50%';
  btn.style.top = '50%';
  btn.style.transform = 'translate(-50%, -50%)';
});
