// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/score-sheet.js
//
// Az Értékelő lap önálló modulja.
// A meglévő app.js módosítása nélkül kapcsolódik a játékhoz.
// =========================================================

import { getState } from "./state.js";

const SCORE_OVERLAY_ID = "score-sheet-overlay";
const SCORE_BUTTON_ID = "open-score-button";

function calculateTotalScore(score) {
  return score.investigation + score.evidence + score.safety;
}

function getInvestigatorRank(totalScore) {
  if (totalScore >= 80) {
    return {
      title: "Kiváló digitális nyomozó",
      icon: "🏆",
      description:
        "Pontosan felismered az árulkodó részleteket, és biztonságos döntéseket hozol."
    };
  }

  if (totalScore >= 60) {
    return {
      title: "Ügyes digitális nyomozó",
      icon: "🔎",
      description:
        "Jól haladsz a nyomok felismerésében. Néhány részletet még érdemes alaposabban megvizsgálnod."
    };
  }

  if (totalScore >= 30) {
    return {
      title: "Kezdő digitális nyomozó",
      icon: "🕵️",
      description:
        "Már több fontos nyomot észrevettél. Folytasd a vizsgálatot, és gondold végig, mely adatok jelenthetnek kockázatot."
    };
  }

  return {
    title: "A nyomozás még tart",
    icon: "📂",
    description:
      "Keress további nyomokat az ügyekben! Az értékelés a nyomozás előrehaladtával frissül."
  };
}

function getCategoryFeedback(type, points) {
  const feedback = {
    investigation: {
      zero: "Még nem találtál vizsgálati nyomot.",
      started: "Már több árulkodó részletet észrevettél.",
      strong: "Nagyon alaposan vizsgálod meg a képeket és bejegyzéseket."
    },
    evidence: {
      zero: "Még nincs bizonyítékpontod.",
      started: "Kezded felismerni az online azonosítókat és összefüggéseket.",
      strong: "Jól különíted el a megfigyelést és a következtetést."
    },
    safety: {
      zero: "Még nem szereztél védelmi pontot.",
      started: "Már hoztál biztonságosabb online döntést.",
      strong: "Magabiztosan felismered, hogyan csökkenthető egy megosztás kockázata."
    }
  };

  const category = feedback[type];

  if (points === 0) {
    return category.zero;
  }

  if (points >= 30) {
    return category.strong;
  }

  return category.started;
}

function createScoreCategoryCard(config) {
  return `
    <article class="score-category-card">
      <div
        class="score-category-card__icon score-category-card__icon--${config.type}"
        aria-hidden="true"
      >
        ${config.icon}
      </div>

      <div class="score-category-card__content">
        <div class="score-category-card__heading">
          <div>
            <p class="score-category-card__label">${config.label}</p>
            <h3 class="score-category-card__title">${config.title}</h3>
          </div>

          <strong class="score-category-card__points">${config.points}</strong>
        </div>

        <p class="score-category-card__description">${config.description}</p>
        <p class="score-category-card__feedback">
          ${getCategoryFeedback(config.type, config.points)}
        </p>
      </div>
    </article>
  `;
}

