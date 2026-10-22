(() => {
  const data = window.ONLINE_ETIKETT_DATA;
  if (!data) return;

  const aiPersonalData = data.scenarios.find(item => item.label === 'AI és személyes adatok');
  if (aiPersonalData) {
    aiPersonalData.prompt = 'Tanácsot szeretnék kérni egy AI-tól egy osztálytársam problémájáról. Ehhez be kellene másolnom a nevét, a fényképét és a privát üzeneteit.';
    aiPersonalData.question = 'Mit tegyek?';
    aiPersonalData.answers = [
      'Bemásolom az adatokat, mert így pontosabb választ kapok.',
      'Nem osztok meg személyes adatokat; inkább általánosan fogalmazom meg a helyzetet.',
      'Előbb megmutatom a tanárnak, majd bemásolom az adatokat, ha ő is jó ötletnek tartja.'
    ];
    aiPersonalData.correct = 1;
    aiPersonalData.wrong = [
      'A pontosabb válasz sem indokolja, hogy más nevét, fényképét vagy privát üzeneteit feltöltsd.',
      'A segítségkérés jó irány, de más személyes adatait tanári jóváhagyással sem kell bemásolni egy AI-eszközbe.'
    ];
    aiPersonalData.feedback = 'Az AI-nak sem adunk meg másról azonosítható adatokat. A helyzetet név, fénykép és privát üzenetek nélkül, általánosan is meg lehet fogalmazni.';
  }

  function enhanceIntro() {
    const screen = document.getElementById('screen');
    if (!screen) return;

    const lead = screen.querySelector('.intro-copy .lead');
    if (lead && lead.textContent.includes('tanáros mondat')) {
      lead.textContent = 'Néha több válasz is első pillantásra jónak tűnik. Gondold végig, melyik lépés állítja meg a problémát, védi az érintetteket és segít valóban tisztázni a helyzetet.';
    }

    if (screen.querySelector('.intro-copy') && !screen.querySelector('.intro-illustration')) {
      const figure = document.createElement('figure');
      figure.className = 'intro-illustration';
      figure.innerHTML = '<img src="pic06.png" alt="Tanár és diákok az online biztonságról és a felelős AI-használatról beszélgetnek.">';
      screen.querySelector('.intro-copy').insertAdjacentElement('afterend', figure);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('screen');
    if (!screen) return;
    enhanceIntro();
    new MutationObserver(enhanceIntro).observe(screen, { childList: true, subtree: true });
  });
})();
