// =========================================================
// DIGITÁLIS NYOMOZÓIRODA – stabil minőségi javítások
// Observer és automatikus újraellenőrzés nélkül.
// =========================================================

function ensureCertificateButtons() {
  const report = document.querySelector(".final-report");
  const finishButton = report?.querySelector("#final-finish");

  if (report && finishButton && !report.querySelector("#open-certificate")) {
    const certificateButton = document.createElement("button");
    certificateButton.type = "button";
    certificateButton.id = "open-certificate";
    certificateButton.className = "button button--secondary final-report__certificate-button";
    certificateButton.textContent = "Nyomozói oklevél";
    finishButton.insertAdjacentElement("beforebegin", certificateButton);
  }

  const finalHeader = document.querySelector(".final-case__header");
  if (report && finalHeader && !finalHeader.querySelector("#open-certificate-header")) {
    const headerButton = document.createElement("button");
    headerButton.type = "button";
    headerButton.id = "open-certificate-header";
    headerButton.className = "button button--secondary final-header-certificate";
    headerButton.textContent = "Oklevél";
    finalHeader.querySelector(".final-close")?.insertAdjacentElement("beforebegin", headerButton);
  }
}

function refreshStableEnhancements() {
  ensureCertificateButtons();
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest("#open-certificate-header")) {
    event.preventDefault();
    document.querySelector("#open-certificate")?.click();
    return;
  }

  queueMicrotask(refreshStableEnhancements);
}, true);

window.addEventListener("digital-investigation:state-change", () => {
  queueMicrotask(refreshStableEnhancements);
});

refreshStableEnhancements();