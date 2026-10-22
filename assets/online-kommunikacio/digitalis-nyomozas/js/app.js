// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/app.js
//
// A játék belépési pontja.
// Megjeleníti a képernyőket, kezeli a navigációt,
// az első interaktív ügyet és a pontozást.
// =========================================================

import { GAME_DATA } from "./data.js";

import {
    getState,
    setCurrentScreen,
    setActiveCase,
    openOverlay,
    closeOverlay,
    addEvidenceRecord,
    addScore,
    addFoundHotspot,
    setSelectedSafetyOptions,
    ensureSafetyOptionOrder,
    getSafetyOptionOrder,
    completeCase,
    isCaseCompleted,
    resetState
} from "./state.js";

import {
    initializeHotspots
} from "./hotspots.js";

const appElement = document.querySelector("#app");

/**
 * Közös fejléc létrehozása.
 *
 * @param {string} statusText
 * @returns {string}
 */
function createHeader(statusText) {
    const state = getState();

    const totalScore =
        state.score.investigation +
        state.score.evidence +
        state.score.safety;

    return `
    <header class="screen__header">
      <div class="screen__brand">
        <span
          class="screen__brand-mark"
          aria-hidden="true"
        >
          DN
        </span>

        <span>
          ${GAME_DATA.title}
        </span>
      </div>

      <div class="screen__header-right">
        <div class="screen__status">
          ${statusText}
        </div>

        <div
          class="score-display"
          aria-label="${totalScore} nyomozói pont"
        >
          <span aria-hidden="true">★</span>
          <strong>${totalScore}</strong>
        </div>
        <button
  class="header-tool-button"
  id="open-evidence-button"
  type="button"
  aria-haspopup="dialog"
>
  <span aria-hidden="true">📋</span>
  Nyomozói lap
</button>
      </div>
    </header>
  `;
}

/**
 * Biztossági szinthez tartozó CSS-osztály.
 *
 * @param {string} certainty
 * @returns {string}
 */
function getCertaintyClass(certainty) {
  const normalizedCertainty =
    certainty.toLowerCase();

  if (
    normalizedCertainty.includes("biztos") &&
    !normalizedCertainty.includes("valószínű")
  ) {
    return "certainty-badge--certain";
  }

  if (
    normalizedCertainty.includes("valószínű") ||
    normalizedCertainty.includes("következtetés")
  ) {
    return "certainty-badge--inference";
  }

  return "certainty-badge--neutral";
}

/**
 * Egy bizonyítékkártya HTML-jének létrehozása.
 *
 * @param {object} record
 * @param {number} index
 * @returns {string}
 */
function createEvidenceRecordCard(
  record,
  index
) {
  const certaintyClass =
    getCertaintyClass(record.certainty);

  return `
    <article class="evidence-record">
      <div class="evidence-record__number">
        ${index + 1}
      </div>

      <div class="evidence-record__content">
        <div class="evidence-record__heading">
          <h3 class="evidence-record__title">
            ${record.title}
          </h3>

          <span
            class="
              certainty-badge
              ${certaintyClass}
            "
          >
            ${record.certainty}
          </span>
        </div>

        <p class="evidence-record__description">
          ${record.description}
        </p>

        <p class="evidence-record__source">
          <strong>Forrás:</strong>
          ${record.source}
        </p>
      </div>
    </article>
  `;
}

/**
 * A Nyomozói lap tartalmának létrehozása.
 *
 * @param {Array<object>} records
 * @returns {string}
 */
function createEvidenceRecords(records) {
  if (records.length === 0) {
    return `
      <div class="evidence-notebook__empty">
        <span
          class="evidence-notebook__empty-icon"
          aria-hidden="true"
        >
          🔍
        </span>

        <h3>
          A Nyomozói lap még üres
        </h3>

        <p>
          Vizsgáld meg a bizonyítékokat!
          A megtalált nyomok automatikusan
          bekerülnek ide.
        </p>
      </div>
    `;
  }

  return records
    .map((record, index) => {
      return createEvidenceRecordCard(
        record,
        index
      );
    })
    .join("");
}

