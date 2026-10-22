// =========================================================
// DIGITÁLIS NYOMOZÓIRODA – eligazítás illusztráció
// Observer nélkül, csak konkrét képernyőváltások után fut.
// =========================================================

function addBriefingIllustration() {
  const title = document.querySelector("#briefing-title");
  const content = title?.closest(".screen__content");
  const summary = content?.querySelector(".case-summary");

  if (!content || !summary || content.querySelector("#briefing-illustration")) {
    return;
  }

  const illustration = document.createElement("section");
  illustration.id = "briefing-illustration";
  illustration.className = "briefing-illustration briefing-illustration--image";
  illustration.setAttribute(
    "aria-label",
    "Digitális nyomozó egy ügytábla előtt, összekapcsolt internetes nyomokkal"
  );

  illustration.innerHTML = `
    <div class="briefing-artwork">
      <img
        src="assets/images/pic02.png"
        alt="Digitális nyomozó egy sötét ügytábla előtt, amelyen közösségi poszt, játékprofil és nyilvános hozzászólás kapcsolódik össze"
        loading="eager"
        decoding="async"
      >
    </div>
    <div class="briefing-illustration__text">
      <p class="eyebrow">Három nyom · egy történet</p>
      <h3>Kapcsold össze az apró részleteket!</h3>
      <p>Egy felhasználónév, egy kép háttere vagy egy időpont önmagában kevésnek tűnhet. A nyomozó feladata felismerni, hogyan egészítik ki egymást.</p>
    </div>`;

  summary.insertAdjacentElement("beforebegin", illustration);
}

function scheduleBriefingIllustration() {
  window.setTimeout(addBriefingIllustration, 0);
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest("#start-button, #headquarters-back-button, #continue-button")) {
    scheduleBriefingIllustration();
  }
}, true);

window.addEventListener("digital-investigation:state-change", scheduleBriefingIllustration);

addBriefingIllustration();
