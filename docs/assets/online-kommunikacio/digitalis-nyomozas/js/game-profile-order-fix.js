// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// 2. ügy – stabil, véletlen nyomsorrend MutationObserver nélkül.
//
// Minden ügymegnyitáskor egyszer keverünk. Minden választás
// és ellenőrzés ELŐTT eltároljuk a ténylegesen látható sorrendet,
// majd az újrarenderelés UTÁN pontosan ezt állítjuk vissza.
// =========================================================

let clueOrder = [];
let currentOverlay = null;

function shuffle(values) {
  const result = [...values];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function getClueId(row) {
  return row.querySelector("select[data-clue-id]")?.dataset.clueId || "";
}

function readVisibleOrder() {
  const list = document.querySelector(
    "#game-profile-overlay .profile-clue-list"
  );

  if (!list) {
    return [];
  }

  return [...list.querySelectorAll(":scope > .profile-clue-row")]
    .map(getClueId)
    .filter(Boolean);
}

function applyClueOrder() {
  const overlay = document.querySelector("#game-profile-overlay");

  if (!overlay) {
    return false;
  }

  if (overlay !== currentOverlay) {
    currentOverlay = overlay;
    clueOrder = [];
  }

  const list = overlay.querySelector(".profile-clue-list");
  const rows = list
    ? [...list.querySelectorAll(":scope > .profile-clue-row")]
    : [];

  if (!list || rows.length === 0) {
    return false;
  }

  const availableIds = rows.map(getClueId).filter(Boolean);

  if (clueOrder.length === 0) {
    clueOrder = shuffle(availableIds);
  }

  const rowsById = new Map(
    rows.map((row) => [getClueId(row), row])
  );

  clueOrder.forEach((clueId) => {
    const row = rowsById.get(clueId);

    if (row) {
      list.appendChild(row);
    }
  });

  return true;
}

function scheduleOrder(attempt = 0) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const applied = applyClueOrder();

      if (!applied && attempt < 5) {
        scheduleOrder(attempt + 1);
      }
    });
  });
}

// Új ügymegnyitáskor új véletlen sorrend készül.
document.addEventListener(
  "pointerdown",
  (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('[data-case-id="game-profile"]')) {
      currentOverlay = null;
      clueOrder = [];
      scheduleOrder();
    }
  },
  true
);

// Capture fázisban még azelőtt eltároljuk a látható sorrendet,
// hogy a game-profile.js újrarenderelné a munkaterületet.
document.addEventListener(
  "change",
  (event) => {
    const target = event.target;

    if (
      target instanceof HTMLSelectElement &&
      target.matches("select[data-clue-id]")
    ) {
      const visibleOrder = readVisibleOrder();

      if (visibleOrder.length > 0) {
        clueOrder = visibleOrder;
      }

      scheduleOrder();
    }
  },
  true
);

// Az ellenőrzőgombok előtt is megőrizzük a tényleges sorrendet.
document.addEventListener(
  "pointerdown",
  (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (
      target.closest(
        "#game-profile-check-clues, " +
          "#game-profile-check-conclusion, " +
          "#game-profile-check-safety"
      )
    ) {
      const visibleOrder = readVisibleOrder();

      if (visibleOrder.length > 0) {
        clueOrder = visibleOrder;
      }

      scheduleOrder();
    }
  },
  true
);
