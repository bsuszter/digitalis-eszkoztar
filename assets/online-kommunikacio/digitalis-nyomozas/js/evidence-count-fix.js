// A Nyomozói lapon csak az aktuálisan összegyűjtött nyomok száma jelenjen meg.
// Nem használunk rögzített nevezőt, mert az ügyek bővülésével az félrevezető lenne.

import { getState } from "./state.js";

function simplifyEvidenceSummary() {
  const summary = document.querySelector(".evidence-notebook__summary");

  if (!summary) {
    return;
  }

  const countElement = summary.querySelector("strong");
  const progressElement = summary.querySelector(".evidence-notebook__progress");
  const evidenceCount = getState().evidenceRecords.length;

  if (countElement) {
    countElement.textContent = String(evidenceCount);
    countElement.setAttribute(
      "aria-label",
      `${evidenceCount} összegyűjtött nyom`
    );
  }

  progressElement?.remove();
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  if (target.closest("#open-evidence-button")) {
    queueMicrotask(simplifyEvidenceSummary);
  }
});
