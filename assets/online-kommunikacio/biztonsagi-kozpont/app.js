(() => {
  const STORAGE_KEY = 'online-biztonsagi-kozpont:v7';
  const cases = window.SAFETY_CASES || [];
  const stage = document.querySelector('#stage');
  const caseNav = document.querySelector('#case-nav');
  const timeline = document.querySelector('#case-timeline');
  const caseTitle = document.querySelector('#case-title');
  const caseEyebrow = document.querySelector('#case-eyebrow');
  const stepChip = document.querySelector('#step-chip');
  const scoreChip = document.querySelector('#score-chip');
  const overallProgress = document.querySelector('#overall-progress');
  const overallLabel = document.querySelector('#overall-label');
  const restartButton = document.querySelector('#restart-local');

  const stationsByCase = {
    'other-side': [
      ['🏠','Helyzet'], ['🎬','1. videó'], ['❓','Videókérdés'], ['⚠️','Veszélyjelek'],
      ['🎬','2. videó'], ['❓','Videókérdés'], ['🧭','Döntés'], ['🏁','Összegzés']
    ],
    images: [
      ['🏠','Helyzet'], ['🎬','1. videó'], ['👀','Mit láttál?'], ['💡','Mit tanít?'],
      ['🎬','2. videó'], ['👀','Mit láttál?'], ['💡','Mit tanít?'],
      ['🎬','3. videó'], ['👀','Mit láttál?'], ['💡','Mit tanít?'],
      ['🖼️','Megosztás'], ['🧭','Döntés'], ['🏁','Összegzés']
    ],
    bullying: [
      ['🏠','Helyzet'], ['🎬','1. videó'], ['👀','Mit láttál?'], ['💡','Mit tanít?'],
      ['🎬','2. videó'], ['👀','Mit láttál?'], ['💡','Mit tanít?'],
      ['🛟','Mit tegyek?'], ['🧭','Döntés'], ['🏁','Összegzés']
    ]
  };

  function freshCaseState(caseData) {
    const videos = caseData?.videos || [];
    return {
      step: 1,
      maxUnlocked: 1,
      questionAnswers: videos.map(video => Array(video.questions?.length || 0).fill(null)),
      questionChecked: videos.map(video => Array(video.questions?.length || 0).fill(false)),
      questionCorrect: videos.map(video => Array(video.questions?.length || 0).fill(false)),
      selections: {}, checked: {}, perfect: {},
      decisionSelections: [], decisionChecked: false, decisionCorrect: false
    };
  }

  const defaultState = {
    currentCase: 'other-side', score: 0, completedCases: [], awarded: {}, optionOrders: {},
    caseStates: Object.fromEntries(cases.filter(item => item.enabled).map(item => [item.id, freshCaseState(item)]))
  };

  const state = loadState();

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const result = {
        ...defaultState, ...saved,
        awarded: saved.awarded && typeof saved.awarded === 'object' ? saved.awarded : {},
        optionOrders: saved.optionOrders && typeof saved.optionOrders === 'object' ? saved.optionOrders : {},
        completedCases: Array.isArray(saved.completedCases) ? saved.completedCases : [],
        caseStates: {}
      };
      cases.filter(item => item.enabled).forEach(caseData => {
        const base = freshCaseState(caseData);
        const old = saved.caseStates?.[caseData.id] || {};
        result.caseStates[caseData.id] = {
          ...base, ...old,
          questionAnswers: validNested(old.questionAnswers, base.questionAnswers),
          questionChecked: validNested(old.questionChecked, base.questionChecked),
          questionCorrect: validNested(old.questionCorrect, base.questionCorrect),
          selections: old.selections && typeof old.selections === 'object' ? old.selections : {},
          checked: old.checked && typeof old.checked === 'object' ? old.checked : {},
          perfect: old.perfect && typeof old.perfect === 'object' ? old.perfect : {},
          decisionSelections: Array.isArray(old.decisionSelections) ? old.decisionSelections : []
        };
      });
      if (!result.caseStates[result.currentCase]) result.currentCase = cases.find(item => item.enabled)?.id || 'other-side';
      return result;
    } catch {
      return structuredClone(defaultState);
    }
  }

  function validNested(value, fallback) {
    if (!Array.isArray(value) || value.length !== fallback.length) return structuredClone(fallback);
    return fallback.map((row, index) => Array.isArray(value[index]) && value[index].length === row.length ? value[index] : [...row]);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateChrome();
  }

  function resetLocalProgress() {
    if (!window.confirm('Biztosan törlöd az Online Biztonsági Központ helyi előrehaladását? Ez a művelet nem vonható vissza.')) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
  restartButton?.addEventListener('click', resetLocalProgress);

  function currentCaseData() { return cases.find(item => item.id === state.currentCase) || cases.find(item => item.enabled) || cases[0]; }
  function currentProgress() { return state.caseStates[state.currentCase] || freshCaseState(currentCaseData()); }
  function totalAvailableScore() { return cases.filter(item => item.enabled).reduce((sum, item) => sum + (Number(item.maxScore) || 0), 0); }
  function awardKey(localId) { return `${state.currentCase}:${localId}`; }
  function awardFirstCheck(localId, points) {
    const key = awardKey(localId);
    if (Object.hasOwn(state.awarded, key)) return;
    state.awarded[key] = points;
    state.score += points;
  }

  function shuffledIds(items) {
    const ids = items.map(item => item.id);
    for (let index = ids.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [ids[index], ids[randomIndex]] = [ids[randomIndex], ids[index]];
    }
    return ids;
  }

  function orderedItems(items, localKey) {
    const key = `${state.currentCase}:${localKey}`;
    const ids = items.map(item => item.id);
    const savedOrder = state.optionOrders[key];
    const valid = Array.isArray(savedOrder) && savedOrder.length === ids.length && savedOrder.every(id => ids.includes(id));
    if (!valid) {
      state.optionOrders[key] = shuffledIds(items);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    const byId = new Map(items.map(item => [item.id, item]));
    return state.optionOrders[key].map(id => byId.get(id)).filter(Boolean);
  }

  function updateChrome() {
    const current = currentCaseData();
    const progress = currentProgress();
    const index = cases.findIndex(item => item.id === current.id);
    const stations = stationsByCase[current.id] || [];
    caseEyebrow.textContent = `${index + 1}. ügy`;
    caseTitle.textContent = current.title;
    stepChip.textContent = `${Math.min(progress.step, stations.length || 1)} / ${stations.length || 1} állomás`;
    scoreChip.textContent = `⭐ ${state.score} / ${totalAvailableScore()} pont`;
    overallProgress.style.width = `${(state.completedCases.length / cases.length) * 100}%`;
    overallLabel.textContent = `${state.completedCases.length} / ${cases.length} ügy teljesítve`;
    renderNavigation();
    renderTimeline();
  }

  function renderNavigation() {
    caseNav.innerHTML = cases.map((item, index) => {
      const completed = state.completedCases.includes(item.id);
      const current = item.id === state.currentCase;
      return `<button class="case-button ${current ? 'is-current' : ''}" type="button" data-case="${item.id}" ${item.enabled ? '' : 'disabled'}>
        <span class="case-button__number">${index + 1}</span><span><strong>${item.title}</strong><small>${item.subtitle}</small></span>
        <span class="case-button__state">${completed ? '✅' : item.enabled ? '›' : '🔒'}</span></button>`;
    }).join('');
    caseNav.querySelectorAll('[data-case]:not(:disabled)').forEach(button => button.addEventListener('click', () => {
      state.currentCase = button.dataset.case;
      saveState(); render();
    }));
  }

  function renderTimeline() {
    const stations = stationsByCase[state.currentCase];
    if (!stations) { timeline.innerHTML = ''; timeline.hidden = true; return; }
    const progress = currentProgress();
    const finished = state.completedCases.includes(state.currentCase);
    timeline.hidden = false;
    timeline.style.setProperty('--station-count', stations.length);
    timeline.innerHTML = stations.map(([icon, label], index) => {
      const pos = index + 1;
      const unlocked = pos <= progress.maxUnlocked || finished;
      const current = pos === progress.step;
      const done = pos < progress.maxUnlocked || finished;
      return `<button class="timeline-step ${current ? 'is-current' : ''} ${done ? 'is-done' : ''}" type="button" data-step="${pos}" ${unlocked ? '' : 'disabled'}><span>${done && !current ? '✓' : icon}</span><strong>${label}</strong></button>`;
    }).join('');
    timeline.querySelectorAll('[data-step]:not(:disabled)').forEach(button => button.addEventListener('click', () => setStep(Number(button.dataset.step), false)));
  }

  function render() {
    updateChrome();
    const current = currentCaseData();
    if (!current.enabled) return renderLocked(current);
    if (current.id === 'other-side') return renderFirstCase();
    if (current.id === 'images') return renderImagesCase();
    if (current.id === 'bullying') return renderBullyingCase();
  }

  function setStep(step, scroll = true) {
    const progress = currentProgress();
    if (step > progress.maxUnlocked && !state.completedCases.includes(state.currentCase)) return;
    progress.step = step;
    saveState();
    if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }
  function unlock(step) { currentProgress().maxUnlocked = Math.max(currentProgress().maxUnlocked, step); saveState(); }

  function renderVideo(video, backStep, nextStep, note) {
    stage.innerHTML = `<header class="stage-header"><h3>${video.title}</h3><p>${video.prompt}</p></header><div class="stage-body">
      <div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${video.youtubeId}" title="${video.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
      <div class="video-note">${note}</div><div class="actions"><button class="secondary-button" id="back">← Vissza</button><button class="primary-button" id="next">Megnéztem, válaszolok →</button></div></div>`;
    document.querySelector('#back').onclick = () => setStep(backStep);
    document.querySelector('#next').onclick = () => { unlock(nextStep); setStep(nextStep); };
  }

  function renderVideoQuestion(videoIndex, questionIndex, backStep, nextStep, heading) {
    const progress = currentProgress();
    const q = currentCaseData().videos[videoIndex].questions[questionIndex];
    const options = orderedItems(q.options, `video-${videoIndex}-question-${questionIndex}`);
    const selected = progress.questionAnswers[videoIndex][questionIndex];
    const correct = progress.questionCorrect[videoIndex][questionIndex];
    stage.innerHTML = `<header class="stage-header"><h3>${heading}</h3><p>${q.question}</p></header><div class="stage-body"><div class="quiz-grid">
      ${options.map(option => `<button class="quiz-option ${selected === option.id ? 'is-selected' : ''}" type="button" data-video-answer="${option.id}" ${correct ? 'disabled' : ''}><span class="choice-dot">${selected === option.id ? '✓' : ''}</span><span>${option.label}</span></button>`).join('')}</div>
      ${videoQuestionFeedback(videoIndex, questionIndex, q)}<div class="actions"><button class="secondary-button" id="back">← Előző állomás</button><button class="primary-button" id="check" ${!selected || correct ? 'disabled' : ''}>Válasz ellenőrzése</button>${correct ? '<button class="primary-button" id="next">Tovább →</button>' : ''}</div></div>`;
    stage.querySelectorAll('[data-video-answer]:not(:disabled)').forEach(button => button.onclick = () => {
      progress.questionAnswers[videoIndex][questionIndex] = button.dataset.videoAnswer;
      progress.questionChecked[videoIndex][questionIndex] = false;
      saveState(); renderVideoQuestion(videoIndex, questionIndex, backStep, nextStep, heading);
    });
    document.querySelector('#back').onclick = () => setStep(backStep);
    document.querySelector('#check')?.addEventListener('click', () => {
      const answer = progress.questionAnswers[videoIndex][questionIndex];
      const isCorrect = q.options.find(option => option.id === answer)?.correct === true;
      awardFirstCheck(`video${videoIndex + 1}-q${questionIndex + 1}`, isCorrect ? 1 : 0);
      progress.questionChecked[videoIndex][questionIndex] = true;
      progress.questionCorrect[videoIndex][questionIndex] = isCorrect;
      saveState(); renderVideoQuestion(videoIndex, questionIndex, backStep, nextStep, heading);
    });
    document.querySelector('#next')?.addEventListener('click', () => { unlock(nextStep); setStep(nextStep); });
  }

  function videoQuestionFeedback(videoIndex, questionIndex, q) {
    const progress = currentProgress();
    if (!progress.questionChecked[videoIndex][questionIndex]) return '<div class="feedback feedback--info"><h4>Idézd fel a jelenetet!</h4><p>A kérdés a videóban látott vagy elhangzott történetre vonatkozik.</p></div>';
    if (progress.questionCorrect[videoIndex][questionIndex]) return `<div class="feedback feedback--success"><h4>Helyes!</h4><p>${q.success}</p></div>`;
    return `<div class="feedback feedback--warning"><h4>Gondold át még egyszer!</h4><div class="help-branch"><strong>Segítség</strong><p>${q.help}</p></div></div>`;
  }

  function renderMultiSelect(items, key, backStep, nextStep, awardId, title, prompt, success, help, expected) {
    const progress = currentProgress();
    const ordered = orderedItems(items, key);
    const selected = progress.selections[key] || [];
    const perfect = progress.perfect[key] === true;
    stage.innerHTML = `<header class="stage-header"><h3>${title}</h3><p>${prompt}</p></header><div class="stage-body"><div class="option-list">
      ${ordered.map(item => { const on = selected.includes(item.id); return `<button class="option ${on ? 'is-selected' : ''}" type="button" data-multi="${item.id}" ${perfect ? 'disabled' : ''}><span class="option__marker">${on ? '✓' : ''}</span><span>${item.label}</span></button>`; }).join('')}</div>
      ${multiFeedback(key, success, help, expected)}<div class="actions"><button class="secondary-button" id="back">← Előző állomás</button><button class="primary-button" id="check" ${perfect ? 'disabled' : ''}>Ellenőrzés</button>${perfect ? '<button class="primary-button" id="next">Tovább →</button>' : ''}</div></div>`;
    stage.querySelectorAll('[data-multi]:not(:disabled)').forEach(button => button.onclick = () => {
      const id = button.dataset.multi;
      progress.selections[key] = selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id];
      progress.checked[key] = false;
      saveState(); renderMultiSelect(items, key, backStep, nextStep, awardId, title, prompt, success, help, expected);
    });
    document.querySelector('#back').onclick = () => setStep(backStep);
    document.querySelector('#check')?.addEventListener('click', () => {
      const correctIds = items.filter(item => item.correct).map(item => item.id).sort();
      const chosen = [...(progress.selections[key] || [])].sort();
      const isPerfect = chosen.length === correctIds.length && chosen.every(id => correctIds.includes(id));
      awardFirstCheck(awardId, isPerfect ? 4 : 0);
      progress.checked[key] = true; progress.perfect[key] = isPerfect;
      saveState(); renderMultiSelect(items, key, backStep, nextStep, awardId, title, prompt, success, help, expected);
    });
    document.querySelector('#next')?.addEventListener('click', () => { unlock(nextStep); setStep(nextStep); });
  }

  function multiFeedback(key, success, help, expected) {
    const progress = currentProgress();
    if (!progress.checked[key]) return `<div class="feedback feedback--info"><h4>${expected} választ jelölj!</h4><p>Olvasd végig mindegyik lehetőséget, és csak a valóban biztonságos lépéseket válaszd.</p></div>`;
    if (progress.perfect[key]) return `<div class="feedback feedback--success"><h4>Helyes összeállítás!</h4><p>${success}</p></div>`;
    return `<div class="feedback feedback--warning"><h4>Még nem teljes a biztonságos megoldás.</h4><div class="help-branch"><strong>Segítség</strong><p>${help}</p></div></div>`;
  }

  function renderDecision(decision, backStep, nextStep, awardId, successText) {
    const progress = currentProgress();
    const options = orderedItems(decision.options, awardId);
    const selected = progress.decisionSelections;
    stage.innerHTML = `<header class="stage-header"><h3>Döntési helyzet</h3><p>${decision.question}</p></header><div class="stage-body"><div class="decision-grid">
      ${options.map(option => { const on = selected.includes(option.id); return `<button class="decision ${on ? 'is-selected' : ''}" type="button" data-decision="${option.id}" ${progress.decisionCorrect ? 'disabled' : ''}><span class="decision__marker">${on ? '✓' : ''}</span><span><strong>${option.title}</strong><span>${option.note}</span></span></button>`; }).join('')}</div>
      ${decisionFeedback(successText)}<div class="actions"><button class="secondary-button" id="back">← Előző állomás</button><button class="primary-button" id="check" ${selected.length === 0 || progress.decisionCorrect ? 'disabled' : ''}>Döntések ellenőrzése</button>${progress.decisionCorrect ? '<button class="primary-button" id="next">Ügy lezárása →</button>' : ''}</div></div>`;
    stage.querySelectorAll('[data-decision]:not(:disabled)').forEach(button => button.onclick = () => {
      const id = button.dataset.decision;
      progress.decisionSelections = selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id];
      progress.decisionChecked = false;
      saveState(); renderDecision(decision, backStep, nextStep, awardId, successText);
    });
    document.querySelector('#back').onclick = () => setStep(backStep);
    document.querySelector('#check')?.addEventListener('click', () => {
      const correctIds = decision.options.filter(option => option.correct).map(option => option.id).sort();
      const chosen = [...progress.decisionSelections].sort();
      const perfect = chosen.length === correctIds.length && chosen.every(id => correctIds.includes(id));
      awardFirstCheck(awardId, perfect ? 4 : 0);
      progress.decisionChecked = true; progress.decisionCorrect = perfect;
      saveState(); renderDecision(decision, backStep, nextStep, awardId, successText);
    });
    document.querySelector('#next')?.addEventListener('click', () => { unlock(nextStep); setStep(nextStep); });
  }

  function decisionFeedback(successText) {
    const progress = currentProgress();
    if (!progress.decisionChecked) return '<div class="feedback feedback--info"><h4>Két választ jelölj!</h4><p>A biztonságos megoldások csökkentik a veszélyt, és segítséget is bevonnak.</p></div>';
    if (progress.decisionCorrect) return `<div class="feedback feedback--success"><h4>Mindkét biztonságos döntést megtaláltad!</h4><p>${successText}</p></div>`;
    return '<div class="feedback feedback--warning"><h4>Legalább az egyik választás még kockázatos, vagy hiányzik egy biztonságos lépés.</h4><div class="help-branch"><strong>Segítség</strong><p>Olyan megoldást keress, amely megőrzi a bizonyítékot, csökkenti a veszélyt és segítséget von be.</p></div></div>';
  }

  function intro(title, text, scene, cards, previousCase, startNext = 2) {
    stage.innerHTML = `<header class="stage-header"><h3>${title}</h3><p>${text}</p></header><div class="stage-body"><div class="hero-grid"><article class="story-card"><div class="story-card__scene" aria-hidden="true">${scene}</div><h4>${cards[0][0]}</h4><p>${cards[0][1]}</p></article><article class="task-card"><h4>Ebben az ügyben</h4><div class="summary-grid" style="grid-template-columns:1fr">${cards.slice(1).map(card => `<div class="summary-card"><span>${card[0]}</span><h4>${card[1]}</h4><p>${card[2]}</p></div>`).join('')}</div></article></div><div class="actions">${previousCase ? '<button class="secondary-button" id="back-case">← Előző ügy</button>' : '<span></span>'}<button class="primary-button" id="start">Ügy megnyitása →</button></div></div>`;
    if (previousCase) document.querySelector('#back-case').onclick = () => { state.currentCase = previousCase; saveState(); render(); };
    document.querySelector('#start').onclick = () => { unlock(startNext); setStep(startNext); };
  }

  function summary(title, text, cards, nextCase) {
    completeCurrentCase();
    stage.innerHTML = `<header class="stage-header"><h3>${title}</h3><p>${text}</p></header><div class="stage-body"><div class="summary-grid">${cards.map(card => `<article class="summary-card"><span>${card[0]}</span><h4>${card[1]}</h4><p>${card[2]}</p></article>`).join('')}</div><div class="feedback feedback--success"><h4>Ügy teljesítve</h4><p>A pontszám minden feladat első ellenőrzésekor rögzült.</p></div><div class="actions"><button class="secondary-button" id="review">← Ügy visszanézése</button>${nextCase ? '<button class="primary-button" id="next-case">Tovább a következő ügyre →</button>' : '<button class="primary-button" disabled>Következő ügy hamarosan</button>'}</div></div>`;
    document.querySelector('#review').onclick = () => setStep(2);
    if (nextCase) document.querySelector('#next-case').onclick = () => { state.currentCase = nextCase; saveState(); render(); };
  }

  function renderFirstCase() {
    const r = [null,
      () => intro('1. ügy – Ki van a másik oldalon?', 'Az interneten egy név, egy profilkép vagy néhány kedves üzenet még nem bizonyítja, hogy valóban azzal beszélünk, akinek a másik mondja magát.', '🐺 📱 🐑', [['Két rövid történetet vizsgálsz meg','Keresd a gyanús jeleket, majd dönts úgy, hogy a szereplő biztonságban maradjon.'],['🎬','Nézd meg!','Figyeld a történetet és a szereplők viselkedését.'],['⚠️','Ismerd fel!','Válaszd ki a valódi veszélyjeleket.'],['🧭','Dönts!','Válaszd a biztonságos következő lépéseket.']], null),
      () => renderVideo(cases[0].videos[0],1,3,'<strong>Megfigyelési szempont:</strong> Figyeld meg, hogyan változott meg a juhocska viselkedése!'),
      () => renderVideoQuestion(0,0,2,4,'Mit láttál a történetben?'),
      () => renderMultiSelect(cases[0].videos[0].warningSigns,'warnings',3,5,'warnings','Melyik jelek gyanúsak?','Jelöld ki mindazt, ami arra utal, hogy a farkas nem biztonságos barátként közeledik!','Felismerted a behálózás fontos jeleit.','Keresd a titkolózást, az ajándékígéretet, a személyes adatok kérését és a találkozóra hívást.',5),
      () => renderVideo(cases[0].videos[1],4,6,'<strong>Megfigyelési szempont:</strong> Figyeld meg, hogyan kapott Jancsi meghívást a jelmezbálra!'),
      () => renderVideoQuestion(1,0,5,7,'Mit láttál a történetben?'),
      () => renderDecision(cases[0].videos[1].decision,6,8,'decision','Ne menj el a találkozóra, szakítsd meg a gyanús kapcsolatot, és szólj egy megbízható felnőttnek.'),
      () => summary('Az első ügy lezárva','Felismerted, hogy az online bizalomhoz nem elég egy név, egy kép vagy néhány kedves üzenet.',[['🕵️','A profil nem bizonyíték','A másik ember lehet egészen más, mint akinek mondja magát.'],['⚠️','Veszélyjelek','Titkolózás, ajándékígéret, személyes adatok és egyedüli találkozó.'],['🛟','Biztonságos lépés','Szakítsd meg a gyanús kapcsolatot, és szólj egy megbízható felnőttnek.']],'images')
    ];
    r[Math.max(1,Math.min(8,currentProgress().step))]();
  }

  function renderImagesCase() {
    const r = [null,
      () => intro('2. ügy – Mi történhet a képeimmel?','Egy kép vagy videó másolható, továbbküldhető és évekkel később is előkerülhet.','📷 ➜ 📱 ➜ 🌐',[['Három történet, egy közös kérdés','Mi történik egy képpel attól a pillanattól, hogy elkészül vagy elküldjük?'],['🕰️','Digitális lábnyom','A régi tartalom is előkerülhet.'],['✋','Beleegyezés','Jogod van nemet mondani a felvételre.'],['↗️','Továbbküldés','Az elküldött kép fölött elveszhet az irányítás.']],'other-side'),
      () => renderVideo(cases[1].videos[0],1,3,'<strong>Megfigyelési szempont:</strong> Figyeld meg Jancsi régi felvételét és azt is, miért kellemetlen neki, hogy előkerült!'),
      () => renderVideoQuestion(0,0,2,4,'Mit láttál a videóban?'),
      () => renderVideoQuestion(0,1,3,5,'Mit tanít a történet?'),
      () => renderVideo(cases[1].videos[1],4,6,'<strong>Megfigyelési szempont:</strong> Figyeld meg, kitől ijedtek meg a farkasok, és hogyan válhat egy felvétel később veszélyessé!'),
      () => renderVideoQuestion(1,0,5,7,'Mit láttál a videóban?'),
      () => renderVideoQuestion(1,1,6,8,'Mit tanít a történet?'),
      () => renderVideo(cases[1].videos[2],7,9,'<strong>Megfigyelési szempont:</strong> Figyeld meg, ki készítette a képet, és hogyan jutott el később másokhoz!'),
      () => renderVideoQuestion(2,0,8,10,'Mit láttál a videóban?'),
      () => renderVideoQuestion(2,1,9,11,'Mit tanít a történet?'),
      () => renderMultiSelect(cases[1].sharingRules,'sharing',10,12,'sharing','Mit gondolj át megosztás előtt?','Jelöld ki azt a három állítást, amely valóban biztonságosabbá teszi a képmegosztást!','A beleegyezés, a háttér ellenőrzése és a későbbi következmények mérlegelése mind fontos.','Az eltűnő üzenet és a szűk ismerősi kör sem akadályozza meg biztosan a mentést vagy továbbküldést.',3),
      () => renderDecision(cases[1].decision,11,13,'decision','Ne terjeszd tovább a képet, támogasd az érintettet, és vonj be egy megbízható felnőttet.'),
      () => summary('A második ügy lezárva','Megvizsgáltad, hogyan kerülhet elő, terjedhet tovább vagy válhat bántóvá egy kép és videó.',[['🕰️','Az internet emlékezhet','A régi tartalom másolatokban később is előkerülhet.'],['✋','Jogod van nemet mondani','Kellemetlen vagy kiszolgáltatott helyzetben ne készüljön rólad felvétel.'],['🛟','Visszaélésnél kérj segítséget','Ne terjeszd tovább, őrizd meg a bizonyítékot, jelentsd, és szólj egy felnőttnek.']],'bullying')
    ];
    r[Math.max(1,Math.min(13,currentProgress().step))]();
  }

  function renderBullyingCase() {
    const r = [null,
      () => intro('3. ügy – Mit tegyek, ha bántanak?','Az online zaklatás nem „csak internetes vita”. Ismerd fel, mikor kell segítséget kérni, és hogyan őrizheted meg a bizonyítékokat.','💬 ⚠️ 🛟',[['Két történet a segítségkérésről','Az egyikben súlyos fenyegetés, a másikban ismétlődő sértegetés történik.'],['📸','Őrizd meg!','A képernyőkép és az üzenet fontos bizonyíték lehet.'],['🚫','Állítsd meg!','Tiltás és jelentés csökkentheti a további bántást.'],['🤝','Ne maradj egyedül!','Szólj újra is, ha elsőre nem kaptál megfelelő segítséget.']],'images'),
      () => renderVideo(cases[2].videos[0],1,3,'<strong>Megfigyelési szempont:</strong> Figyeld meg, milyen gyakran érkeztek az üzenetek, és milyen segítséget javasol a történet!'),
      () => renderVideoQuestion(0,0,2,4,'Mit láttál a videóban?'),
      () => renderVideoQuestion(0,1,3,5,'Mit tanít a történet?'),
      () => renderVideo(cases[2].videos[1],4,6,'<strong>Megfigyelési szempont:</strong> Figyeld meg, ki bántotta Mátit, és mit tett, amikor az első megoldás nem segített!'),
      () => renderVideoQuestion(1,0,5,7,'Mit láttál a videóban?'),
      () => renderVideoQuestion(1,1,6,8,'Mit tanít a történet?'),
      () => renderMultiSelect(cases[2].actionSteps,'actions',7,9,'actions','Mit tegyél online zaklatás esetén?','Jelöld ki a négy biztonságos lépést!','A bizonyítékmentés, tiltás és jelentés, segítségkérés, valamint súlyos helyzetben a hivatalos segítség együtt ad védelmet.','Ne töröld rögtön a bizonyítékot, és ne válaszolj vissza sértegetéssel.',4),
      () => renderDecision(cases[2].decision,8,10,'decision','Őrizd meg az újabb bizonyítékokat, és kérj ismét segítséget egy megbízható felnőttől.'),
      () => summary('A harmadik ügy lezárva','Megtanultad, hogyan lehet felismerni, dokumentálni és jelenteni az online zaklatást.',[['📸','Ments bizonyítékot','Őrizd meg az üzeneteket és készíts képernyőképet.'],['🚫','Tiltsd és jelentsd','Ne vitatkozz a zaklatóval, hanem használd a felület védelmi lehetőségeit.'],['🤝','Kérj segítséget','Mondd el újra és pontosan, ha elsőre nem értették meg a helyzetet.']],null)
    ];
    r[Math.max(1,Math.min(10,currentProgress().step))]();
  }

  function completeCurrentCase() {
    if (!state.completedCases.includes(state.currentCase)) { state.completedCases.push(state.currentCase); saveState(); }
  }
  function renderLocked(current) { stage.innerHTML = `<div class="locked-panel"><div><span>${current.icon}</span><h3>${current.title}</h3><p>${current.subtitle}</p><p>Ennek az ügynek a tartalma a következő fejlesztési lépésben kerül be.</p></div></div>`; }

  render();
})();