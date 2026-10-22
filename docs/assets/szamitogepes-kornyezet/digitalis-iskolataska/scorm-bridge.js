(() => {
  const scorm = window.SCORM12;
  if (!scorm || !scorm.init()) return;

  const MAX_SCORE = 16;
  let saveTimer = null;
  let restoring = false;

  function compactState() {
    return {
      v: 1,
      st: state.stage,
      ms: state.maxStage,
      ii: state.identifyIndex,
      si: state.sortingIndex,
      ri: state.routeIndex,
      sc: state.score,
      ia: state.identifyAttempts,
      sa: state.sortingAttempts,
      ra: state.routeAttempts,
      is: state.solvedIdentify,
      ss: state.solvedSorting,
      rs: state.solvedRoutes,
      sf: state.selectedFolders
    };
  }

  function applySavedState(saved) {
    if (!saved || saved.v !== 1) return false;
    restoring = true;
    state.stage = Number.isInteger(saved.st) ? saved.st : 0;
    state.maxStage = Number.isInteger(saved.ms) ? saved.ms : state.stage;
    state.identifyIndex = Number.isInteger(saved.ii) ? saved.ii : 0;
    state.sortingIndex = Number.isInteger(saved.si) ? saved.si : 0;
    state.routeIndex = Number.isInteger(saved.ri) ? saved.ri : 0;
    state.score = Number.isFinite(saved.sc) ? saved.sc : 0;
    state.identifyAttempts = Array.isArray(saved.ia) ? saved.ia : [];
    state.sortingAttempts = Array.isArray(saved.sa) ? saved.sa : [];
    state.routeAttempts = Array.isArray(saved.ra) ? saved.ra : [];
    state.solvedIdentify = Array.isArray(saved.is) ? saved.is : [];
    state.solvedSorting = Array.isArray(saved.ss) ? saved.ss : [];
    state.solvedRoutes = Array.isArray(saved.rs) ? saved.rs : [];
    state.selectedFolders = Array.isArray(saved.sf) ? saved.sf : [];
    updateProgress(state.stage);
    render();
    restoring = false;
    return true;
  }

  function saveNow() {
    if (restoring) return;
    const completed = state.stage === 5 && state.maxStage === 5;
    scorm.set('cmi.core.score.min', 0);
    scorm.set('cmi.core.score.max', MAX_SCORE);
    scorm.set('cmi.core.score.raw', Math.max(0, Math.min(MAX_SCORE, state.score)));
    scorm.set('cmi.core.lesson_location', `${state.stage}:${state.identifyIndex}:${state.sortingIndex}:${state.routeIndex}`);
    scorm.set('cmi.core.lesson_status', completed ? 'completed' : 'incomplete');
    scorm.set('cmi.suspend_data', JSON.stringify(compactState()));
    scorm.commit();
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 120);
  }

  const previousStatus = scorm.get('cmi.core.lesson_status');
  if (!previousStatus || previousStatus === 'not attempted') {
    scorm.set('cmi.core.lesson_status', 'incomplete');
  }

  const savedText = scorm.get('cmi.suspend_data');
  if (savedText) {
    try {
      applySavedState(JSON.parse(savedText));
    } catch (error) {
      console.warn('A mentett SCORM-állapot nem olvasható:', error);
    }
  }

  const observer = new MutationObserver(scheduleSave);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'disabled', 'checked', 'open']
  });

  saveNow();
  window.addEventListener('pagehide', () => {
    saveNow();
    scorm.finish();
  });
  window.addEventListener('beforeunload', () => {
    saveNow();
    scorm.finish();
  });
})();