/**
 * Megjeleníti az aktuálisan megnyitott felugró lapot.
 */
function renderActiveOverlay() {
  const existingOverlay =
    document.querySelector(
      "#game-overlay"
    );

  if (existingOverlay) {
    existingOverlay.remove();
  }

  const state = getState();

  if (state.activeOverlay !== "evidence") {
    return;
  }

  const foundEvidenceCount =
    state.evidenceRecords.length;

  const totalEvidenceCount =
    GAME_DATA.socialPostCase.totalHotspots;

  const overlay = document.createElement("div");

  overlay.className = "game-overlay";
  overlay.id = "game-overlay";

  overlay.innerHTML = `
    <div
      class="game-overlay__backdrop"
      data-close-overlay="true"
    ></div>

    <section
      class="game-dialog evidence-notebook"
      role="dialog"
      aria-modal="true"
      aria-labelledby="evidence-notebook-title"
    >
      <header class="game-dialog__header">
        <div>
          <p class="game-dialog__eyebrow">
            Digitális Nyomozóiroda
          </p>

          <h2
            class="game-dialog__title"
            id="evidence-notebook-title"
          >
            Nyomozói lap
          </h2>

          <p class="game-dialog__subtitle">
            Az eddig összegyűjtött nyomok és
            megállapítások.
          </p>
        </div>

        <button
          class="game-dialog__close"
          id="close-overlay-button"
          type="button"
          aria-label="Nyomozói lap bezárása"
        >
          ×
        </button>
      </header>

      <div class="evidence-notebook__summary">
        <div>
          <span class="evidence-notebook__summary-label">
            Összegyűjtött nyomok
          </span>

          <strong>
            ${foundEvidenceCount}
            /
            ${totalEvidenceCount}
          </strong>
        </div>

        <div
          class="evidence-notebook__progress"
          aria-label="
            ${foundEvidenceCount}
            nyom megtalálva
            ${totalEvidenceCount}
            nyomból
          "
        >
          <span
            style="
              width:
              ${
                totalEvidenceCount > 0
                  ? (
                    foundEvidenceCount /
                    totalEvidenceCount
                  ) * 100
                  : 0
              }%;
            "
          ></span>
        </div>
      </div>

      <div class="evidence-notebook__body">
        ${createEvidenceRecords(
          state.evidenceRecords
        )}
      </div>

      <footer class="game-dialog__footer">
        <p>
          A biztos adatokat és a következtetéseket
          érdemes külön kezelni.
        </p>

        <button
          class="button button--primary"
          id="close-overlay-footer-button"
          type="button"
        >
          Vissza a nyomozáshoz
        </button>
      </footer>
    </section>
  `;

  document.body.appendChild(overlay);

  const closeButton =
    overlay.querySelector(
      "#close-overlay-button"
    );

  closeButton?.focus();
}

/**
 * Bezárja az aktuális felugró lapot.
 */
function closeActiveOverlay() {
  closeOverlay();

  const overlay =
    document.querySelector(
      "#game-overlay"
    );

  if (!overlay) {
    return;
  }

  overlay.classList.add(
    "game-overlay--closing"
  );

  window.setTimeout(() => {
    overlay.remove();

    const openButton =
      document.querySelector(
        "#open-evidence-button"
      );

    openButton?.focus();
  }, 180);
}

/**
 * A felugró lapok globális eseményeinek kezelése.
 *
 * Az eseménydelegálás miatt a rendszer
 * minden újrarenderelés után is működik.
 */
