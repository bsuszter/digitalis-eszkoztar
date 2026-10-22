const data = window.DIGITASKA_DATA;
const screen = document.getElementById('screen');
const steps = [...document.querySelectorAll('.step')];
const liveScore = document.getElementById('liveScore');
const scoreFill = document.getElementById('scoreFill');
const MAX_SCORE = 16;

const state = {
  stage: 0,
  maxStage: 0,
  identifyIndex: 0,
  sortingIndex: 0,
  routeIndex: 0,
  score: 0,
  identifyAttempts: [],
  sortingAttempts: [],
  routeAttempts: [],
  solvedIdentify: [],
  solvedSorting: [],
  solvedRoutes: [],
  selectedFolders: []
};

function updateProgress(activeStage = state.stage) {
  steps.forEach((step, index) => {
    step.classList.toggle('is-active', index === activeStage);
    step.classList.toggle('is-done', index < state.maxStage || (state.maxStage === 5 && index === 5));
    step.disabled = index > state.maxStage;
  });
  liveScore.textContent = state.score;
  scoreFill.style.width = `${(state.score / MAX_SCORE) * 100}%`;
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
    renderReview(index);
    updateProgress(index);
  });
});

function render() {
  if (state.stage === 0) renderIntro();
  if (state.stage === 1) renderIdentify();
  if (state.stage === 2) renderSorting();
  if (state.stage === 3) renderRoute();
  if (state.stage === 4) renderBuilding();
  if (state.stage === 5) renderSummary();
}

function conceptCard(item) {
  return `<article class="concept-card"><div class="concept-icon">${item.icon}</div><h3>${item.title}</h3><p>${item.text}</p></article>`;
}

function renderIntro() {
  screen.innerHTML = `
    <div class="title-strip">🚀 Indulás</div>
    <div class="intro-layout">
      <div>
        <h2>A digitális rend nem dísz – időt takarít meg</h2>
        <p class="lead">Egy jól elnevezett mappában később is megtalálod a munkádat. A küldetésben felismered a fájlokat és mappákat, rendet raksz, útvonalakat olvasol, majd megtervezed a saját digitális iskolatáskádat.</p>
      </div>
      <aside class="route-card"><strong>Az útvonalad</strong><span>4 felismerés</span><span>4 rendezés</span><span>4 útvonal és kapcsolat</span><span>1 mappaépítés</span></aside>
    </div>
    <figure class="intro-illustration"><img src="pic07.png" alt="Tanulók digitális mappákba rendezik az iskolai fájlokat"></figure>
    <div class="concept-grid">${data.concepts.map(conceptCard).join('')}</div>
    <div class="actions"><button class="primary" id="start">Nyisd ki az iskolatáskát! →</button></div>`;
  document.getElementById('start').addEventListener('click', () => setStage(1));
}

function renderIdentify() {
  const item = data.identify[state.identifyIndex];
  screen.innerHTML = `
    <div class="title-strip">🔎 Mi micsoda? ${state.identifyIndex + 1}/${data.identify.length}</div>
    <div class="object-card">${item.object}</div>
    <h2>${item.question}</h2>
    <div class="answer-list">${item.answers.map((answer, index) => `<button class="answer" data-index="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('')}</div>
    <div id="feedback"></div>`;
  bindAnswers(selected => checkStandard('identify', item, selected));
}

function renderSorting() {
  const item = data.sorting[state.sortingIndex];
  screen.innerHTML = `
    <div class="title-strip">🧺 Rakj rendet! ${state.sortingIndex + 1}/${data.sorting.length}</div>
    <div class="file-to-sort"><span>${item.file}</span><small>Melyik mappába tennéd?</small></div>
    <div class="folder-grid">${item.folders.map((folder, index) => `<button class="folder-choice" data-index="${index}"><span>📁</span><strong>${folder}</strong></button>`).join('')}</div>
    <div id="feedback"></div>`;
  document.querySelectorAll('.folder-choice').forEach(button => button.addEventListener('click', () => checkStandard('sorting', item, Number(button.dataset.index))));
}

function hierarchyMarkup(hierarchy) {
  return `
    <div class="folder-tree" aria-label="Mappaszerkezet">
      <div class="tree-root"><span>📁</span><strong>${hierarchy.root}</strong></div>
      <div class="tree-branches">
        ${hierarchy.branches.map(branch => `
          <section class="tree-branch">
            <div class="tree-parent"><span>📁</span><strong>${branch.name}</strong></div>
            <div class="tree-children">
              ${branch.children.map(child => `<div class="tree-child"><span>📁</span>${child}</div>`).join('')}
            </div>
          </section>`).join('')}
      </div>
    </div>`;
}

function renderRoute() {
  const item = data.routes[state.routeIndex];
  const visual = item.type === 'hierarchy'
    ? hierarchyMarkup(item.hierarchy)
    : `<div class="path-strip">${item.tree.map((part, index) => `<span>${index === item.tree.length - 1 ? '📄' : index === 0 ? '💾' : '📁'} ${part}</span>${index < item.tree.length - 1 ? '<b>›</b>' : ''}`).join('')}</div>`;

  screen.innerHTML = `
    <div class="title-strip">🧭 Útvonalak ${state.routeIndex + 1}/${data.routes.length}</div>
    ${visual}
    <h2>${item.question}</h2>
    <div class="answer-list">${item.answers.map((answer, index) => `<button class="answer" data-index="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('')}</div>
    <div id="feedback"></div>`;
  bindAnswers(selected => checkStandard('route', item, selected));
}

function bindAnswers(handler) {
  document.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => handler(Number(button.dataset.index))));
}

