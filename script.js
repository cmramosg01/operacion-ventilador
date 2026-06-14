const RESOURCE_PATHS = {
  images: {
    arbol: "assets/img/arbol.gif",
    fan: "assets/img/fan.gif",
    hojas: "assets/img/hojas.gif",
    intensidad: "assets/img/intensidad.gif",
    tornado: "assets/img/tornado.gif",
    viento: "assets/img/viento.gif",
    logo: "assets/img/logo-cienciasymates.png"
  },
  sounds: {
    applause: "assets/sounds/applause.mp3",
    tada: "assets/sounds/tada.mp3",
    shock: "assets/sounds/shock.mp3",
    viento: "assets/sounds/viento.mp3",
    whooshes: "assets/sounds/whooshes.mp3",
    winner: "assets/sounds/winner-game-sound.mp3"
  }
};

// Estado unico del juego: pantallas, equipos, tablero y audio.
const STORAGE_KEY = "operacionVentiladorState";
const suggestedNames = ["Los Derretidos", "Los Asados", "Los Quemados", "Los Frescos", "Los Achicharrados", "Los Evaporados"];
const windPhrases = [
  "La temperatura sube, pero el cerebro resiste.",
  "Prohibido derretirse antes de responder.",
  "Si aciertas, corre una brisa de gloria.",
  "Modo junio activado.",
  "El ventilador no da puntos, pero ayuda.",
  "El calor aprieta, pero 2º ESO no se rinde.",
  "Hoy las neuronas trabajan en modo supervivencia."
];
const failMessages = [
  "Respuesta derretida. Turno del otro equipo.",
  "El ventilador no ha llegado a tiempo.",
  "Casi, casi... pero junio no perdona."
];