function initializeOverlayActions() {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const openEvidenceButton =
        target.closest(
          "#open-evidence-button"
        );

      if (openEvidenceButton) {
        openOverlay("evidence");
        renderActiveOverlay();
        return;
      }

      const closeButton =
        target.closest(
          "#close-overlay-button"
        );

      const footerCloseButton =
        target.closest(
          "#close-overlay-footer-button"
        );

      const backdrop =
        target.closest(
          "[data-close-overlay='true']"
        );

      if (
        closeButton ||
        footerCloseButton ||
        backdrop
      ) {
        closeActiveOverlay();
      }
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      const state = getState();

      if (!state.activeOverlay) {
        return;
      }

      closeActiveOverlay();
    }
  );
}

/**
 * A kezdőképernyő megjelenítése.
 */
function renderIntroScreen() {
    const { intro } = GAME_DATA;

    appElement.innerHTML = `
    <section
      class="screen"
      aria-labelledby="intro-title"
    >
      ${createHeader(`Verzió: ${GAME_DATA.version}`)}

      <div class="screen__content">
        <p class="eyebrow">
          ${intro.eyebrow}
        </p>

        <h1 id="intro-title">
          ${intro.title}
        </h1>

        <p class="lead">
          ${intro.description}
        </p>

        <div class="mission-card">
          <p class="mission-card__label">
            ${intro.missionLabel}
          </p>

          <p>
            ${intro.missionText}
          </p>
        </div>

        <div class="actions">
          <button
            class="button button--primary"
            id="start-button"
            type="button"
          >
            Küldetés indítása
          </button>
        </div>
      </div>
    </section>
  `;

    document
        .querySelector("#start-button")
        .addEventListener("click", () => {
            setCurrentScreen("briefing");
            renderCurrentScreen();
        });
}

/**
 * A nyomozói eligazítás megjelenítése.
 */
function renderBriefingScreen() {
    const { briefing } = GAME_DATA;

    const stepCards = briefing.steps
        .map((step) => {
            return `
        <article class="case-summary__item">
          <span class="case-summary__number">
            ${step.number}
          </span>

          <span class="case-summary__label">
            ${step.label}
          </span>
        </article>
      `;
        })
        .join("");

    appElement.innerHTML = `
    <section
      class="screen"
      aria-labelledby="briefing-title"
    >
      ${createHeader("Eligazítás")}

      <div class="screen__content">
        <p class="eyebrow">
          ${briefing.eyebrow}
        </p>

        <h2 id="briefing-title">
          ${briefing.title}
        </h2>

        <p class="lead">
          ${briefing.description}
        </p>

        <div class="case-summary">
          ${stepCards}
        </div>

        <div class="actions">
          <button
            class="button button--primary"
            id="continue-button"
            type="button"
          >
            Értem, tovább
          </button>

          <button
            class="button button--secondary"
            id="back-button"
            type="button"
          >
            Vissza
          </button>
        </div>
      </div>
    </section>
  `;

    document
        .querySelector("#continue-button")
        .addEventListener("click", () => {
            setCurrentScreen("headquarters");
            renderCurrentScreen();
        });

    document
        .querySelector("#back-button")
        .addEventListener("click", () => {
            setCurrentScreen("intro");
            renderCurrentScreen();
        });
}

/**
 * Egy ügykártya HTML-kódjának létrehozása.
 *
 * @param {object} caseItem
 * @returns {string}
 */
function createCaseCard(caseItem) {
    const completed =
        isCaseCompleted(caseItem.id);

    const isLocked =
        caseItem.status === "locked" && !completed;

    let statusText = "Elérhető";
    let buttonText = "Ügy megnyitása";
    let cardStateClass = "case-card--unlocked";

    if (completed) {
        statusText = "Lezárva";
        buttonText = "Ügy megtekintése";
        cardStateClass = "case-card--completed";
    } else if (isLocked) {
        statusText = "Zárolva";
        buttonText = "Lezárt ügy";
        cardStateClass = "case-card--locked";
    }

    return `
    <article
      class="case-card ${cardStateClass}"
    >
      <div class="case-card__top">
        <span class="case-card__number">
          ${caseItem.number}
        </span>

        <span class="case-card__status">
          ${statusText}
        </span>
      </div>

      <div
        class="case-card__icon"
        aria-hidden="true"
      >
        ${caseItem.icon}
      </div>

      <p class="case-card__subtitle">
        ${caseItem.subtitle}
      </p>

      <h3 class="case-card__title">
        ${caseItem.title}
      </h3>

      <p class="case-card__description">
        ${caseItem.description}
      </p>

      <button
        class="button ${isLocked
            ? "button--secondary"
            : "button--primary"
        } case-card__button"
        type="button"
        data-case-id="${caseItem.id}"
        ${isLocked ? "disabled" : ""}
      >
        ${buttonText}
      </button>
    </article>
  `;
}

