(() => {
  const MAIN_KEY = 'online-biztonsagi-kozpont:v7';
  const TRUTH_KEY = 'online-biztonsagi-kozpont:truth:v1';
  const MAX_SCORE = 46;
  const scorm = window.SCORM12;
  if (!scorm?.available) return;

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); }
    catch { return {}; }
  }

  function compactMain(main) {
    return {
      currentCase: main.currentCase,
      score: main.score,
      completedCases: main.completedCases,
      awarded: main.awarded,
      caseStates: main.caseStates
    };
  }

  function compactTruth(truth) {
    const copy = { ...truth };
    delete copy.orders;
    return copy;
  }

  function sync(commit = true) {
    const main = read(MAIN_KEY);
    const truth = read(TRUTH_KEY);
    const score = Math.max(0, Math.min(MAX_SCORE, Number(main.score || 0) + Number(truth.score || 0)));
    const completed = Array.isArray(main.completedCases)
      && main.completedCases.filter(id => id !== 'truth').length >= 3
      && truth.completed === true;
    const location = main.currentCase === 'truth'
      ? `truth:${truth.step || 1}`
      : `${main.currentCase || 'other-side'}:${main.caseStates?.[main.currentCase]?.step || 1}`;

    scorm.set('cmi.core.score.min', '0');
    scorm.set('cmi.core.score.max', String(MAX_SCORE));
    scorm.set('cmi.core.score.raw', String(score));
    scorm.set('cmi.core.lesson_location', location);
    scorm.set('cmi.core.lesson_status', completed ? 'completed' : 'incomplete');

    const suspend = JSON.stringify({
      main: compactMain(main),
      truth: compactTruth(truth)
    });
    if (suspend.length <= 4096) {
      scorm.set('cmi.suspend_data', suspend);
    } else {
      console.warn('A SCORM suspend_data mérete meghaladta a 4096 karaktert:', suspend.length);
    }

    if (commit) scorm.commit();
  }

  let lastSnapshot = '';
  function poll() {
    const snapshot = `${localStorage.getItem(MAIN_KEY) || ''}|${localStorage.getItem(TRUTH_KEY) || ''}`;
    if (snapshot !== lastSnapshot) {
      lastSnapshot = snapshot;
      sync(true);
    }
  }

  sync(true);
  const timer = window.setInterval(poll, 1000);
  window.addEventListener('pagehide', () => {
    window.clearInterval(timer);
    sync(true);
    scorm.finish();
  });
  window.addEventListener('beforeunload', () => {
    sync(false);
    scorm.finish();
  });
})();
