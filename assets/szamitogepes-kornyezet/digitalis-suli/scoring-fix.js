(() => {
  const originalCheckTeamsOrder = checkTeamsOrder;

  checkTeamsOrder = function checkTeamsOrderWithAttemptScoring() {
    state.teamsAttempts = (state.teamsAttempts || 0) + 1;

    if (state.teamsOrder.length !== data.teamsSteps.length) {
      document.getElementById('feedback').innerHTML = '<div class="feedback bad">Minden lépést helyezz sorrendbe!</div>';
      return;
    }

    const correct = state.teamsOrder.every((value, index) => value === index);
    if (!correct) {
      document.getElementById('feedback').innerHTML = '<div class="feedback bad">A folyamat még nem jó. Előbb lépj be és keresd meg a feladatot, csak ezután dolgozz és add be!</div>';
      return;
    }

    if (!state.teamsScored && state.teamsAttempts === 1) {
      state.score += 2;
    }
    state.teamsScored = true;

    updateProgress(4);
    document.querySelectorAll('.sequence-card, #checkOrder').forEach(button => button.disabled = true);
    document.getElementById('feedback').innerHTML = `
      <div class="feedback good"><strong>Kész!</strong> A beadás előtt mindig ellenőrizd a fiókot, az utasítást, a határidőt és a mentést.</div>
      <div class="actions"><button class="primary" id="finish">Tovább az iránytűhöz →</button></div>`;
    document.getElementById('finish').addEventListener('click', () => setStage(5));
  };
})();