/**
 * A Nyomozói Központ megjelenítése.
 */
function renderHeadquartersScreen() {
    const { headquarters } = GAME_DATA;

    const caseCards = headquarters.cases
        .map((caseItem) => {
            return createCaseCard(caseItem);
        })
        .join("");

    const completedCount =
        getState().completedCases.length;

    const totalCaseCount =
        headquarters.cases.length;

    appElement.innerHTML = `
    <section
      class="screen"
      aria-labelledby="headquarters-title"
    >
      ${createHeader("Nyomozói Központ")}

      <div class="screen__content">
        <p class="eyebrow">
          ${headquarters.eyebrow}
        </p>

        <h2 id="headquarters-title">
          ${headquarters.title}
        </h2>

        <p class="lead">
          ${headquarters.description}
        </p>

        <div class="progress-panel">
          <div>
            <p class="progress-panel__label">
              ${headquarters.progressLabel}
            </p>

            <p class="progress-panel__value">
              ${completedCount} / ${totalCaseCount}
              ügy lezárva
            </p>
          </div>

          <div
            class="progress-panel__bar"
            aria-hidden="true"
          >
            <span
              class="progress-panel__fill"
              style="width: ${(completedCount / totalCaseCount) * 100
        }%;"
            ></span>
          </div>
        </div>

        <div class="case-grid">
          ${caseCards}
        </div>

        <div class="actions">
          <button
            class="button button--secondary"
            id="headquarters-back-button"
            type="button"
          >
            Vissza az eligazításhoz
          </button>
        </div>
      </div>
    </section>
  `;

    document
        .querySelector("#headquarters-back-button")
        .addEventListener("click", () => {
            setCurrentScreen("briefing");
            renderCurrentScreen();
        });

    const availableCaseButtons =
        document.querySelectorAll(
            ".case-card__button:not(:disabled)"
        );

    availableCaseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCaseId =
                button.dataset.caseId;

            if (selectedCaseId === "social-post") {
                setActiveCase(selectedCaseId);
                setCurrentScreen("social-post-case");
                renderCurrentScreen();
                return;
            }

            window.alert(
                "Ez az ügy még fejlesztés alatt áll."
            );
        });
    });
}

/**
 * A megtalált nyomok listájának létrehozása.
 *
 * @param {Array<object>} hotspots
 * @param {Array<string>} foundHotspotIds
 * @returns {string}
 */
function createEvidenceList(
    hotspots,
    foundHotspotIds
) {
    const foundHotspots =
        hotspots.filter((hotspot) => {
            return foundHotspotIds.includes(
                hotspot.id
            );
        });

    if (foundHotspots.length === 0) {
        return `
      <p class="evidence-empty">
        ${GAME_DATA.socialPostCase
                .evidenceSummary.emptyMessage}
      </p>
    `;
    }

    return `
    <ul class="evidence-list">
      ${foundHotspots
            .map((hotspot, index) => {
                return `
            <li class="evidence-list__item">
              <span
                class="evidence-list__number"
                aria-hidden="true"
              >
                ${index + 1}
              </span>

              <div class="evidence-list__content">
                <strong>
                  ${hotspot.title}
                </strong>

                <span>
                  ${hotspot.category}
                </span>
              </div>

              <span
                class="evidence-list__check"
                aria-label="Megtalálva"
              >
                ✓
              </span>
            </li>
          `;
            })
            .join("")}
    </ul>
  `;
}


