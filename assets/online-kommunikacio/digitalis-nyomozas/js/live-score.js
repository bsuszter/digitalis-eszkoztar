// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/live-score.js
//
// A fejlécben látható összpontszámot azonnal frissíti,
// amikor a központi játékállapot megváltozik.
// =========================================================

import { getState } from "./state.js";

const STATE_CHANGE_EVENT = "digital-investigation:state-change";

function calculateTotalScore() {
  const { score } = getState();
  return score.investigation + score.evidence + score.safety;
}

function updateVisibleScore() {
  const scoreDisplay = document.querySelector(".score-display");

  if (!scoreDisplay) {
    return;
  }

  const totalScore = calculateTotalScore();
  const valueElement = scoreDisplay.querySelector("strong");

  if (valueElement) {
    valueElement.textContent = String(totalScore);
  }

  scoreDisplay.setAttribute("aria-label", `${totalScore} nyomozói pont`);
}

window.addEventListener(STATE_CHANGE_EVENT, updateVisibleScore);

document.addEventListener("DOMContentLoaded", updateVisibleScore);

const appObserver = new MutationObserver(() => {
  updateVisibleScore();
});

const appElement = document.querySelector("#app");

if (appElement) {
  appObserver.observe(appElement, {
    childList: true,
    subtree: true
  });
}

updateVisibleScore();
