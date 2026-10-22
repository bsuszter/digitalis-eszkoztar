(() => {
  const MAX_SCORE = 17;
  let api = null;
  let initialized = false;
  let finished = false;

  function findApi(start) {
    let current = start;
    let attempts = 0;
    while (current && attempts < 20) {
      try {
        if (current.API) return current.API;
        if (current.parent && current.parent !== current) current = current.parent;
        else break;
      } catch (_) {
        break;
      }
      attempts += 1;
    }
    return null;
  }

  function locateApi() {
    api = findApi(window);
    if (!api && window.opener) api = findApi(window.opener);
    return api;
  }

  function initialize() {
    if (initialized) return true;
    if (!locateApi()) return false;
    try {
      initialized = api.LMSInitialize('') === 'true';
      if (!initialized) return false;
      api.LMSSetValue('cmi.core.score.min', '0');
      api.LMSSetValue('cmi.core.score.max', String(MAX_SCORE));
      const status = api.LMSGetValue('cmi.core.lesson_status');
      if (!status || status === 'not attempted') {
        api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
      }
      api.LMSCommit('');
      return true;
    } catch (_) {
      return false;
    }
  }

  function safeGet(name) {
    if (!initialize()) return '';
    try { return api.LMSGetValue(name) || ''; } catch (_) { return ''; }
  }

  function safeSet(name, value) {
    if (!initialize()) return false;
    try { return api.LMSSetValue(name, String(value)) === 'true'; } catch (_) { return false; }
  }

  function compactState(state) {
    const commitmentIndexes = (state.commitments || [])
      .map(text => window.TEREMREND_DATA.commitments.indexOf(text))
      .filter(index => index >= 0);

    return {
      v: 1,
      st: state.stage || 0,
      ms: state.maxStage || 0,
      si: state.sentenceIndex || 0,
      ci: state.consequenceIndex || 0,
      qi: state.scenarioIndex || 0,
      sc: state.score || 0,
      sa: state.sentenceAttempts || [],
      ca: state.consequenceAttempts || [],
      qa: state.scenarioAttempts || [],
      ss: state.solvedSentences || [],
      cs: state.solvedConsequences || [],
      qs: state.solvedScenarios || [],
      cm: commitmentIndexes
    };
  }

  function expandState(saved) {
    if (!saved || saved.v !== 1) return null;
    return {
      stage: saved.st || 0,
      maxStage: saved.ms || 0,
      reviewStage: null,
      sentenceIndex: saved.si || 0,
      consequenceIndex: saved.ci || 0,
      scenarioIndex: saved.qi || 0,
      score: saved.sc || 0,
      sentenceAttempts: saved.sa || [],
      consequenceAttempts: saved.ca || [],
      scenarioAttempts: saved.qa || [],
      solvedSentences: saved.ss || [],
      solvedConsequences: saved.cs || [],
      solvedScenarios: saved.qs || [],
      commitments: (saved.cm || [])
        .map(index => window.TEREMREND_DATA.commitments[index])
        .filter(Boolean)
    };
  }

  function loadState() {
    if (!initialize()) return null;
    const raw = safeGet('cmi.suspend_data');
    if (!raw) return null;
    try { return expandState(JSON.parse(raw)); } catch (_) { return null; }
  }

  function saveState(state, completed = false) {
    if (!initialize() || !state) return false;
    const payload = JSON.stringify(compactState(state));
    safeSet('cmi.core.score.raw', Math.max(0, Math.min(MAX_SCORE, Number(state.score) || 0)));
    safeSet('cmi.core.lesson_location', `${state.stage || 0}:${state.sentenceIndex || 0}:${state.consequenceIndex || 0}:${state.scenarioIndex || 0}`);
    safeSet('cmi.suspend_data', payload);
    safeSet('cmi.core.exit', completed ? '' : 'suspend');
    safeSet('cmi.core.lesson_status', completed ? 'completed' : 'incomplete');
    try { return api.LMSCommit('') === 'true'; } catch (_) { return false; }
  }

  function finish() {
    if (!initialized || finished) return;
    try {
      api.LMSCommit('');
      api.LMSFinish('');
    } catch (_) {
      // A böngésző bezárásakor nincs további teendő.
    }
    finished = true;
  }

  window.SCORM12 = { initialize, loadState, saveState, finish, maxScore: MAX_SCORE };
  initialize();

  window.addEventListener('pagehide', () => {
    if (window.TEREMREND_STATE) {
      saveState(window.TEREMREND_STATE, window.TEREMREND_STATE.stage === 5);
    }
    finish();
  });
})();
