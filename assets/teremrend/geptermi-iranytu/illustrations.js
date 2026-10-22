(() => {
  const screen = document.getElementById('screen');

  function getCurrentIllustration() {
    if (typeof state === 'undefined' || state.reviewStage !== null) return null;

    if (state.stage === 0) {
      return {
        src: 'pic01.png',
        alt: 'Tanulók és tanár közösen dolgoznak a számítógépteremben.'
      };
    }

    if (state.stage === 2 && state.consequenceIndex === 0) {
      return {
        src: 'pic03.png',
        alt: 'A tanár jelzi, hogy ételt és italt nem szabad a számítógép mellett tartani.'
      };
    }

    if (state.stage === 3 && state.scenarioIndex === 0) {
      return {
        src: 'pic05.png',
        alt: 'Egy tanuló jelzi a tanárnak, hogy hibát észlelt a számítógépnél.'
      };
    }

    if (state.stage === 3 && state.scenarioIndex === 4) {
      return {
        src: 'pic04.png',
        alt: 'A tanár a 3D nyomtató biztonságos használatát mutatja be a tanulóknak.'
      };
    }

    if (state.stage === 3 && state.scenarioIndex === 5) {
      return {
        src: 'pic02.png',
        alt: 'Két tanuló egymást segítve dolgozik egy számítógépnél.'
      };
    }

    return null;
  }

  function placeIllustration() {
    const illustration = getCurrentIllustration();
    const existing = screen.querySelector('.lesson-illustration');

    if (!illustration) {
      if (existing) existing.remove();
      return;
    }

    if (existing && existing.dataset.src === illustration.src) return;
    if (existing) existing.remove();

    const figure = document.createElement('figure');
    figure.className = `lesson-illustration lesson-illustration-stage-${state.stage}`;
    figure.dataset.src = illustration.src;
    figure.innerHTML = `<img src="${illustration.src}" alt="${illustration.alt}" loading="eager">`;

    if (state.stage === 0) {
      const intro = screen.querySelector('.intro-layout');
      if (intro) intro.insertAdjacentElement('afterend', figure);
      else screen.prepend(figure);
      return;
    }

    const situation = screen.querySelector('.situation-card');
    const heading = screen.querySelector('h2');
    if (situation) situation.insertAdjacentElement('afterend', figure);
    else if (heading) heading.insertAdjacentElement('afterend', figure);
    else screen.prepend(figure);
  }

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      placeIllustration();
    });
  });

  observer.observe(screen, { childList: true, subtree: true });
  placeIllustration();
})();
