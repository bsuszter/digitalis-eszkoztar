// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/hotspots.js
//
// Ez a modul kezeli a képeken elhelyezett kattintható nyomokat.
// =========================================================

export function initializeHotspots({
  container,
  hotspots,
  foundHotspotIds = [],
  onHotspotFound
}) {
  if (!container) {
    console.error(
      "A hotspotok nem indíthatók el: hiányzik a képtartó elem."
    );

    return;
  }

  hotspots.forEach((hotspot) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "hotspot";
    button.dataset.hotspotId = hotspot.id;

    button.style.left = `${hotspot.x}%`;
    button.style.top = `${hotspot.y}%`;
    button.style.width = `${hotspot.width}%`;
    button.style.height = `${hotspot.height}%`;

    button.setAttribute(
      "aria-label",
      `Nyom keresése: ${hotspot.accessibleLabel}`
    );

    const wasAlreadyFound =
      foundHotspotIds.includes(hotspot.id);

    if (wasAlreadyFound) {
      markHotspotAsFound(button);
    }

    button.addEventListener("click", () => {
      if (button.dataset.found === "true") {
        return;
      }

      markHotspotAsFound(button);

      if (typeof onHotspotFound === "function") {
        onHotspotFound(hotspot);
      }
    });

    container.appendChild(button);
  });
}

function markHotspotAsFound(button) {
  button.dataset.found = "true";
  button.classList.add("hotspot--found");
  button.disabled = true;

  button.innerHTML = `
    <span
      class="hotspot__marker"
      aria-hidden="true"
    >
      ✓
    </span>
  `;
}