// Preguntas editables. La mezcla se hace al crear cada tablero.
const questions = [
  { category: "Matemáticas", className: "math", level: "Naturales básico", question: "Un coche recorre 120 km en 2 horas. ¿Cuántos km recorre en 1 hora si mantiene la misma velocidad?", answer: "60 km.", points: 20 },
  { category: "Matemáticas", className: "math", level: "Enteros", question: "Calcula: -8 + 15 - 6.", answer: "1.", points: 20 },
  { category: "Matemáticas", className: "math", level: "Potencias", question: "Calcula: 2³ · 2².", answer: "2⁵ = 32.", points: 20, special: "Ráfaga del ventilador" },
  { category: "Matemáticas", className: "math", level: "Fracciones", question: "Calcula: 1/5 + 4/5.", answer: "1.", points: 20 },
  { category: "Matemáticas", className: "math", level: "Ecuación de primer grado", question: "Resuelve: 3x + 5 = 20.", answer: "x = 5.", points: 20 },
  { category: "Matemáticas", className: "math", level: "Discriminante", question: "En x² - 5x + 6 = 0, calcula el discriminante.", answer: "Δ = 25 - 24 = 1.", points: 20, special: "Modo derretimiento", specialMessage: "Pregunta difícil: podéis pedir ayuda a un profesor o profesora." },
  { category: "Matemáticas", className: "math", level: "Pendiente", question: "¿Cuál es la pendiente de la recta y = 3x - 2?", answer: "3.", points: 20 },
  { category: "Matemáticas", className: "math", level: "Perímetro", question: "Un rectángulo mide 6 cm de largo y 4 cm de ancho. ¿Cuál es su perímetro?", answer: "20 cm.", points: 20, special: "Modo derretimiento" },
  { category: "Matemáticas", className: "math", level: "Porcentaje sencillo", question: "En una clase hay 20 estudiantes y 5 faltan. ¿Qué porcentaje ha faltado?", answer: "25%.", points: 20 },
  { category: "Matemáticas", className: "math", level: "Coordenadas", question: "El punto P(3, -2), ¿en qué cuadrante está?", answer: "Cuarto cuadrante.", points: 20 },
  { category: "Física", className: "physics", level: "Fuerza", question: "¿Qué unidad se usa para medir la fuerza en el Sistema Internacional?", answer: "Newton, N.", points: 20 },
  { category: "Física", className: "physics", level: "Peso", question: "¿Qué fórmula permite calcular el peso?", answer: "P = m · g.", points: 20 },
  { category: "Física", className: "physics", level: "Energía", question: "Di dos tipos de energía.", answer: "Cinética, potencial, térmica, eléctrica, química, luminosa o sonora.", points: 20 },
  { category: "Física", className: "physics", level: "Temperatura", question: "Nombra dos escalas de temperatura.", answer: "Celsius, Kelvin o Fahrenheit.", points: 20, special: "A tomar viento" },
  { category: "Física", className: "physics", level: "Misión espacial", question: "¿Cómo se llama la misión espacial que llevó una nave a la Luna y que programasteis en Scratch?", answer: "Misión Artemis.", points: 20 },
  { category: "Química", className: "chemistry", level: "Átomos", question: "¿Dónde se encuentran los protones y los neutrones?", answer: "En el núcleo del átomo.", points: 20 },
  { category: "Química", className: "chemistry", level: "Número atómico", question: "¿Qué indica el número atómico?", answer: "El número de protones del átomo.", points: 20 },
  { category: "Química", className: "chemistry", level: "Símbolo químico", question: "¿Cuál es el símbolo químico del oxígeno?", answer: "O.", points: 20, special: "Tornado" },
  { category: "Química", className: "chemistry", level: "Agua", question: "Un litro de agua pura tiene una masa aproximada de...", answer: "1 kg.", points: 20 },
  { category: "Química", className: "chemistry", level: "Moléculas", question: "La unión mediante enlaces químicos de varios átomos se llama...", answer: "Molécula.", points: 20 },
  { category: "Bonus emocional", className: "bonus", level: "Resumen final", question: "Resume en una frase qué ha sido para ti este curso.", answer: "Libre.", points: 30, special: "Soplo de aire fresco" },
  { category: "Bonus emocional", className: "bonus", level: "Lo aprendido", question: "¿Qué piensas que es lo más importante que has aprendido en 2º ESO?", answer: "Libre.", points: 30, special: "Soplo de aire fresco" },
  { category: "Bonus emocional", className: "bonus", level: "Consejo al futuro", question: "¿Qué consejo le darías a alguien que empieza 2º ESO el curso que viene?", answer: "Libre.", points: 30, special: "Soplo de aire fresco" },
  { category: "Bonus emocional", className: "bonus", level: "Borra lo malo", question: "Di algo que te gustaría borrar de este curso.", answer: "Libre.", points: 30, special: "Soplo de aire fresco" },
  { category: "Bonus emocional", className: "bonus", level: "Escribe lo bueno", question: "Di algo que te gustaría escribir para tu futuro.", answer: "Libre.", points: 30, special: "Soplo de aire fresco" }
];

const state = {
  screen: "start",
  teams: [],
  currentTeam: 0,
  board: [],
  completed: [],
  sound: false,
  starterDrawn: null
};

const sounds = {};
let activeCell = null;
let timerId = null;
let timeLeft = 30;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

document.addEventListener("DOMContentLoaded", () => {
  prepareResources();
  bindEvents();
  renderTeamInputs();
  loadState();
  renderAll();
});

function prepareResources() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => img.classList.add("broken"));
  });

  Object.entries(RESOURCE_PATHS.sounds).forEach(([key, path]) => {
    const audio = new Audio(path);
    audio.preload = "auto";
    audio.addEventListener("error", () => {
      sounds[key] = null;
    });
    sounds[key] = audio;
  });
}