function checkStandard(type, item, selected) {
  const indexKey = `${type}Index`;
  const attemptsKey = `${type}Attempts`;
  const solvedKey = type === 'route' ? 'solvedRoutes' : type === 'sorting' ? 'solvedSorting' : 'solvedIdentify';
  const currentIndex = state[indexKey];
  state[attemptsKey][currentIndex] = (state[attemptsKey][currentIndex] || 0) + 1;

  if (selected !== item.correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Gondold át újra! Figyeld meg, melyik elem melyik alatt helyezkedik el.</div>';
    return;
  }

  if (state[attemptsKey][currentIndex] === 1) state.score += 1;
  state[solvedKey][currentIndex] = true;
  updateProgress(state.stage);
  document.querySelectorAll('.answer, .folder-choice').forEach(button => button.disabled = true);

  const list = type === 'identify' ? data.identify : type === 'sorting' ? data.sorting : data.routes;
  const isLast = currentIndex + 1 === list.length;
  const nextStage = type === 'identify' ? 2 : type === 'sorting' ? 3 : 4;
  document.getElementById('feedback').innerHTML = `
    <div class="feedback good"><strong>Rendben!</strong> ${item.feedback}</div>
    <div class="actions"><button class="primary" id="next">${isLast ? 'Következő állomás →' : 'Következő →'}</button></div>`;

  document.getElementById('next').addEventListener('click', () => {
    if (isLast) setStage(nextStage);
    else {
      state[indexKey] += 1;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function renderBuilding() {
  const selected = new Set(state.selectedFolders);
  screen.innerHTML = `
    <div class="title-strip">🏗️ Építs mappaszerkezetet!</div>
    <div class="builder-layout">
      <div>
        <h2>${data.building.task}</h2>
        <p class="lead">Pontosan négy mappát válassz! A képre kattintva beteheted vagy kiveheted az iskolatáskából.</p>
        <div class="folder-grid builder">${data.building.folders.map(folder => `<button class="folder-choice ${selected.has(folder) ? 'selected' : ''}" data-folder="${folder}"><span>📁</span><strong>${folder}</strong></button>`).join('')}</div>
      </div>
      <aside class="bag-preview"><div class="bag-icon">🎒</div><strong>Saját név</strong><div id="chosenFolders">${state.selectedFolders.map(folder => `<span>📁 ${folder}</span>`).join('') || '<small>Még üres</small>'}</div></aside>
    </div>
    <div id="selectionCount" class="selection-count">${state.selectedFolders.length} / 4 kiválasztva</div>
    <div id="feedback"></div>
    <div class="actions"><button class="primary" id="checkBuild">Ellenőrzés</button></div>`;

  document.querySelectorAll('[data-folder]').forEach(button => button.addEventListener('click', () => {
    const folder = button.dataset.folder;
    if (state.selectedFolders.includes(folder)) state.selectedFolders = state.selectedFolders.filter(item => item !== folder);
    else if (state.selectedFolders.length < 4) state.selectedFolders.push(folder);
    renderBuilding();
  }));
  document.getElementById('checkBuild').addEventListener('click', checkBuilding);
}

function checkBuilding() {
  if (state.selectedFolders.length !== 4) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Pontosan négy mappát válassz!</div>';
    return;
  }
  const correct = data.building.required.every(folder => state.selectedFolders.includes(folder));
  if (!correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">A Képek vagy a Videók hasznos almappa lehet, de most négy fő tantárgyi mappát keresünk.</div>';
    return;
  }
  state.score += 4;
  updateProgress(4);
  document.querySelectorAll('[data-folder], #checkBuild').forEach(button => button.disabled = true);
  document.getElementById('feedback').innerHTML = `
    <div class="feedback good"><strong>Kész a digitális iskolatáskád!</strong> A fő tantárgyak külön mappát kaptak, ezekbe később további almappákat is készíthetsz.</div>
    <div class="actions"><button class="primary" id="finish">Tovább az iránytűhöz →</button></div>`;
  document.getElementById('finish').addEventListener('click', () => setStage(5));
}

function renderReview(stage) {
  if (stage === 0) {
    renderIntro();
    return;
  }
  const titles = ['', 'Mi micsoda?', 'Rakj rendet!', 'Útvonalak', 'Építs!', 'Iránytű'];
  screen.innerHTML = `
    <div class="review-banner">👀 Korábbi rész megtekintése</div>
    <h2>${titles[stage]}</h2>
    <p class="lead">A már teljesített részt visszanézheted, de itt nem módosíthatod a válaszaidat.</p>
    <div class="review-list">${reviewContent(stage)}</div>
    <div class="actions"><button class="primary" id="continue">Vissza a folytatáshoz →</button></div>`;
  document.getElementById('continue').addEventListener('click', () => {
    updateProgress(state.stage);
    render();
  });
}

function reviewContent(stage) {
  if (stage === 1) return state.solvedIdentify.map((done, index) => done ? `<div>✓ ${data.identify[index].object} – ${data.identify[index].feedback}</div>` : '').join('') || 'Még nincs kész feladat.';
  if (stage === 2) return state.solvedSorting.map((done, index) => done ? `<div>✓ ${data.sorting[index].file} → ${data.sorting[index].folders[data.sorting[index].correct]}</div>` : '').join('') || 'Még nincs kész feladat.';
  if (stage === 3) return state.solvedRoutes.map((done, index) => done ? `<div>✓ ${data.routes[index].feedback}</div>` : '').join('') || 'Még nincs kész feladat.';
  if (stage === 4) return state.selectedFolders.length ? state.selectedFolders.map(folder => `<div>📁 ${folder}</div>`).join('') : 'Még nincs kész mappaszerkezet.';
  if (stage === 5) return '<div>Az összefoglaló a küldetés végén nyílik meg.</div>';
  return '';
}

function renderSummary() {
  screen.innerHTML = `
    <div class="title-strip">🎒 A digitális iskolatáska iránytűje</div>
    <div class="summary-hero"><div class="score">${state.score}<small>/16 pont</small></div><div><h2>Most már nemcsak elmented, hanem meg is találod</h2><p>A pontszám azt mutatja, hány feladatot oldottál meg első próbálkozásra. A mappaépítés négy pontot ért.</p></div></div>
    <div class="compass-grid">
      <article><span>📁</span><h3>Rendezz!</h3><p>Az összetartozó fájlok kerüljenek közös mappába.</p></article>
      <article><span>✏️</span><h3>Nevezz el!</h3><p>A jó név elárulja, mit találsz a mappában vagy fájlban.</p></article>
      <article><span>🧭</span><h3>Figyeld az útvonalat!</h3><p>Mindig tudd, melyik meghajtón és mappában dolgozol.</p></article>
      <article><span>💾</span><h3>Ments jó helyre!</h3><p>Ne csak a fájl neve legyen jó, hanem a mentési helye is.</p></article>
    </div>
    <section class="practical-card"><h2>🖥️ Most következik a valódi gépes feladat</h2><ol>${data.practicalChecklist.map(item => `<li>${item}</li>`).join('')}</ol></section>
    <div class="actions"><button class="secondary" id="restart">↺ Újrakezdem</button></div>`;
  document.getElementById('restart').addEventListener('click', () => location.reload());
}

updateProgress();
render();
