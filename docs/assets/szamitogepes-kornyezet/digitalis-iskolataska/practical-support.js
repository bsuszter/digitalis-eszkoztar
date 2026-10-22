(() => {
  const screen = document.getElementById('screen');
  if (!screen) return;

  function screenshotMarkup(step) {
    return `
      <figure class="practical-shot">
        <img src="${step.screenshot}" alt="${step.title} – képernyőkép" onerror="this.closest('figure').remove()">
      </figure>`;
  }

  function addPracticalSupport() {
    const card = screen.querySelector('.practical-card');
    if (!card || card.dataset.enhanced === 'true') return;

    const steps = window.DIGITASKA_DATA?.practicalSteps || [];
    if (!steps.length) return;

    card.dataset.enhanced = 'true';
    card.innerHTML = `
      <div class="practical-heading">
        <div>
          <span class="practical-kicker">🖥️ VALÓDI GÉPES FELADAT</span>
          <h2>Készítsd el a saját digitális iskolatáskádat!</h2>
          <p>Haladj önállóan a lépések szerint. A részletes segítséget csak akkor nyisd le, ha szükséged van rá.</p>
        </div>
        <div class="practical-goal">🎯 <strong>A cél:</strong> saját névvel ellátott mappa, benne legalább négy tantárgyi almappa.</div>
      </div>

      <div class="drive-note">
        <span>💾</span>
        <div>
          <strong>Keresd az Adat meghajtót!</strong>
          <p>Ennek a betűjele a legtöbb gépen <strong>D:</strong>, de ettől eltérhet. A meghajtó <strong>nevét</strong> figyeld, ne csak a betűjelét!</p>
        </div>
      </div>

      <div class="mouse-legend" aria-label="Egérhasználati jelmagyarázat">
        <span><b class="mouse left">L</b> Bal kattintás: kijelölés vagy megnyitás</span>
        <span><b class="mouse right">J</b> Jobb kattintás: helyi menü megnyitása</span>
      </div>

      <div class="practical-steps">
        ${steps.map((step, index) => `
          <article class="practical-step">
            <div class="practical-step-main">
              <span class="practical-step-icon">${step.icon}</span>
              <div>
                <h3>${index + 1}. ${step.title}</h3>
                <p>${step.action}</p>
              </div>
            </div>
            <details>
              <summary>💡 Részletes segítség és képernyőkép</summary>
              <p>${step.help}</p>
              ${screenshotMarkup(step)}
            </details>
          </article>
        `).join('')}
      </div>

      <fieldset class="practical-finish">
        <legend>✅ Készen vagy, ha…</legend>
        <label><input type="checkbox"> <span>a saját mappád az Adat meghajtón vagy a tanár által megadott helyen van;</span></label>
        <label><input type="checkbox"> <span>benne legalább négy jól elnevezett tantárgyi mappa látható;</span></label>
        <label><input type="checkbox"> <span>meg tudod mutatni, milyen útvonalon jutottál el a saját mappádhoz;</span></label>
        <label><input type="checkbox"> <span>ellenőrizted a neveket, és a kész szerkezetet megmutattad a tanárnak.</span></label>
      </fieldset>
    `;
  }

  function enhance() {
    addPracticalSupport();
  }

  new MutationObserver(enhance).observe(screen, { childList: true, subtree: true });
  enhance();
})();