// Pantalla de configuracion: equipos editables y sorteo de inicio.
function bindEvents() {
  $("#startButton").addEventListener("click", () => showScreen("setup"));
  $$("[data-go-start]").forEach((button) => {
    button.addEventListener("click", () => showScreen("start"));
  });
  $("#resetStorageStart").addEventListener("click", resetEverything);
  $("#teamCount").addEventListener("change", renderTeamInputs);
  $("#drawStarter").addEventListener("click", drawStarter);
  $("#createBoard").addEventListener("click", createGame);
  $("#changeTurn").addEventListener("click", nextTurn);
  $("#turboButton").addEventListener("click", turboFan);
  $("#resetGame").addEventListener("click", resetEverything);
  $("#playAgain").addEventListener("click", resetEverything);
  $("#rewardsButton").addEventListener("click", () => $("#rewardText").classList.remove("hidden"));
  $("#soundToggle").addEventListener("click", toggleSound);
  $("#fullscreenButton").addEventListener("click", toggleFullscreen);
  $("#showQuestion").addEventListener("click", revealQuestion);
  $("#startTimer").addEventListener("click", startTimer);
  $("#stopTimer").addEventListener("click", stopTimer);
  $("#showAnswer").addEventListener("click", revealAnswer);
  $("#correctButton").addEventListener("click", markCorrect);
  $("#wrongButton").addEventListener("click", markWrong);
  $("#bounceButton").addEventListener("click", bounceQuestion);
  $("#closeModal").addEventListener("click", closeModal);
  $("#closeModalTop").addEventListener("click", closeModal);
  $("#questionModal").addEventListener("click", (event) => {
    if (event.target.id === "questionModal") closeModal();
  });
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.teams) || !Array.isArray(saved.board)) return;
    Object.assign(state, saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showScreen(screen) {
  state.screen = screen;
  renderAll();
  saveState();
}

function renderAll() {
  $$(".screen").forEach((screen) => screen.classList.remove("active"));
  $(`#screen${capitalize(state.screen)}`).classList.add("active");
  $("#soundToggle").textContent = state.sound ? "Desactivar sonido" : "Activar sonido";
  renderScores();
  renderBoard();
  renderTurn();
  renderWindPhrase();
  if (state.screen === "final") renderWinner();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderTeamInputs() {
  const count = Number($("#teamCount").value);
  const wrapper = $("#teamInputs");
  wrapper.innerHTML = "";
  for (let index = 0; index < count; index += 1) {
    const label = document.createElement("label");
    label.className = "team-input";
    label.innerHTML = `<span>Equipo ${index + 1}</span><input type="text" value="${suggestedNames[index]}" data-team-name="${index}">`;
    wrapper.appendChild(label);
  }
}

function readTeamNames() {
  return $$("[data-team-name]").map((input, index) => ({
    name: input.value.trim() || suggestedNames[index],
    points: 0
  }));
}

function drawStarter() {
  const teams = readTeamNames();
  const chosen = Math.floor(Math.random() * teams.length);
  state.starterDrawn = chosen;
  $("#starterResult").textContent = `Empieza: ${teams[chosen].name}`;
  playSound("whooshes");
  windBurst();
}

function createGame() {
  state.teams = readTeamNames();
  state.currentTeam = state.starterDrawn ?? Math.floor(Math.random() * state.teams.length);
  state.board = shuffle(questions).map((item, index) => ({
    ...item,
    code: boardCode(index),
    id: `${item.category}-${item.level}-${index}`
  }));
  state.completed = [];
  state.screen = "game";
  saveState();
  renderAll();
}

// El tablero usa columnas A-E y filas 1-5 como batalla naval.
function boardCode(index) {
  const col = ["A", "B", "C", "D", "E"][Math.floor(index / 5)];
  const row = (index % 5) + 1;
  return `${col}${row}`;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderScores() {
  const scoreboard = $("#scoreboard");
  if (!scoreboard || !state.teams.length) return;
  scoreboard.innerHTML = "";
  state.teams.forEach((team, index) => {
    const card = document.createElement("article");
    card.className = `score-card ${index === state.currentTeam ? "active-team" : ""}`;
    card.innerHTML = `
      <h3>${escapeHtml(team.name)}</h3>
      <div class="points">${team.points}</div>
      <div class="score-controls">
        <button type="button" data-score="${index}" data-delta="10">+10</button>
        <button type="button" data-score="${index}" data-delta="20">+20</button>
        <button type="button" data-score="${index}" data-delta="50">+50</button>
        <button type="button" data-score="${index}" data-delta="-10">-10</button>
        <button type="button" data-reset-score="${index}">Reset</button>
      </div>
    `;
    scoreboard.appendChild(card);
  });
  $$("[data-score]").forEach((button) => {
    button.addEventListener("click", () => adjustScore(Number(button.dataset.score), Number(button.dataset.delta)));
  });
  $$("[data-reset-score]").forEach((button) => {
    button.addEventListener("click", () => resetScore(Number(button.dataset.resetScore)));
  });
}

function renderBoard() {
  const board = $("#board");
  if (!board || !state.board.length) return;
  board.innerHTML = "";
  board.appendChild(axis(""));
  ["A", "B", "C", "D", "E"].forEach((letter) => board.appendChild(axis(letter)));
  for (let row = 1; row <= 5; row += 1) {
    board.appendChild(axis(row));
    for (let col = 0; col < 5; col += 1) {
      const index = col * 5 + (row - 1);
      const item = state.board[index];
      const complete = state.completed.includes(item.id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `cell ${item.className} ${complete ? "done" : ""}`;
      button.disabled = complete;
      button.innerHTML = complete ? `<span>${item.code}</span><small>Completada</small>` : `<span>${closedSymbol(item)}</span><small>${item.code}</small>`;
      button.addEventListener("click", () => openModal(item));
      board.appendChild(button);
    }
  }
}

function axis(text) {
  const div = document.createElement("div");
  div.className = "axis";
  div.textContent = text;
  return div;
}

function closedSymbol(item) {
  if (item.special === "Tornado") return "T";
  if (item.special === "Ráfaga del ventilador") return "V";
  if (item.className === "bonus") return "★";
  return "?";
}

function renderTurn() {
  $("#currentTurnName").textContent = state.teams[state.currentTeam]?.name || "";
}

function renderWindPhrase() {
  const phrase = $("#windPhrase");
  if (!phrase || state.screen !== "game") return;
  phrase.textContent = windPhrases[Math.floor(Math.random() * windPhrases.length)];
  phrase.classList.remove("blow-in");
  void phrase.offsetWidth;
  phrase.classList.add("blow-in");
}

function openModal(item) {
  activeCell = item;
  timeLeft = 30;
  stopTimer();
  $("#timerValue").textContent = "30";
  $("#modalCode").textContent = item.code;
  $("#modalCategory").textContent = item.category;
  $("#modalPoints").textContent = `${item.points}${item.special === "Ráfaga del ventilador" ? " + 20" : ""} puntos`;
  $("#modalTitle").textContent = item.level;
  $("#questionText").textContent = item.question;
  $("#answerText").textContent = item.answer;
  $("#questionText").classList.add("hidden");
  $("#answerText").classList.add("hidden");
  $("#bounceButton").classList.add("hidden");
  $("#modalMessage").textContent = "";
  if (item.special) {
    $("#modalSpecial").textContent = item.specialMessage || specialText(item.special);
    $("#modalSpecial").classList.remove("hidden");
  } else {
    $("#modalSpecial").classList.add("hidden");
  }
  $("#questionModal").classList.remove("hidden");
}

function specialText(special) {
  const texts = {
    "Ráfaga del ventilador": "Ráfaga del ventilador: si aciertan, ganan 20 puntos extra.",
    "Modo derretimiento": "Modo derretimiento: pueden pedir ayuda a una profesora.",
    "A tomar viento": "A tomar viento: pueden elegir a alguien del otro equipo para responder.",
    "Tornado": "Tornado: pueden descartar esta pregunta y elegir otra sin penalización.",
    "Soplo de aire fresco": "Soplo de aire fresco: si la respuesta es sincera o bonita, suma 30 puntos."
  };
  return texts[special] || special;
}

function revealQuestion() {
  $("#questionText").classList.remove("hidden");
}

function revealAnswer() {
  $("#answerText").classList.remove("hidden");
}

function startTimer() {
  revealQuestion();
  stopTimer();
  timeLeft = 30;
  $("#timerValue").textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft -= 1;
    $("#timerValue").textContent = timeLeft;
    if (timeLeft <= 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

function markCorrect() {
  if (!activeCell) return;
  const extra = activeCell.special === "Ráfaga del ventilador" ? 20 : 0;
  adjustScore(state.currentTeam, activeCell.points + extra, false);
  if (activeCell.special === "Soplo de aire fresco") playSound("applause");
  else if (activeCell.special === "Ráfaga del ventilador") playSound("whooshes");
  else playSound("tada");
  completeActiveCell();
  confetti();
  $("#modalMessage").textContent = "Acierto. Brisa de gloria para el equipo.";
  setTimeout(() => {
    closeModal();
    nextTurn();
  }, 900);
}

function markWrong() {
  playSound("shock");
  $("#modalMessage").textContent = failMessages[Math.floor(Math.random() * failMessages.length)];
  $("#bounceButton").classList.remove("hidden");
  $("#modalCard").classList.add("shake");
  setTimeout(() => $("#modalCard").classList.remove("shake"), 420);
}

function bounceQuestion() {
  nextTurn();
  playSound(Math.random() > 0.5 ? "viento" : "whooshes");
  windBurst();
  $("#modalMessage").textContent = `Rebote para ${state.teams[state.currentTeam].name}.`;
}

function completeActiveCell() {
  if (!state.completed.includes(activeCell.id)) state.completed.push(activeCell.id);
  saveState();
  if (state.completed.length >= state.board.length) {
    setTimeout(() => {
      closeModal();
      state.screen = "final";
      saveState();
      renderAll();
      playSound("winner");
    }, 1200);
  }
}

function closeModal() {
  stopTimer();
  $("#questionModal").classList.add("hidden");
}

function adjustScore(index, delta, rerender = true) {
  state.teams[index].points = Math.max(0, state.teams[index].points + delta);
  saveState();
  if (rerender) renderScores();
}

function resetScore(index) {
  state.teams[index].points = 0;
  saveState();
  renderScores();
}

function nextTurn() {
  if (!state.teams.length) return;
  state.currentTeam = (state.currentTeam + 1) % state.teams.length;
  saveState();
  renderScores();
  renderTurn();
  renderWindPhrase();
  windBurst();
}

function renderWinner() {
  const winner = [...state.teams].sort((a, b) => b.points - a.points)[0];
  $("#winnerName").textContent = winner?.name || "toda la clase";
}

async function toggleSound() {
  state.sound = !state.sound;
  $("#soundToggle").textContent = state.sound ? "Desactivar sonido" : "Activar sonido";
  saveState();
  if (state.sound) await playSound("viento");
}

async function playSound(name) {
  if (!state.sound || !sounds[name]) return;
  try {
    sounds[name].currentTime = 0;
    await sounds[name].play();
  } catch {
    // El juego continua aunque el navegador bloquee el audio.
  }
}

function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  } catch {
    // Pantalla completa es opcional.
  }
}

function turboFan() {
  $("#floatingFan").classList.add("turbo");
  playSound("whooshes");
  windBurst();
  setTimeout(() => $("#floatingFan").classList.remove("turbo"), 1300);
}

function confetti() {
  const layer = $("#confettiLayer");
  const colors = ["#ff6b5f", "#ffd166", "#17bebb", "#8b5cf6", "#52d273"];
  for (let i = 0; i < 42; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 1300);
  }
}

function windBurst() {
  const layer = $("#windLayer");
  for (let i = 0; i < 8; i += 1) {
    const gust = document.createElement("span");
    gust.className = "gust";
    gust.style.top = `${20 + Math.random() * 60}%`;
    gust.style.animationDelay = `${Math.random() * 0.25}s`;
    layer.appendChild(gust);
    setTimeout(() => gust.remove(), 1100);
  }
}

function resetEverything() {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, {
    screen: "start",
    teams: [],
    currentTeam: 0,
    board: [],
    completed: [],
    sound: false,
    starterDrawn: null
  });
  $("#teamCount").value = "2";
  $("#starterResult").textContent = "";
  renderTeamInputs();
  renderAll();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