/**
 * A biztonsági feladat válaszainak létrehozása.
 *
 * @param {object} safetyTask
 * @param {Array<string>} selectedIds
 * @param {boolean} enabled
 * @param {boolean} completed
 * @param {Array<string>} optionOrder
 * @returns {string}
 */
function createSafetyOptions(
    safetyTask,
    selectedIds,
    enabled,
    completed,
    optionOrder
) {
    const orderedOptions = optionOrder
        .map((optionId) => {
            return safetyTask.options.find(
                (option) => option.id === optionId
            );
        })
        .filter(Boolean);

    return orderedOptions
        .map((option) => {
            const checked =
                selectedIds.includes(option.id);

            let optionClass =
                "safety-option";

            if (completed && option.isCorrect) {
                optionClass +=
                    " safety-option--correct";
            }

            return `
        <label class="${optionClass}">
          <input
            type="checkbox"
            name="safety-option"
            value="${option.id}"
            ${checked ? "checked" : ""}
            ${!enabled || completed
                    ? "disabled"
                    : ""
                }
          >

          <span>
            ${option.text}
          </span>
        </label>
      `;
        })
        .join("");
}

/**
 * Az első interaktív ügy megjelenítése.
 */
function renderSocialPostCase() {
    const caseData =
        GAME_DATA.socialPostCase;

    const state = getState();

    const foundCount =
        state.foundHotspotIds.length;

    const allHotspotsFound =
        foundCount >= caseData.totalHotspots;

    const caseCompleted =
        isCaseCompleted(caseData.id);
    if (allHotspotsFound) {
        ensureSafetyOptionOrder(
            caseData.safetyTask.options.map(
                (option) => option.id
            )
        );
    }

    const safetyOptionOrder =
        getSafetyOptionOrder();

    const progressPercent =
        (foundCount / caseData.totalHotspots) *
        100;

    const evidenceList =
        createEvidenceList(
            caseData.hotspots,
            state.foundHotspotIds
        );

    const safetyOptions =
        createSafetyOptions(
            caseData.safetyTask,
            state.selectedSafetyOptionIds,
            allHotspotsFound,
            caseCompleted,
            safetyOptionOrder
        );

    appElement.innerHTML = `
    <section
      class="screen screen--case"
      aria-labelledby="social-case-title"
    >
      ${createHeader(
        `Aktív ügy: ${caseData.number}`
    )}

      <div class="case-screen__content">
        <div class="case-screen__main">
          <p class="eyebrow">
            ${caseData.eyebrow}
          </p>

          <h2 id="social-case-title">
            ${caseData.number}.
            ${caseData.title}
          </h2>

          <p class="lead">
            ${caseData.instruction}
          </p>

          <div
            class="clue-image-wrapper"
            id="clue-image-wrapper"
          >
            <img
              class="clue-image"
              src="${caseData.image.src}"
              alt="${caseData.image.alt}"
            >
          </div>

          <div class="case-hint">
            <span
              class="case-hint__icon"
              aria-hidden="true"
            >
              💡
            </span>

            <div>
              <strong>
                ${caseData.hotspotInstruction}
              </strong>

              <span>
                Minden megtalált nyomnál
                azonnali visszajelzést kapsz.
              </span>
            </div>
          </div>
        </div>

        <aside class="case-screen__sidebar">
          <section class="case-panel">
            <h3 class="case-panel__title">
              Ügy állása
            </h3>

            <p class="case-progress__text">
              ${foundCount} /
              ${caseData.totalHotspots}
              nyom megtalálva
            </p>

            <div class="case-progress__bar">
              <span
                class="case-progress__fill"
                style="width: ${progressPercent}%;"
              ></span>
            </div>
          </section>

          <section class="case-panel">
            <h3 class="case-panel__title">
              ${caseData.evidenceSummary.title}
            </h3>

            <div id="evidence-list-container">
              ${evidenceList}
            </div>
          </section>

${allHotspotsFound
            ? `
      <section
        class="case-panel case-panel--unlocked"
        id="safety-task-panel"
      >
        <h3 class="case-panel__title">
          ${caseData.safetyTask.title}
        </h3>

        <p class="safety-task__question">
          ${caseData.safetyTask.question}
        </p>

        <p class="safety-task__instruction">
          ${caseData.safetyTask.instruction}
        </p>

        <div
          class="safety-options"
          id="safety-options"
        >
          ${safetyOptions}
        </div>

        <p
          class="selection-counter"
          id="selection-counter"
        >
          Kiválasztva:
          ${state.selectedSafetyOptionIds.length}
          /
          ${caseData.safetyTask
                .requiredSelectionCount}
        </p>

        <button
          class="button button--primary"
          id="check-safety-button"
          type="button"
          ${caseCompleted ? "disabled" : ""}
        >
          ${caseCompleted
                ? "Ügy lezárva"
                : "Ellenőrzés"
            }
        </button>

        <div
          class="task-feedback"
          id="task-feedback"
          aria-live="polite"
        >
          ${caseCompleted
                ? `
                <p class="feedback feedback--success">
                  Sikeresen lezártad az ügyet.
                </p>
              `
                : ""
            }
        </div>
      </section>
    `
            : `
      <section class="case-panel case-panel--locked-preview">
        <div class="locked-preview">
          <span
            class="locked-preview__icon"
            aria-hidden="true"
          >
            🔒
          </span>

          <div>
            <h3 class="locked-preview__title">
              Következő feladat zárolva
            </h3>

            <p class="locked-preview__text">
              A biztonsági feladat akkor nyílik meg,
              amikor mind az
              ${caseData.totalHotspots}
              nyomot megtaláltad.
            </p>

            <p class="locked-preview__progress">
              Még
              ${caseData.totalHotspots -
            foundCount
            }
              nyom hiányzik.
            </p>
          </div>
        </div>
      </section>
    `
        }
        </aside>
      </div>

      <div class="case-screen__footer">
        <button
          class="button button--secondary"
          id="case-back-button"
          type="button"
        >
          Vissza a központhoz
        </button>
      </div>

      <div
        class="clue-feedback-toast"
        id="clue-feedback-toast"
        aria-live="polite"
      ></div>
    </section>
  `;

    const imageWrapper =
        document.querySelector(
            "#clue-image-wrapper"
        );

    initializeHotspots({
        container: imageWrapper,
        hotspots: caseData.hotspots,
        foundHotspotIds:
            state.foundHotspotIds,

        onHotspotFound: (hotspot) => {
            const isNew =
                addFoundHotspot(hotspot.id);

            if (!isNew) {
                return;
            }

            addScore(
                hotspot.scoreType,
                hotspot.points
            );


            if (hotspot.evidence) {
                addEvidenceRecord({
                    ...hotspot.evidence,
                    caseId: caseData.id
                });
            }

            const updatedState = getState();

            const isFinalHotspot =
                updatedState.foundHotspotIds.length >=
                caseData.totalHotspots;

            showClueFeedback(
                hotspot,
                () => {
                    renderSocialPostCase();

                    if (isFinalHotspot) {
                        window.requestAnimationFrame(() => {
                            showUnlockedTaskNotice();
                        });
                    }
                }
            );
        }
    });

    document
        .querySelector("#case-back-button")
        .addEventListener("click", () => {
            setActiveCase(null);
            setCurrentScreen("headquarters");
            renderCurrentScreen();
        });

    if (allHotspotsFound) {
        initializeSafetyTask(
            caseData,
            true,
            caseCompleted
        );
    }
}

