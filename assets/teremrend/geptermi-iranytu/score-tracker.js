(() => {
  const style = document.createElement('style');
  style.textContent = `
    .learning-bar{display:grid;grid-template-columns:minmax(0,1fr) 150px;gap:12px;align-items:stretch;margin:16px 0}
    .learning-bar .progress{margin:0}
    .score-tracker{display:flex;flex-direction:column;justify-content:center;gap:4px;padding:12px 14px;border:1px solid var(--border);border-radius:18px;background:#fff;box-shadow:0 5px 14px rgba(18,59,93,.05);text-align:center}
    .score-label{font-size:13px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
    .score-tracker strong{font-size:25px;color:var(--accent-dark)}
    .score-meter{height:7px;overflow:hidden;border-radius:999px;background:#e9eff2}
    .score-meter span{display:block;width:0;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--accent),var(--accent-dark));transition:width .25s ease}
    @media(max-width:900px){.learning-bar{grid-template-columns:1fr}.score-tracker{flex-direction:row;align-items:center;justify-content:center;gap:12px}.score-meter{width:150px}}
    @media(max-width:500px){.score-tracker{display:grid;grid-template-columns:auto auto;}.score-meter{grid-column:1/-1;width:100%}}
  `;
  document.head.appendChild(style);

  const scoreValue = document.getElementById('liveScore');
  const meterFill = document.getElementById('scoreMeterFill');
  const tracker = document.getElementById('scoreTracker');
  const screen = document.getElementById('screen');
  const maximum = 17;

  function updateScoreTracker() {
    const current = Number(state.score) || 0;
    scoreValue.textContent = String(current);
    meterFill.style.width = `${Math.min(100, (current / maximum) * 100)}%`;
    tracker.setAttribute('aria-label', `Pontjaid: ${current} a ${maximum} pontból`);
  }

  const observer = new MutationObserver(updateScoreTracker);
  observer.observe(screen, { childList: true, subtree: true, characterData: true });
  updateScoreTracker();
})();
