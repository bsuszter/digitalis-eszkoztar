const data = window.DIGISULI_DATA;
const screen = document.getElementById('screen');
const steps = [...document.querySelectorAll('.step')];
const liveScore = document.getElementById('liveScore');
const scoreFill = document.getElementById('scoreFill');

const state = {
  stage: 0,
  maxStage: 0,
  systemIndex: 0,
  appIndex: 0,
  storageIndex: 0,
  score: 0,
  systemAttempts: [],
  appAttempts: [],
  storageAttempts: [],
  teamsOrder: [],
  teamsDisplayOrder: [2, 5, 0, 4, 1, 3]
};

function updateProgress(activeStage = state.stage) {
  steps.forEach((step, index) => {
    step.classList.toggle('is-active', index === activeStage);
    step.classList.toggle('is-done', index < state.maxStage || (state.maxStage === 5 && index === 5));
    step.disabled = index > state.maxStage;
  });
  liveScore.textContent = state.score;
  scoreFill.style.width = `${(state.score / 12) * 100}%`;
  document.body.dataset.stage = String(activeStage);
}

function setStage(stage) {
  state.stage = stage;
  state.maxStage = Math.max(state.maxStage, stage);
  updateProgress(stage);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

steps.forEach((step, index) => {
  step.addEventListener('click', () => {
    if (index > state.maxStage || index === state.stage) return;
    state.stage = index;
    updateProgress(index);
    render();
  });
});

function render() {
  if (state.stage === 0) renderIntro();
  if (state.stage === 1) renderSystem();
  if (state.stage === 2) renderApp();
  if (state.stage === 3) renderStorage();
  if (state.stage === 4) renderTeams();
  if (state.stage === 5) renderSummary();
}

function renderIntro() {
  screen.innerHTML = `
    <div class="title-strip">🚀 Indulás</div>
    <div class="intro-grid">
      <div>
        <h2>Egy digitális iskolai nap térképe</h2>
        <p class="lead">A számítógépet és a telefont operációs rendszer működteti. Az alkalmazásokkal dolgozol, a fájlokat helyben vagy felhőben tárolod, a Teamsben pedig megkeresed és beadod az iskolai feladatokat.</p>
      </div>
      <aside class="map-card">
        <span>💻📱 Eszköz és operációs rendszer</span>
        <span>🧰 Alkalmazás</span>
        <span>☁️ Fájl és tárolási hely</span>
        <span>👥 Teams-feladat</span>
      </aside>
    </div>
    <div class="concept-grid">
      <article class="concept-card"><span>⚙️</span><h3>Operációs rendszer</h3><p>Az eszköz alapvető működését irányítja, és lehetővé teszi az alkalmazások használatát.</p></article>
      <article class="concept-card"><span>🧩</span><h3>Alkalmazás</h3><p>Egy adott feladatra használható program, például Word vagy Teams.</p></article>
      <article class="concept-card"><span>☁️</span><h3>Felhő</h3><p>Interneten elérhető tárhely és szolgáltatás, amelyet több eszközről is használhatsz.</p></article>
      <article class="concept-card"><span>🔐</span><h3>Iskolai fiók</h3><p>Ezzel éred el az iskola által biztosított alkalmazásokat és saját fájljaidat.</p></article>
    </div>
    <div class="actions"><button class="primary" id="start">Kezdjük! →</button></div>`;
  document.getElementById('start').addEventListener('click', () => setStage(1));
}

function answerButtons(answers) {
  return answers.map((answer, index) => `<button class="answer" data-index="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('');
}

function renderSystem() {
  const item = data.systems[state.systemIndex];
  screen.innerHTML = `
    <div class="title-strip">⚙️ Mi működteti? ${state.systemIndex + 1}/${data.systems.length}</div>
    <div class="device-card"><strong>${item.device}</strong></div>
    <h2>${item.question}</h2>
    <div class="answer-list">${answerButtons(item.answers)}</div>
    <div id="feedback"></div>`;
  bindAnswers(selected => checkQuestion('system', item, selected, data.systems, 2));
}

function renderApp() {
  const item = data.apps[state.appIndex];
  screen.innerHTML = `
    <div class="title-strip">🧰 Melyik alkalmazás? ${state.appIndex + 1}/${data.apps.length}</div>
    <div class="task-card"><strong>${item.task}</strong></div>
    <h2>Melyik alkalmazást választanád?</h2>
    <div class="answer-list">${answerButtons(item.answers)}</div>
    <div id="feedback"></div>`;
  bindAnswers(selected => checkQuestion('app', item, selected, data.apps, 3));
}

function renderStorage() {
  const item = data.storage[state.storageIndex];
  screen.innerHTML = `
    <div class="title-strip">☁️ Hol van a fájl? ${state.storageIndex + 1}/${data.storage.length}</div>
    <div class="statement-card">${item.statement}</div>
    <h2>Igaz vagy hamis?</h2>
    <div class="answer-list">
      <button class="answer" data-value="true"><span>✓</span>Igaz</button>
      <button class="answer" data-value="false"><span>×</span>Hamis</button>
    </div>
    <div id="feedback"></div>`;
  document.querySelectorAll('[data-value]').forEach(button => {
    button.addEventListener('click', () => checkBoolean(item, button.dataset.value === 'true'));
  });
}

function bindAnswers(handler) {
  document.querySelectorAll('.answer[data-index]').forEach(button => {
    button.addEventListener('click', () => handler(Number(button.dataset.index)));
  });
}

function checkQuestion(type, item, selected, list, nextStage) {
  const indexKey = `${type}Index`;
  const attemptsKey = `${type}Attempts`;
  const currentIndex = state[indexKey];
  state[attemptsKey][currentIndex] = (state[attemptsKey][currentIndex] || 0) + 1;

  if (selected !== item.correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Gondold át újra! Mi irányítja az eszköz működését, illetve melyik alkalmazás mire való?</div>';
    return;
  }

  if (state[attemptsKey][currentIndex] === 1) state.score += 1;
  updateProgress(state.stage);
  document.querySelectorAll('.answer').forEach(button => button.disabled = true);
  const isLast = currentIndex + 1 === list.length;
  document.getElementById('feedback').innerHTML = `
    <div class="feedback good"><strong>Rendben!</strong> ${item.feedback}</div>
    <div class="actions"><button class="primary" id="next">${isLast ? 'Következő állomás →' : 'Következő →'}</button></div>`;
  document.getElementById('next').addEventListener('click', () => {
    if (isLast) setStage(nextStage);
    else {
      state[indexKey] += 1;
      render();
    }
  });
}

function checkBoolean(item, selected) {
  const currentIndex = state.storageIndex;
  state.storageAttempts[currentIndex] = (state.storageAttempts[currentIndex] || 0) + 1;
  if (selected !== item.correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Nem egészen. Gondold át, hogy a fájl csak azon a gépen van-e, vagy felhőben tárolódik!</div>';
    return;
  }
  if (state.storageAttempts[currentIndex] === 1) state.score += 1;
  updateProgress(3);
  document.querySelectorAll('.answer').forEach(button => button.disabled = true);
  const isLast = currentIndex + 1 === data.storage.length;
  document.getElementById('feedback').innerHTML = `
    <div class="feedback good"><strong>Rendben!</strong> ${item.feedback}</div>
    <div class="actions"><button class="primary" id="next">${isLast ? 'Következő állomás →' : 'Következő →'}</button></div>`;
  document.getElementById('next').addEventListener('click', () => {
    if (isLast) setStage(4);
    else {
      state.storageIndex += 1;
      render();
    }
  });
}

function renderTeams() {
  const selected = new Set(state.teamsOrder);
  screen.innerHTML = `
    <div class="title-strip">👥 Teams-útvonal</div>
    <h2>Rakd helyes sorrendbe a feladat beadásának lépéseit!</h2>
    <p class="lead">A kártyák szándékosan össze vannak keverve. Kattints rájuk abban a sorrendben, ahogyan végrehajtanád őket. Újabb kattintással visszavonhatod a választást.</p>
    <div class="sequence-list">
      ${state.teamsDisplayOrder.map(index => `<button class="sequence-card ${selected.has(index) ? 'selected' : ''}" data-step-index="${index}"><b>${selected.has(index) ? state.teamsOrder.indexOf(index) + 1 : '?'}</b><span>${data.teamsSteps[index]}</span></button>`).join('')}
    </div>
    <div id="feedback"></div>
    <div class="actions"><button class="primary" id="checkOrder">Ellenőrzés</button></div>`;

  document.querySelectorAll('[data-step-index]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.stepIndex);
      if (state.teamsOrder.includes(index)) state.teamsOrder = state.teamsOrder.filter(item => item !== index);
      else state.teamsOrder.push(index);
      renderTeams();
    });
  });
  document.getElementById('checkOrder').addEventListener('click', checkTeamsOrder);
}

function checkTeamsOrder() {
  if (state.teamsOrder.length !== data.teamsSteps.length) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Minden lépést helyezz sorrendbe!</div>';
    return;
  }
  const correct = state.teamsOrder.every((value, index) => value === index);
  if (!correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">A folyamat még nem jó. Előbb lépj be és keresd meg a feladatot, csak ezután dolgozz és add be!</div>';
    return;
  }
  state.score += 2;
  updateProgress(4);
  document.querySelectorAll('.sequence-card, #checkOrder').forEach(button => button.disabled = true);
  document.getElementById('feedback').innerHTML = `
    <div class="feedback good"><strong>Kész!</strong> A beadás előtt mindig ellenőrizd a fiókot, az utasítást, a határidőt és a mentést.</div>
    <div class="actions"><button class="primary" id="finish">Tovább az iránytűhöz →</button></div>`;
  document.getElementById('finish').addEventListener('click', () => setStage(5));
}

function renderSummary() {
  screen.innerHTML = `
    <div class="title-strip">🧭 Digitális iskolai iránytű</div>
    <div class="final-score">
      <div class="score-circle">${state.score}/12</div>
      <div><h2>Most már látod az egész folyamatot</h2><p class="lead">Az eszközt az operációs rendszer működteti, az alkalmazással elkészíted a munkát, a fájlt megfelelő helyen tárolod, majd a Teamsben beadod.</p></div>
    </div>
    <div class="summary-grid">
      <article><span>⚙️</span><h3>Rendszer</h3><p>A Windows, Android és iOS operációs rendszer; a Word és a Teams alkalmazás.</p></article>
      <article><span>🧰</span><h3>Jó eszköz</h3><p>A feladathoz illő alkalmazást válaszd: Word, PowerPoint, Forms vagy más megfelelő program.</p></article>
      <article><span>☁️</span><h3>Jó hely</h3><p>Tudd, hogy a fájl a gépen vagy a felhőben található, és ellenőrizd a mentést.</p></article>
      <article><span>👥</span><h3>Jó fiók</h3><p>A Teamsben mindig a megfelelő iskolai fiókkal, csapatban és feladatban dolgozz.</p></article>
    </div>
    <div class="actions"><button class="secondary" id="restart">↺ Újrakezdem</button></div>`;
  document.getElementById('restart').addEventListener('click', () => location.reload());
}

updateProgress();
render();
