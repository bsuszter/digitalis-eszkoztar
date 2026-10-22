const data = window.TEREMREND_DATA;
const screen = document.getElementById('screen');
const steps = [...document.querySelectorAll('.step')];

const state = {
  stage: 0,
  maxStage: 0,
  reviewStage: null,
  sentenceIndex: 0,
  consequenceIndex: 0,
  scenarioIndex: 0,
  score: 0,
  sentenceAttempts: [],
  consequenceAttempts: [],
  scenarioAttempts: [],
  solvedSentences: [],
  solvedConsequences: [],
  solvedScenarios: [],
  commitments: []
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function updateProgress(activeStage = state.stage) {
  steps.forEach((step, index) => {
    step.classList.toggle('is-active', index === activeStage);
    step.classList.toggle('is-done', index < state.maxStage || (index === 5 && state.maxStage === 5));
    step.disabled = index > state.maxStage;
    step.title = index <= state.maxStage ? 'Kattints a rész megnyitásához' : 'Ez a rész még nem érhető el';
  });
}

function setStage(stage) {
  state.stage = stage;
  state.reviewStage = null;
  state.maxStage = Math.max(state.maxStage, stage);
  document.body.dataset.stage = String(stage);
  updateProgress(stage);
  render();
}

function openReview(stage) {
  if (stage === state.stage) {
    state.reviewStage = null;
    render();
    return;
  }
  if (stage > state.maxStage) return;
  state.reviewStage = stage;
  document.body.dataset.stage = String(stage);
  updateProgress(stage);
  renderReview(stage);
}

steps.forEach((step, index) => {
  step.addEventListener('click', () => openReview(index));
});

function render() {
  if (state.reviewStage !== null) {
    renderReview(state.reviewStage);
    return;
  }
  if (state.stage === 0) renderIntro();
  if (state.stage === 1) renderSentence();
  if (state.stage === 2) renderConsequence();
  if (state.stage === 3) renderScenario();
  if (state.stage === 4) renderCommitments();
  if (state.stage === 5) renderSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function continueButton() {
  return `<div class="actions"><button class="primary" id="continue">Vissza a folytatáshoz →</button></div>`;
}

function renderReview(stage) {
  const titles = ['Indulás', 'Szabályépítő', 'Mi történhet?', 'Helyzetek', 'Vállalásaink', 'Géptermi iránytű'];
  let content = '';

  if (stage === 0) {
    content = `<div class="principle-grid">${data.principles.map(item => principleCard(item)).join('')}</div>`;
  }
  if (stage === 1) {
    content = `<div class="review-list">${state.solvedSentences.map((_, index) => `<article><span>${index + 1}</span><p>${data.sentences[index].parts.join(' ')}</p></article>`).join('')}</div>`;
  }
  if (stage === 2) {
    content = `<div class="review-list">${state.solvedConsequences.map((_, index) => `<article><span>${index + 1}</span><div><strong>${data.consequences[index].title}</strong><p>${data.consequences[index].feedback}</p></div></article>`).join('')}</div>`;
  }
  if (stage === 3) {
    content = `<div class="review-list">${state.solvedScenarios.map((_, index) => `<article><span>${index + 1}</span><div><strong>${data.scenarios[index].question}</strong><p>${data.scenarios[index].feedback}</p></div></article>`).join('')}</div>`;
  }
  if (stage === 4) {
    content = state.commitments.length
      ? `<div class="chosen-list">${state.commitments.map(item => `<div>✓ ${item}</div>`).join('')}</div>`
      : '<p class="lead">Ezt a részt még nem fejezted be.</p>';
  }
  if (stage === 5) {
    state.reviewStage = null;
    state.stage = 5;
    renderSummary();
    return;
  }

  screen.innerHTML = `
    <div class="review-banner">👀 Korábbi rész megtekintése</div>
    <h2>${titles[stage]}</h2>
    <p class="muted">A már teljesített részeket visszanézheted, de itt már nem módosíthatod a válaszaidat.</p>
    ${content || '<p class="lead">Ebben a részben még nincs megtekinthető eredmény.</p>'}
    ${continueButton()}`;
  document.getElementById('continue').addEventListener('click', () => {
    state.reviewStage = null;
    document.body.dataset.stage = String(state.stage);
    updateProgress(state.stage);
    render();
  });
}

function principleCard(item) {
  return `<article class="principle-card"><div class="icon">${item.icon}</div><h3>${item.title}</h3><p>${item.text}</p></article>`;
}

function renderIntro() {
  screen.innerHTML = `
    <div class="title-strip">🚀 Indulás</div>
    <div class="intro-layout">
      <div>
        <h2>Öt irányelv segít eligazodni</h2>
        <p class="lead">A következő feladatokban szabályokat építesz, következményeket gondolsz végig, majd valódi géptermi helyzetekben döntesz.</p>
      </div>
      <div class="route-card"><strong>Az útvonalad</strong><span>8 szabályépítő</span><span>3 következmény</span><span>6 helyzet</span><span>2 közös vállalás</span></div>
    </div>
    <div class="principle-grid">${data.principles.map(item => principleCard(item)).join('')}</div>
    <div class="actions end"><button class="primary" id="start">Kezdjük! →</button></div>`;
  document.getElementById('start').addEventListener('click', () => setStage(1));
}

function renderSentence() {
  const item = data.sentences[state.sentenceIndex];
  const shuffled = shuffle(item.parts.map((text, index) => ({ text, index })));
  state.currentOrder = [];
  state.currentPool = shuffled;

  screen.innerHTML = `
    <div class="title-strip">🧩 Szabályépítő ${state.sentenceIndex + 1}/${data.sentences.length}</div>
    <div class="category-chip">${item.category}</div>
    <h2>Rakd össze a szabályt!</h2>
    <p class="lead">Kattints a mondatrészekre a helyes sorrendben. A felső sorból vissza is teheted őket.</p>
    <div id="sentenceLine" class="sentence-line" aria-label="Összeállított mondat"></div>
    <div id="wordBank" class="word-bank" aria-label="Választható mondatrészek"></div>
    <div id="feedback"></div>
    <div class="actions"><button class="secondary" id="reset">↺ Újrakezdem</button><button class="primary" id="check">Ellenőrzés</button></div>`;

  drawWords();
  document.getElementById('reset').addEventListener('click', renderSentence);
  document.getElementById('check').addEventListener('click', checkSentence);
}

function drawWords() {
  const line = document.getElementById('sentenceLine');
  const bank = document.getElementById('wordBank');
  line.innerHTML = state.currentOrder.map(item => `<button class="word selected" data-index="${item.index}">${item.text}</button>`).join('');
  bank.innerHTML = state.currentPool.map(item => `<button class="word" data-index="${item.index}">${item.text}</button>`).join('');

  bank.querySelectorAll('.word').forEach(button => button.addEventListener('click', () => {
    const itemIndex = state.currentPool.findIndex(item => item.index === Number(button.dataset.index));
    state.currentOrder.push(state.currentPool.splice(itemIndex, 1)[0]);
    drawWords();
  }));
  line.querySelectorAll('.word').forEach(button => button.addEventListener('click', () => {
    const itemIndex = state.currentOrder.findIndex(item => item.index === Number(button.dataset.index));
    state.currentPool.push(state.currentOrder.splice(itemIndex, 1)[0]);
    drawWords();
  }));
}

function checkSentence() {
  const item = data.sentences[state.sentenceIndex];
  const feedback = document.getElementById('feedback');
  if (state.currentOrder.length !== item.parts.length) {
    feedback.innerHTML = '<div class="feedback bad">Még nem használtad fel az összes mondatrészt.</div>';
    return;
  }
  state.sentenceAttempts[state.sentenceIndex] = (state.sentenceAttempts[state.sentenceIndex] || 0) + 1;
  const correct = state.currentOrder.every((part, index) => part.index === index);
  if (!correct) {
    feedback.innerHTML = '<div class="feedback bad">Még nem jó a sorrend. Cserélj fel néhány mondatrészt!</div>';
    return;
  }
  if (state.sentenceAttempts[state.sentenceIndex] === 1) state.score += 1;
  state.solvedSentences[state.sentenceIndex] = true;
  document.querySelectorAll('.word').forEach(button => button.disabled = true);
  const check = document.getElementById('check');
  check.textContent = state.sentenceIndex + 1 === data.sentences.length ? 'Tovább →' : 'Következő szabály →';
  check.onclick = () => {
    if (state.sentenceIndex + 1 < data.sentences.length) {
      state.sentenceIndex += 1;
      renderSentence();
    } else setStage(2);
  };
  feedback.innerHTML = `<div class="feedback good"><strong>Helyes!</strong> ${item.parts.join(' ')}</div>`;
}

function renderConsequence() {
  const item = data.consequences[state.consequenceIndex];
  screen.innerHTML = `
    <div class="title-strip">🔎 Mi történhet? ${state.consequenceIndex + 1}/${data.consequences.length}</div>
    <article class="situation-card"><div class="scene-icon">⚠️</div><div><strong>Helyzet</strong><h2>${item.title}</h2></div></article>
    <h3>${item.question}</h3>
    <div class="answer-list">${item.answers.map((answer, index) => `<button class="answer" data-index="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('')}</div>
    <div id="feedback"></div>`;
  document.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => checkConsequence(Number(button.dataset.index))));
}

function checkConsequence(selected) {
  const item = data.consequences[state.consequenceIndex];
  state.consequenceAttempts[state.consequenceIndex] = (state.consequenceAttempts[state.consequenceIndex] || 0) + 1;
  if (selected !== item.correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Ez nem a legfontosabb következmény. Gondold át újra!</div>';
    return;
  }
  if (state.consequenceAttempts[state.consequenceIndex] === 1) state.score += 1;
  state.solvedConsequences[state.consequenceIndex] = true;
  document.querySelectorAll('.answer').forEach(button => button.disabled = true);
  document.getElementById('feedback').innerHTML = `<div class="feedback good">${item.feedback}</div><div class="actions end"><button class="primary" id="nextConsequence">${state.consequenceIndex + 1 === data.consequences.length ? 'Tovább a helyzetekhez →' : 'Következő →'}</button></div>`;
  document.getElementById('nextConsequence').addEventListener('click', () => {
    if (state.consequenceIndex + 1 < data.consequences.length) {
      state.consequenceIndex += 1;
      renderConsequence();
    } else setStage(3);
  });
}

function renderScenario() {
  const item = data.scenarios[state.scenarioIndex];
  const multi = item.type === 'multi';
  screen.innerHTML = `
    <div class="title-strip">🎯 Helyzetek ${state.scenarioIndex + 1}/${data.scenarios.length}</div>
    <div class="task-badge">${item.badge}</div>
    <h2>${item.question}</h2>
    ${multi ? '<p class="muted">Több válasz is helyes. Jelöld meg az összes szükséges választ!</p>' : ''}
    <div class="answer-list ${multi ? 'multi' : ''}">${item.answers.map((answer, index) => multi
      ? `<label class="check-answer"><input type="checkbox" value="${index}"><span>${answer}</span></label>`
      : `<button class="answer" data-index="${index}"><span>${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('')}</div>
    <div id="feedback"></div>
    ${multi ? '<div class="actions end"><button class="primary" id="checkMulti">Ellenőrzés</button></div>' : ''}`;

  if (multi) document.getElementById('checkMulti').addEventListener('click', checkMultiScenario);
  else document.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => checkSingleScenario(Number(button.dataset.index))));
}

function finishScenario(correct) {
  const item = data.scenarios[state.scenarioIndex];
  if (correct && state.scenarioAttempts[state.scenarioIndex] === 1) state.score += 1;
  state.solvedScenarios[state.scenarioIndex] = true;
  document.querySelectorAll('button.answer, .check-answer input').forEach(control => control.disabled = true);
  const existing = document.getElementById('checkMulti');
  if (existing) existing.disabled = true;
  document.getElementById('feedback').innerHTML = `<div class="feedback good">${item.feedback}</div><div class="actions end"><button class="primary" id="nextScenario">${state.scenarioIndex + 1 === data.scenarios.length ? 'Tovább →' : 'Következő helyzet →'}</button></div>`;
  document.getElementById('nextScenario').addEventListener('click', () => {
    if (state.scenarioIndex + 1 < data.scenarios.length) {
      state.scenarioIndex += 1;
      renderScenario();
    } else setStage(4);
  });
}

function checkSingleScenario(selected) {
  const item = data.scenarios[state.scenarioIndex];
  state.scenarioAttempts[state.scenarioIndex] = (state.scenarioAttempts[state.scenarioIndex] || 0) + 1;
  if (selected !== item.correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Gondold át még egyszer a helyzetet!</div>';
    return;
  }
  finishScenario(true);
}

function checkMultiScenario() {
  const item = data.scenarios[state.scenarioIndex];
  const selected = [...document.querySelectorAll('.check-answer input:checked')].map(input => Number(input.value)).sort();
  state.scenarioAttempts[state.scenarioIndex] = (state.scenarioAttempts[state.scenarioIndex] || 0) + 1;
  const correct = selected.length === item.correct.length && selected.every((value, index) => value === [...item.correct].sort()[index]);
  if (!correct) {
    document.getElementById('feedback').innerHTML = '<div class="feedback bad">Nem pontos a választás. Lehet, hogy kimaradt vagy bekerült egy felesleges lépés.</div>';
    return;
  }
  finishScenario(true);
}

function renderCommitments() {
  screen.innerHTML = `
    <div class="title-strip">🤝 A mi munkarendünk</div>
    <div class="vote-intro"><div class="scene-icon">🗳️</div><div><h2>Melyik két vállalást tartod a legfontosabbnak?</h2><p>A biztonsági és eszközhasználati szabályok mindenkire érvényesek. Itt arról döntesz, milyen közös munkakultúrát szeretnél az osztályban.</p></div></div>
    <div class="commitments">${data.commitments.map((item, index) => `<label class="commitment"><input type="checkbox" value="${index}"><span><b>${index + 1}</b>${item}</span></label>`).join('')}</div>
    <div id="selectionCount" class="selection-count">0 / 2 kiválasztva</div>
    <div id="feedback"></div>
    <div class="actions end"><button class="primary" id="finish">Kész vagyok →</button></div>`;

  document.querySelectorAll('.commitment input').forEach(input => input.addEventListener('change', () => {
    const checked = [...document.querySelectorAll('.commitment input:checked')];
    if (checked.length > 2) input.checked = false;
    const count = document.querySelectorAll('.commitment input:checked').length;
    document.getElementById('selectionCount').textContent = `${count} / 2 kiválasztva`;
  }));

  document.getElementById('finish').addEventListener('click', () => {
    const checked = [...document.querySelectorAll('.commitment input:checked')];
    if (checked.length !== 2) {
      document.getElementById('feedback').innerHTML = '<div class="feedback bad">Pontosan két vállalást válassz!</div>';
      return;
    }
    state.commitments = checked.map(input => data.commitments[Number(input.value)]);
    setStage(5);
  });
}

function renderSummary() {
  screen.innerHTML = `
    <div class="title-strip">🧭 A géptermi iránytűd</div>
    <div class="summary-hero"><div class="score">${state.score}<small>/17 pont</small></div><div><h2>Minden állomást teljesítettél!</h2><p>A pontszám azt mutatja, hány feladatot oldottál meg első próbálkozásra.</p></div></div>
    <h2>Az öt fő irányelv</h2>
    <div class="principle-grid compact">${data.principles.map(item => principleCard(item)).join('')}</div>
    <article class="chosen-panel"><h2>🤝 Az általad kiválasztott két közös vállalás</h2><div class="chosen-list">${state.commitments.map(item => `<div>✓ ${item}</div>`).join('')}</div></article>
    <div class="feedback good">A felső útvonal állomásaira kattintva bármelyik korábbi részt visszanézheted.</div>
    <div class="actions"><button class="secondary" id="restart">↺ Újrakezdem</button></div>`;
  document.getElementById('restart').addEventListener('click', () => location.reload());
}

updateProgress();
render();