/**
 * Rövid visszajelzés megjelenítése
 * egy megtalált nyom után.
 *
 * @param {object} hotspot
 */
/**
 * Visszajelzés megjelenítése egy megtalált nyom után.
 *
 * Az üzenet addig marad látható,
 * amíg a játékos az „Értem” gombra nem kattint.
 *
 * @param {object} hotspot
 * @param {Function} onClose
 */
function showClueFeedback(
    hotspot,
    onClose
) {
    const toast =
        document.querySelector(
            "#clue-feedback-toast"
        );

    if (!toast) {
        return;
    }

    toast.innerHTML = `
    <div
      class="clue-feedback-toast__content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clue-feedback-title"
    >
      <strong id="clue-feedback-title">
        Nyom megtalálva:
        ${hotspot.title}
      </strong>

      <p>
        ${hotspot.feedback}
      </p>

      <span class="clue-feedback-toast__points">
        +${hotspot.points} pont
      </span>

      <button
        class="button button--primary clue-feedback-toast__button"
        id="clue-feedback-close-button"
        type="button"
      >
        Értem
      </button>
    </div>
  `;

    toast.classList.add(
        "clue-feedback-toast--visible"
    );

    const closeButton =
        document.querySelector(
            "#clue-feedback-close-button"
        );

    closeButton.focus();

    closeButton.addEventListener(
        "click",
        () => {
            toast.classList.remove(
                "clue-feedback-toast--visible"
            );

            toast.innerHTML = "";

            if (typeof onClose === "function") {
                onClose();
            }
        }
    );
}