function createScoreSheet(state) {
  const totalScore = calculateTotalScore(state.score);
  const rank = getInvestigatorRank(totalScore);

  const categories = [
    {
      type: "investigation",
      icon: "🔍",
      label: "Megfigyelés",
      title: "Nyomozói pont",
      points: state.score.investigation,
      description:
        "Árulkodó részletek felismerése képeken, profilokon és bejegyzésekben."
    },
    {
      type: "evidence",
      icon: "🧩",
      label: "Elemzés",
      title: "Bizonyítékpont",
      points: state.score.evidence,
      description:
        "Online azonosítók, kapcsolatok és következtetések felismerése."
    },
    {
      type: "safety",
      icon: "🛡️",
      label: "Önvédelem",
      title: "Védelmi pont",
      points: state.score.safety,
      description:
        "Biztonságosabb megosztási és adatvédelmi döntések meghozása."
    }
  ];

  return `
    <div class="score-sheet__hero">
      <div class="score-sheet__rank-icon" aria-hidden="true">${rank.icon}</div>

      <div class="score-sheet__rank-content">
        <p class="score-sheet__rank-label">Aktuális nyomozói minősítés</p>
        <h3 class="score-sheet__rank-title">${rank.title}</h3>
        <p class="score-sheet__rank-description">${rank.description}</p>
      </div>

      <div class="score-sheet__total">
        <span>Összpontszám</span>
        <strong>${totalScore}</strong>
      </div>
    </div>

    <div class="score-sheet__statistics">
      <div class="score-stat">
        <span class="score-stat__label">Megtalált nyomok</span>
        <strong class="score-stat__value">${state.foundHotspotIds.length}</strong>
      </div>

      <div class="score-stat">
        <span class="score-stat__label">Rögzített bizonyítékok</span>
        <strong class="score-stat__value">${state.evidenceRecords.length}</strong>
      </div>

      <div class="score-stat">
        <span class="score-stat__label">Lezárt ügyek</span>
        <strong class="score-stat__value">${state.completedCases.length}</strong>
      </div>
    </div>

    <div class="score-sheet__categories">
      ${categories.map(createScoreCategoryCard).join("")}
    </div>

    <div class="score-sheet__note">
      <span aria-hidden="true">ℹ️</span>
      <p>
        A pontszám nem azt mutatja, hogy hibáztál-e, hanem azt,
        hogy a nyomozás mely területein szereztél már tapasztalatot.
      </p>
    </div>
  `;
}

function closeScoreSheet() {
  const overlay = document.querySelector(`#${SCORE_OVERLAY_ID}`);

  if (!overlay) {
    return;
  }

  overlay.classList.add("game-overlay--closing");

  window.setTimeout(() => {
    overlay.remove();
    document.querySelector(`#${SCORE_BUTTON_ID}`)?.focus();
  }, 180);
}

function openScoreSheet() {
  document.querySelector(`#${SCORE_OVERLAY_ID}`)?.remove();

  const state = getState();
  const overlay = document.createElement("div");

  overlay.className = "game-overlay";
  overlay.id = SCORE_OVERLAY_ID;

  overlay.innerHTML = `
    <div class="game-overlay__backdrop" data-close-score-sheet="true"></div>

    <section
      class="game-dialog score-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="score-sheet-title"
    >
      <header class="game-dialog__header">
        <div>
          <p class="game-dialog__eyebrow">Digitális Nyomozóiroda</p>
          <h2 class="game-dialog__title" id="score-sheet-title">Értékelő lap</h2>
          <p class="game-dialog__subtitle">
            A nyomozói teljesítményed aktuális összesítése.
          </p>
        </div>

        <button
          class="game-dialog__close"
          id="close-score-sheet-button"
          type="button"
          aria-label="Értékelő lap bezárása"
        >
          ×
        </button>
      </header>

      <div class="score-sheet__body">
        ${createScoreSheet(state)}
      </div>

      <footer class="game-dialog__footer">
        <p>Az értékelés minden új nyom és döntés után frissül.</p>

        <button
          class="button button--primary"
          id="close-score-sheet-footer-button"
          type="button"
        >
          Vissza a nyomozáshoz
        </button>
      </footer>
    </section>
  `;

  document.body.appendChild(overlay);
  overlay.querySelector("#close-score-sheet-button")?.focus();
}

function ensureScoreButton() {
  const headerRight = document.querySelector(".screen__header-right");

  if (!headerRight || document.querySelector(`#${SCORE_BUTTON_ID}`)) {
    return;
  }

  const button = document.createElement("button");
  button.className = "header-tool-button";
  button.id = SCORE_BUTTON_ID;
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  button.innerHTML = '<span aria-hidden="true">⭐</span> Értékelés';

  headerRight.appendChild(button);
}

function initializeScoreSheet() {
  ensureScoreButton();

  const observer = new MutationObserver(() => {
    ensureScoreButton();
  });

  observer.observe(document.querySelector("#app"), {
    childList: true,
    subtree: true
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest(`#${SCORE_BUTTON_ID}`)) {
      openScoreSheet();
      return;
    }

    if (
      target.closest("#close-score-sheet-button") ||
      target.closest("#close-score-sheet-footer-button") ||
      target.closest("[data-close-score-sheet='true']")
    ) {
      closeScoreSheet();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      document.querySelector(`#${SCORE_OVERLAY_ID}`)
    ) {
      closeScoreSheet();
    }
  });
}

initializeScoreSheet();
