const data = window.ONLINE_ETIKETT_DATA;
const screen = document.getElementById('screen');
const steps = [...document.querySelectorAll('.step')];
const liveScore = document.getElementById('liveScore');
const scoreFill = document.getElementById('scoreFill');

const state = {
  stage: 0,
  maxStage: 0,
  scenarioIndex: 0,
  score: 0,
  attempts: [],
  solved: []
};

function chapterStartIndex(chapter) {
  return data.scenarios.findIndex(item => item.chapter === chapter);
}

function currentChapter() {
  return data.scenarios[state.scenarioIndex].chapter;
}

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
  if (stage >= 1 && stage <= 4) state.scenarioIndex = chapterStartIndex(stage - 1);
  updateProgress(stage);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

steps.forEach((step, index) => {
  step.addEventListener('click', () => {
    if (index > state.maxStage) return;
    if (index === 0) renderIntro(true);
    else if (index === 5 && state.maxStage === 5) renderSummary();
    else renderReview(index - 1);
    updateProgress(index);
  });
});

function principleCard(item) {
  return `<article class="principle-card"><div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.text}</p></article>`;
}

function render() {
  if (state.stage === 0) renderIntro(false);
  else if (state.stage >= 1 && state.stage <= 4) renderScenario();
  else renderSummary();
}

function renderIntro(reviewMode) {
  screen.innerHTML = `
    <div class="title-strip">🚀 Indulás</div>
    <div class="intro-copy">
      <div>
        <h2>Az online döntések ritkán fekete-fehérek</h2>
        <p class="lead">Néha több válasz is első pillantásra jónak tűnik. A feladatod nem a „tanáros mondat” megtalálása, hanem annak végiggondolása, melyik lépés állítja meg a problémát, védi az érintetteket és segít valóban tisztázni a helyzetet.</p>
      </div>
      <div class="route-card"><strong>4 fejezet · 12 helyzet</strong><span>Böngésző, cset, közösségi bejegyzés és AI-beszélgetés.</span></div>
    </div>
    <div class="principle-grid">${data.principles.map(principleCard).join('')}</div>
    <div class="actions"><button class="primary" id="start">${reviewMode ? 'Vissza a folytatáshoz →' : 'Kezdjük! →'}</button></div>`;

  document.getElementById('start').addEventListener('click', () => {
    if (reviewMode) {
      updateProgress(state.stage);
      render();
    } else setStage(1);
  });
}

function sceneMarkup(item) {
  if (item.type === 'chat') {
    return `<div class="phone-frame"><div class="phone-top">● ● ● <strong>${item.label}</strong></div><div class="chat-thread">${item.messages.map(([name, text], index) => `<div class="chat-row ${name === 'Te' ? 'mine' : ''}"><small>${name}</small><div class="bubble">${text}</div></div>`).join('')}</div></div>`;
  }
  if (item.type === 'post') {
    return `<div class="social-post"><div class="post-author"><span>👤</span><strong>${item.post.author}</strong></div><p>${item.post.text}</p><div class="post-media">📷</div><div class="post-stats">${item.post.reactions}</div></div>`;
  }
  if (item.type === 'ai') {
    return `<div class="ai-panel"><div class="ai-title">✨ AI-asszisztens</div><div class="prompt-bubble">${item.prompt}</div></div>`;
  }
  if (item.type === 'browser' || item.type === 'warning') {
    return `<div class="browser-window"><div class="browser-bar"><span></span><span></span><span></span><div>https://...</div></div><div class="browser-content ${item.type}"><div class="large-icon">${item.icon}</div><p>${item.scene}</p></div></div>`;
  }
  if (item.type === 'timeline') {
    return `<div class="timeline-card"><div><b>1.</b> Elküldöd</div><span>→</span><div><b>2.</b> Törlöd</div><span>→</span><div><b>3.</b> Képernyőkép marad</div></div><p class="scene-text">${item.scene}</p>`;
  }
  return `<div class="scene-card"><div class="large-icon">${item.icon}</div><p>${item.scene}</p></div>`;
}

function renderScenario() {
  const item = data.scenarios[state.scenarioIndex];
  const chapter = data.chapters[item.chapter];
  const numberInChapter = data.scenarios.filter((entry, index) => entry.chapter === item.chapter && index <= state.scenarioIndex).length;

  screen.innerHTML = `
    <div class="chapter-banner ${chapter.color}"><span>${chapter.icon}</span><div><small>${chapter.title}</small><strong>${numberInChapter}/3</strong></div></div>
    <div class="scenario-label">${item.label}</div>
    ${sceneMarkup(item)}
    <h2 class="question">${item.question}</h2>
    <div class="answer-list">
      ${item.answers.map((answer, index) => `<button class="answer" data-index="${index}"><span>${String.fromCharCode(65 + index)}</span><span>${answer}</span></button>`).join('')}
    </div>
    <div id="feedback"></div>`;

  document.querySelectorAll('.answer').forEach(button => {
    button.addEventListener('click', () => checkAnswer(Number(button.dataset.index)));
  });
}