/**
 * Jelzi, hogy a biztonsági feladat feloldódott,
 * majd finoman odagörget.
 */
function showUnlockedTaskNotice() {
    const safetyPanel =
        document.querySelector(
            "#safety-task-panel"
        );

    if (!safetyPanel) {
        return;
    }

    const notice = document.createElement("div");

    notice.className = "unlock-notice";

    notice.innerHTML = `
    <strong>
      Új feladat feloldva!
    </strong>

    <span>
      Most tedd biztonságosabbá a bejegyzést.
    </span>

    <button
      class="button button--primary"
      id="unlock-notice-button"
      type="button"
    >
      Tovább a feladathoz
    </button>
  `;

    document.body.appendChild(notice);

    window.requestAnimationFrame(() => {
        notice.classList.add(
            "unlock-notice--visible"
        );
    });

    const button =
        notice.querySelector(
            "#unlock-notice-button"
        );

    button.focus();

    button.addEventListener("click", () => {
        notice.classList.remove(
            "unlock-notice--visible"
        );

        window.setTimeout(() => {
            notice.remove();
        }, 180);

        safetyPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        safetyPanel.setAttribute(
            "tabindex",
            "-1"
        );

        window.setTimeout(() => {
            safetyPanel.focus({
                preventScroll: true
            });
        }, 500);
    });
}

/**
 * A biztonsági feladat működésének beállítása.
 *
 * @param {object} caseData
 * @param {boolean} enabled
 * @param {boolean} completed
 */
