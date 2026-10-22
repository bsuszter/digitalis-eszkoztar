(() => {
  const MAIN_KEY = 'online-biztonsagi-kozpont:v7';
  const TRUTH_KEY = 'online-biztonsagi-kozpont:truth:v1';
  const scorm = window.SCORM12;
  if (!scorm?.initialize()) return;

  const status = scorm.get('cmi.core.lesson_status');
  if (!status || status === 'not attempted') {
    scorm.set('cmi.core.lesson_status', 'incomplete');
  }

  const saved = scorm.get('cmi.suspend_data');
  if (saved) {
    try {
      const bundle = JSON.parse(saved);
      if (bundle.main) localStorage.setItem(MAIN_KEY, JSON.stringify(bundle.main));
      if (bundle.truth) localStorage.setItem(TRUTH_KEY, JSON.stringify(bundle.truth));
    } catch {}
  }
  document.documentElement.classList.add('scorm-mode');
})();
