// =========================================================
// DIGITÁLIS NYOMOZÓIRODA – SCORM folytatás képernyőszinkron
// Csak sikeres SCORM-visszatöltés után fut le.
// =========================================================

const RESTORED_EVENT = "digital-investigation:scorm-restored";

function clickWhenAvailable(selector, attemptsLeft = 8) {
  const element = document.querySelector(selector);
  if (element instanceof HTMLElement && !element.hasAttribute("disabled")) {
    element.click();
    return Promise.resolve(true);
  }

  if (attemptsLeft <= 0) return Promise.resolve(false);

  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      resolve(clickWhenAvailable(selector, attemptsLeft - 1));
    });
  });
}

async function restoreVisibleScreen(state) {
  const screen = state?.currentScreen || "intro";

  if (screen === "intro") return;

  const started = await clickWhenAvailable("#start-button");
  if (!started || screen === "briefing") return;

  const continued = await clickWhenAvailable("#continue-button");
  if (!continued || screen === "headquarters") return;

  if (screen === "social-post-case") {
    await clickWhenAvailable('[data-case-id="social-post"]');
  }
}

window.addEventListener(RESTORED_EVENT, (event) => {
  restoreVisibleScreen(event.detail?.state).then(() => {
    console.info("[Digitális Nyomozóiroda · SCORM] A mentett képernyő megjelenítése elkészült.");
  });
});