function initializeSafetyTask(
    caseData,
    enabled,
    completed
) {
    if (!enabled || completed) {
        return;
    }

    const checkboxes =
        document.querySelectorAll(
            'input[name="safety-option"]'
        );

    const counterElement =
        document.querySelector(
            "#selection-counter"
        );

    const checkButton =
        document.querySelector(
            "#check-safety-button"
        );

    const feedbackElement =
        document.querySelector(
            "#task-feedback"
        );

    function getSelectedIds() {
        return Array
            .from(checkboxes)
            .filter((checkbox) => {
                return checkbox.checked;
            })
            .map((checkbox) => {
                return checkbox.value;
            });
    }

    function updateSelectionState() {
        const selectedIds =
            getSelectedIds();

        setSelectedSafetyOptions(
            selectedIds
        );

        counterElement.textContent =
            `Kiválasztva: ${selectedIds.length
            } / ${caseData.safetyTask
                .requiredSelectionCount
            }`;

        checkButton.disabled =
            selectedIds.length !==
            caseData.safetyTask
                .requiredSelectionCount;
    }

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener(
            "change",
            () => {
                const selectedIds =
                    getSelectedIds();

                const maximum =
                    caseData.safetyTask
                        .requiredSelectionCount;

                if (
                    selectedIds.length >
                    maximum
                ) {
                    checkbox.checked = false;

                    feedbackElement.innerHTML = `
            <p class="feedback feedback--warning">
              Pontosan ${maximum}
              lehetőséget választhatsz.
            </p>
          `;

                    return;
                }

                feedbackElement.innerHTML = "";
                updateSelectionState();
            }
        );
    });

    updateSelectionState();

    checkButton.addEventListener(
        "click",
        () => {
            const selectedIds =
                getSelectedIds();

            const selectedOptions =
                caseData.safetyTask.options
                    .filter((option) => {
                        return selectedIds.includes(
                            option.id
                        );
                    });

            const allCorrect =
                selectedOptions.length ===
                caseData.safetyTask
                    .requiredSelectionCount &&
                selectedOptions.every(
                    (option) => option.isCorrect
                );

            if (!allCorrect) {
                const incorrectOptions =
                    selectedOptions.filter(
                        (option) => !option.isCorrect
                    );

                const feedbackItems =
                    incorrectOptions
                        .map((option) => {
                            return `
                <li>
                  ${option.feedback}
                </li>
              `;
                        })
                        .join("");

                feedbackElement.innerHTML = `
          <div class="feedback feedback--error">
            <strong>
              Még nem teljesen jó.
            </strong>

            ${feedbackItems
                        ? `
                  <ul>
                    ${feedbackItems}
                  </ul>
                `
                        : ""
                    }

            <p>
              Gondold át, mely adatok
              segítenek valóban azonosítani
              vagy megtalálni valakit.
            </p>
          </div>
        `;

                return;
            }

            const safetyPoints =
                selectedOptions.length *
                caseData.safetyTask
                    .pointsPerCorrectAnswer;

            addScore(
                "safety",
                safetyPoints
            );

            completeCase(caseData.id);

            feedbackElement.innerHTML = `
  <div class="feedback feedback--success">
    <strong>
      Helyes döntés!
    </strong>

    <p>
      Az iskola nevének,
      a kutya nevének és a jövőbeli
      tartózkodási helynek az elrejtése
      valóban biztonságosabbá teszi
      a bejegyzést.
    </p>

    <p>
      +${safetyPoints} védelmi pont
    </p>

    <button
      class="button button--primary feedback__close-case-button"
      id="close-case-button"
      type="button"
    >
      Ügy lezárása
    </button>
  </div>
`;

            checkboxes.forEach((checkbox) => {
                checkbox.disabled = true;
            });

            checkButton.disabled = true;

            const closeCaseButton =
                document.querySelector(
                    "#close-case-button"
                );

            closeCaseButton.focus();

            closeCaseButton.addEventListener(
                "click",
                () => {
                    setActiveCase(null);
                    setCurrentScreen("headquarters");
                    renderCurrentScreen();
                }
            );
        }
    );
}

/**
 * Az aktuális játékállapot alapján
 * megjeleníti a megfelelő képernyőt.
 */
function renderCurrentScreen() {
    const state = getState();

    if (
        state.currentScreen ===
        "briefing"
    ) {
        renderBriefingScreen();
        return;
    }

    if (
        state.currentScreen ===
        "headquarters"
    ) {
        renderHeadquartersScreen();
        return;
    }

    if (
        state.currentScreen ===
        "social-post-case"
    ) {
        renderSocialPostCase();
        return;
    }

    renderIntroScreen();
}

/**
 * A játék indítása.
 */
function initializeGame() {
    initializeOverlayActions();
    resetState();
    renderCurrentScreen();
}

initializeGame();