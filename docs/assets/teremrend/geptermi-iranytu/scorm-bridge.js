(() => {
  if (!window.SCORM12 || typeof state === 'undefined') return;

  function normalizeRestoredProgress() {
    if (state.stage === 1 && state.solvedSentences[state.sentenceIndex]) {
      const next = state.solvedSentences.findIndex((done, index) => index > state.sentenceIndex && !done);
      if (next >= 0) state.sentenceIndex = next;
      else if (state.solvedSentences.filter(Boolean).length >= data.sentences.length) state.stage = Math.max(state.stage, 2);
    }

    if (state.stage === 2 && state.solvedConsequences[state.consequenceIndex]) {
      const next = state.solvedConsequences.findIndex((done, index) => index > state.consequenceIndex && !done);
      if (next >= 0) state.consequenceIndex = next;
      else if (state.solvedConsequences.filter(Boolean).length >= data.consequences.length) state.stage = Math.max(state.stage, 3);
    }

    if (state.stage === 3 && state.solvedScenarios[state.scenarioIndex]) {
      const next = state.solvedScenarios.findIndex((done, index) => index > state.scenarioIndex && !done);
      if (next >= 0) state.scenarioIndex = next;
      else if (state.solvedScenarios.filter(Boolean).length >= data.scenarios.length) state.stage = Math.max(state.stage, 4);
    }

    if (state.stage === 4 && state.commitments.length === 2) state.stage = 5;
    state.maxStage = Math.max(state.maxStage || 0, state.stage || 0);
    state.reviewStage = null;
  }

  const restored = window.SCORM12.loadState();
  if (restored) {
    Object.assign(state, restored);
    normalizeRestoredProgress();
    document.body.dataset.stage = String(state.stage);
    updateProgress(state.stage);
    render();
  }

  window.TEREMREND_STATE = state;

  let timer = null;
  function scheduleSave() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      window.SCORM12.saveState(state, state.stage === 5);
    }, 250);
  }

  const screenNode = document.getElementById('screen');
  const observer = new MutationObserver(scheduleSave);
  observer.observe(screenNode, { childList: true, subtree: true, characterData: true });

  screenNode.addEventListener('click', scheduleSave, true);
  screenNode.addEventListener('change', scheduleSave, true);
  document.querySelector('.progress').addEventListener('click', scheduleSave, true);

  window.SCORM12.saveState(state, state.stage === 5);
})();
