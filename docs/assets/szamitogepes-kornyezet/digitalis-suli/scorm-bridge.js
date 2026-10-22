(() => {
  const scorm = window.SCORM12;
  if (!scorm || !scorm.init()) return;

  const MAX_SCORE = 12;
  let saveTimer = null;
  let restoring = false;

  function compactState() {
    return {
      v: 1,
      st: state.stage,
      ms: state.maxStage,
      sy: state.systemIndex,
      ap: state.appIndex,
      so: state.storageIndex,
      sc: state.score,
      sya: state.systemAttempts,
      apa: state.appAttempts,
      soa: state.storageAttempts,
      to: state.teamsOrder,
      td: state.teamsDisplayOrder,
      ta: state.teamsAttempts || 0,
      ts: Boolean(state.teamsScored)
    };
  }

  function applySavedState(saved) {
    if (!saved || saved.v !== 1) return false;
    restoring = true;
    state.stage = Number.isInteger(saved.st) ? saved.st : 0;
    state.maxStage = Number.isInteger(saved.ms) ? saved.ms : state.stage;
    state.systemIndex = Number.isInteger(saved.sy) ? saved.sy : 0;
    state.appIndex = Number.isInteger(saved.ap) ? saved.ap : 0;
    state.storageIndex = Number.isInteger(saved.so) ? saved.so : 0;
    state.score = Number.isFinite(saved.sc) ? saved.sc : 0;
    state.systemAttempts = Array.isArray(saved.sya) ? saved.sya : [];
    state.appAttempts = Array.isArray(saved.apa) ? saved.apa : [];
    state.storageAttempts = Array.isArray(saved.soa) ? saved.soa : [];
    state.teamsOrder = Array.isArray(saved.to) ? saved.to : [];
    state.teamsDisplayOrder = Array.isArray(saved.td) ? saved.td : state.teamsDisplayOrder;
    state.teamsAttempts = Number.isInteger(saved.ta) ? saved.ta : 0;
    state.teamsScored = Boolean(saved.ts);
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
    scorm.set('cmi.core.lesson_location', `${state.stage}:${state.systemIndex}:${state.appIndex}:${state.storageIndex}`);
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

  new MutationObserver(scheduleSave).observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'disabled']
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