function checkAnswer(selected) {
  const item = data.scenarios[state.scenarioIndex];
  state.attempts[state.scenarioIndex] = (state.attempts[state.scenarioIndex] || 0) + 1;

  if (selected !== item.correct) {
    const wrongIndex = selected < item.correct ? selected : selected - 1;
    document.getElementById('feedback').innerHTML = `<div class="feedback bad"><strong>Majdnem meggyőző, de…</strong> ${item.wrong[wrongIndex]}</div>`;
    return;
  }

  if (state.attempts[state.scenarioIndex] === 1) state.score += 1;
  state.solved[state.scenarioIndex] = true;
  updateProgress(state.stage);
  document.querySelectorAll('.answer').forEach(button => button.disabled = true);

  const nextItem = data.scenarios[state.scenarioIndex + 1];
  const chapterEnds = !nextItem || nextItem.chapter !== item.chapter;
  document.getElementById('feedback').innerHTML = `
    <div class="feedback good"><strong>Ez állítja meg legjobban a helyzetet.</strong> ${item.feedback}</div>
    <div class="actions"><button class="primary" id="next">${chapterEnds ? (item.chapter === 3 ? 'Tovább az iránytűhöz →' : 'Következő fejezet →') : 'Következő helyzet →'}</button></div>`;

  document.getElementById('next').addEventListener('click', () => {
    if (state.scenarioIndex + 1 >= data.scenarios.length) {
      setStage(5);
      return;
    }
    state.scenarioIndex += 1;
    const newStage = data.scenarios[state.scenarioIndex].chapter + 1;
    state.stage = newStage;
    state.maxStage = Math.max(state.maxStage, newStage);
    updateProgress(newStage);
    renderScenario();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function renderReview(chapterIndex) {
  const chapter = data.chapters[chapterIndex];
  const items = data.scenarios.map((item, index) => ({ item, index })).filter(entry => entry.item.chapter === chapterIndex && state.solved[entry.index]);
  screen.innerHTML = `
    <div class="chapter-banner ${chapter.color}"><span>${chapter.icon}</span><div><small>Korábbi fejezet</small><strong>${chapter.title}</strong></div></div>
    <h2>A már megoldott helyzetek tanulságai</h2>
    <div class="review-grid">${items.length ? items.map(({ item }) => `<article><span>${item.icon}</span><div><strong>${item.label}</strong><p>${item.feedback}</p></div></article>`).join('') : '<p>Még nincs megoldott helyzet ebben a fejezetben.</p>'}</div>
    <div class="actions"><button class="primary" id="continue">Vissza a folytatáshoz →</button></div>`;
  document.getElementById('continue').addEventListener('click', () => {
    updateProgress(state.stage);
    render();
  });
}

function renderSummary() {
  screen.innerHTML = `
    <div class="title-strip">🌐 Online iránytű</div>
    <div class="summary-hero">
      <div class="score">${state.score}<small>/12 pont</small></div>
      <div><h2>Nem a kulcsszót kerested, hanem mérlegeltél</h2><p>A jó döntésben a segítségkérés, a bizonyíték megőrzése, a terjesztés leállítása és a másik ember szempontja együtt számíthat.</p></div>
    </div>
    <div class="compass-grid">
      <article><span>⏸️</span><h3>Állj meg!</h3><p>Ne a csoport nyomása vagy az első indulat döntsön.</p></article>
      <article><span>🛑</span><h3>Ne növeld a kárt!</h3><p>Ne kattints tovább, ne vágj vissza, ne küldd körbe.</p></article>
      <article><span>🧾</span><h3>Őrizd meg, ami kell!</h3><p>A bizonyítékot tartsd meg, de ne terjeszd feleslegesen.</p></article>
      <article><span>🧑‍🏫</span><h3>Kérj megfelelő segítséget!</h3><p>Mondd el pontosan, mi történt és mit tettél eddig.</p></article>
      <article><span>🧭</span><h3>Vállald a részedet!</h3><p>A továbbküldés, reakció és hallgatás is lehet döntés.</p></article>
    </div>
    <div class="feedback good"><strong>Az online térben sem kell mindent egyedül megoldanod.</strong> A cél az, hogy úgy kérj segítséget, közben ne súlyosbítsd a helyzetet.</div>
    <div class="actions"><button class="secondary" id="restart">↺ Újrakezdem</button></div>`;
  document.getElementById('restart').addEventListener('click', () => location.reload());
}

updateProgress();
render();
