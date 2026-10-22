(() => {
  const STORAGE_KEY = 'online-biztonsagi-kozpont:v7';
  const stepMaps = {
    'other-side': {
      3: { awardId: 'video1-q1', max: 1 },
      4: { awardId: 'warnings', max: 4 },
      6: { awardId: 'video2-q1', max: 1 },
      7: { awardId: 'decision', max: 4 }
    },
    images: {
      3: { awardId: 'video1-q1', max: 1 },
      4: { awardId: 'video1-q2', max: 1 },
      6: { awardId: 'video2-q1', max: 1 },
      7: { awardId: 'video2-q2', max: 1 },
      9: { awardId: 'video3-q1', max: 1 },
      10: { awardId: 'video3-q2', max: 1 },
      11: { awardId: 'sharing', max: 4 },
      12: { awardId: 'decision', max: 4 }
    },
    bullying: {
      3: { awardId: 'video1-q1', max: 1 },
      4: { awardId: 'video1-q2', max: 1 },
      6: { awardId: 'video2-q1', max: 1 },
      7: { awardId: 'video2-q2', max: 1 },
      8: { awardId: 'actions', max: 4 },
      9: { awardId: 'decision', max: 4 }
    }
  };

  function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }

  function currentStep() {
    const text = document.querySelector('#step-chip')?.textContent || '';
    const match = text.match(/(\d+)\s*\/\s*\d+/);
    return match ? Number(match[1]) : null;
  }

  function renderBadge() {
    const state = readState();
    const caseId = state.currentCase || 'other-side';
    const config = stepMaps[caseId]?.[currentStep()];
    if (!config) return;
    const feedback = document.querySelector('#stage .feedback');
    if (!feedback || feedback.querySelector('.first-attempt-badge')) return;
    const key = `${caseId}:${config.awardId}`;
    const awarded = state.awarded || {};
    if (!Object.prototype.hasOwnProperty.call(awarded, key)) return;
    const badge = document.createElement('div');
    badge.className = 'first-attempt-badge';
    badge.textContent = `Első próbálkozás: ${awarded[key]} / ${config.max} pont`;
    feedback.appendChild(badge);
  }

  const observer = new MutationObserver(renderBadge);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('storage', renderBadge);
  renderBadge();
})();