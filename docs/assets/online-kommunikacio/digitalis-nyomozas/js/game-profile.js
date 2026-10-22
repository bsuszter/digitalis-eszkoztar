// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/game-profile.js
// 2. ügy – három, egymás után feloldódó feladatszakasz.
// =========================================================

import {
  addEvidenceRecord,
  addScore,
  completeCase,
  isCaseCompleted
} from "./state.js";

const CASE_ID = "game-profile";
const OVERLAY_ID = "game-profile-overlay";

const CATEGORY_LABELS = {
  strong: "Erős egyezés",
  weak: "Gyenge egyezés",
  none: "Nem bizonyít semmit"
};

const clues = [
  {
    id: "username",
    label: "Ugyanaz a PixelBeni felhasználónév",
    detail: "A közösségi profilban is ez a ritkább név szerepelt.",
    correctCategory: "strong",
    explanation: "Az azonos, ritkább felhasználónév több felületen erős összekapcsoló nyom.",
    evidence: {
      id: "game-profile-username",
      title: "Azonos felhasználónév: PixelBeni",
      source: "Játékprofil",
      certainty: "Erős egyezés",
      description: "Ugyanaz a ritkább felhasználónév több felületen erős összekapcsoló nyom."
    }
  },
  {
    id: "avatar",
    label: "Ugyanaz a rajzolt avatar",
    detail: "A frizura, a fejhallgató és a színek is megegyeznek.",
    correctCategory: "strong",
    explanation: "Azonos név és azonos profilkép együtt sokkal erősebb, mint bármelyik önmagában.",
    evidence: {
      id: "game-profile-avatar",
      title: "Azonos profilkép",
      source: "Játékprofil",
      certainty: "Erős egyezés",
      description: "Azonos név és azonos avatar együtt már erős kapcsolatot jelezhet."
    }
  },
  {
    id: "basketball",
    label: "Kosárlabdás jelvény és bemutatkozás",
    detail: "A korábbi posztban is kosárlabdázásra utaló részletek voltak.",
    correctCategory: "strong",
    explanation: "A hobbi önmagában nem azonosít, de a névvel és az avatarral együtt erősíti a kapcsolatot.",
    evidence: {
      id: "game-profile-basketball",
      title: "Kosárlabdás érdeklődés",
      source: "Játékprofil",
      certainty: "Erős egyezés",
      description: "A hobbi önmagában nem azonosít, de más egyezésekkel együtt megerősíti a kapcsolatot."
    }
  },
  {
    id: "zokni-fan",
    label: "A klán neve: ZokniFan",
    detail: "A Zokni név a korábbi bejegyzésben a kutyához kapcsolódott.",
    correctCategory: "weak",
    explanation: "Lehet kapcsolat a kutya nevével, de a klánnév önmagában többféleképpen is létrejöhetett.",
    evidence: {
      id: "game-profile-zokni-fan",
      title: "Zokni név a klánban",
      source: "Játékprofil",
      certainty: "Gyenge egyezés",
      description: "Lehet kapcsolat a kutya nevével, de a név önmagában még nem bizonyít semmit."
    }
  },
  {
    id: "city-age",
    label: "Nyilvános város és életkor",
    detail: "Budapest és 15 év szerepel a profilon.",
    correctCategory: "weak",
    explanation: "Segíthet szűkíteni a kört, de nagyon sok emberre igaz lehet.",
    evidence: {
      id: "game-profile-city-age",
      title: "Nyilvános város és életkor",
      source: "Játékprofil",
      certainty: "Gyenge egyezés",
      description: "Ezek segíthetnek szűkíteni a kört, de sok emberre igazak lehetnek."
    }
  },
  {
    id: "generic-quote",
    label: "Általános motivációs idézet",
    detail: "„Minden nap egy kicsit jobb.”",
    correctCategory: "none",
    explanation: "Ez egy gyakori, általános mondat, ezért nem használható személyazonosításra."
  }
];

const conclusionOptions = [
  {
    value: "likely",
    icon: "👥",
    label: "Valószínűleg ugyanaz a személy",
    description: "Több egyezés alapján összekapcsolható.",
    isCorrect: true,
    feedback: "Helyes. Több erős és néhány gyenge egyezés alapján valószínűsíthetünk, de nem állíthatunk teljes bizonyosságot."
  },
  {
    value: "insufficient",
    icon: "🔎",
    label: "Nincs elég bizonyíték",
    description: "Nem áll rendelkezésre elegendő információ.",
    isCorrect: false,
    feedback: "Túl óvatos következtetés. Az azonos név, avatar és kosárlabdás érdeklődés együtt már erős kapcsolatot jelez."
  },
  {
    value: "certain",
    icon: "❗",
    label: "Biztosan ugyanaz a személy",
    description: "Teljes bizonyossággal összekapcsolható.",
    isCorrect: false,
    feedback: "Túl erős állítás. Online nyomokból valószínűsíthetünk, de teljes bizonyosságot nem állíthatunk."
  }
];

const safetyOptions = [
  {
    value: "private",
    label: "A profil legyen privát, és csak ismerősök lássák a részletes adatokat.",
    isCorrect: true,
    feedback: "Helyes. Ez egyszerre csökkenti a nyilvánosan látható személyes adatok és szokások mennyiségét."
  },
  {
    value: "emoji",
    label: "Csak a profilban használt emojikat törölném.",
    isCorrect: false,
    feedback: "Az emojik eltávolítása nem rejti el a felhasználónevet, az avatart, a várost vagy az életkort."
  },
  {
    value: "level",
    label: "Elrejteném a játékos szintjét, de minden más maradna nyilvános.",
    isCorrect: false,
    feedback: "A játékos szintje kevésbé érzékeny, mint a nyilvános életkor, helyszín, avatar és aktivitási szokások."
  }
];

let selectedCategories = {};
let selectedConclusion = "";
let selectedSafety = "";
let clueStepPassed = false;
let conclusionStepPassed = false;
let safetyStepPassed = false;
let clueAttempted = false;
let conclusionAttempted = false;
let safetyAttempted = false;

function resetSessionState() {
  selectedCategories = {};
  selectedConclusion = "";
  selectedSafety = "";
  clueStepPassed = false;
  conclusionStepPassed = false;
  safetyStepPassed = false;
  clueAttempted = false;
  conclusionAttempted = false;
  safetyAttempted = false;
}

function unlockCaseCard() {
  const button = document.querySelector('[data-case-id="game-profile"]');

  if (!button) {
    return;
  }

  const socialCompleted = isCaseCompleted("social-post");
  const gameCompleted = isCaseCompleted(CASE_ID);

  if (!socialCompleted && !gameCompleted) {
    return;
  }

  const card = button.closest(".case-card");
  const status = card?.querySelector(".case-card__status");
  const desiredText = gameCompleted ? "Ügy megtekintése" : "Ügy megnyitása";
  const desiredStatus = gameCompleted ? "Lezárva" : "Elérhető";

  button.disabled = false;
  button.classList.remove("button--secondary");
  button.classList.add("button--primary");

  if (button.textContent.trim() !== desiredText) {
    button.textContent = desiredText;
  }

  card?.classList.remove("case-card--locked");
  card?.classList.toggle("case-card--completed", gameCompleted);
  card?.classList.toggle("case-card--unlocked", !gameCompleted);

  if (status && status.textContent.trim() !== desiredStatus) {
    status.textContent = desiredStatus;
  }
}

function createProfilePanel() {
  return `
    <section class="game-profile-card" aria-labelledby="game-profile-title">
      <div class="game-profile-card__topbar">
        <span>🎮 GAMEHUB</span>
        <span>Játékos profil</span>
      </div>

      <div class="game-profile-card__hero">
        <div class="game-profile-avatar" role="img" aria-label="PixelBeni rajzolt profilképe"></div>
        <div>
          <p class="game-profile-card__eyebrow">Nyilvános profil</p>
          <h2 id="game-profile-title">PixelBeni</h2>
          <p>47. szint · Hoop Legends játékos</p>
        </div>
      </div>

      <div class="game-profile-card__grid">
        <article><span>Felhasználónév</span><strong>PixelBeni</strong></article>
        <article><span>Avatar</span><strong>Ugyanaz a rajzolt figura</strong></article>
        <article><span>Jelvény</span><strong>🏀 Hoop Legends</strong></article>
        <article><span>Klán</span><strong>ZokniFan</strong></article>
        <article><span>Helyszín</span><strong>Budapest</strong></article>
        <article><span>Életkor</span><strong>15</strong></article>
        <article><span>Aktív időszak</span><strong>17:00–22:00</strong></article>
        <article><span>Bemutatkozás</span><strong>„Kosárlabda az életem.”</strong></article>
      </div>

      <p class="game-profile-card__privacy-note">Megjegyzés: a profil nyilvánosan elérhető adatokból készült.</p>
    </section>
  `;
}

function getClueRowState(clue) {
  if (!clueAttempted) {
    return { className: "", icon: "", feedback: "" };
  }

  const selected = selectedCategories[clue.id] || "";
  const isCorrect = selected === clue.correctCategory;

  return {
    className: isCorrect ? "profile-clue-row--correct" : "profile-clue-row--incorrect",
    icon: isCorrect ? "✓" : "✕",
    feedback: isCorrect
      ? `${CATEGORY_LABELS[clue.correctCategory]} – ${clue.explanation}`
      : `A választott kategória nem megfelelő. Gondold át: ${clue.explanation}`
  };
}

function createClueRows() {
  return clues.map((clue) => {
    const selected = selectedCategories[clue.id] || "";
    const rowState = getClueRowState(clue);

    return `
      <article class="profile-clue-row ${rowState.className}">
        <div class="profile-clue-row__content">
          <strong>${clue.label}</strong>
          <p>${clue.detail}</p>
          ${clueAttempted ? `<p class="profile-inline-feedback"><span aria-hidden="true">${rowState.icon}</span>${rowState.feedback}</p>` : ""}
        </div>

        <label>
          <span class="sr-only">Kategória: ${clue.label}</span>
          <select data-clue-id="${clue.id}" ${clueStepPassed ? "disabled" : ""}>
            <option value="">Válassz kategóriát</option>
            <option value="strong" ${selected === "strong" ? "selected" : ""}>Erős egyezés</option>
            <option value="weak" ${selected === "weak" ? "selected" : ""}>Gyenge egyezés</option>
            <option value="none" ${selected === "none" ? "selected" : ""}>Nem bizonyít semmit</option>
          </select>
        </label>
      </article>
    `;
  }).join("");
}

function createConclusionOptions() {
  return conclusionOptions.map((option) => {
    const selected = selectedConclusion === option.value;
    const feedbackClass = conclusionAttempted && selected
      ? option.isCorrect ? "profile-choice--correct" : "profile-choice--incorrect"
      : "";

    return `
      <label class="profile-choice profile-choice--decision ${feedbackClass}">
        <input type="radio" name="profile-conclusion" value="${option.value}" ${selected ? "checked" : ""} ${conclusionStepPassed ? "disabled" : ""}>
        <span class="profile-choice__icon" aria-hidden="true">${option.icon}</span>
        <span class="profile-choice__body"><strong>${option.label}</strong><small>${option.description}</small></span>
      </label>
    `;
  }).join("");
}

function createSafetyOptions() {
  return safetyOptions.map((option) => {
    const selected = selectedSafety === option.value;
    const feedbackClass = safetyAttempted && selected
      ? option.isCorrect ? "profile-choice--correct" : "profile-choice--incorrect"
      : "";

    return `
      <label class="profile-choice ${feedbackClass}">
        <input type="radio" name="profile-safety" value="${option.value}" ${selected ? "checked" : ""} ${safetyStepPassed ? "disabled" : ""}>
        <span>${option.label}</span>
      </label>
    `;
  }).join("");
}

function createStepStatus(stepNumber, passed) {
  return passed
    ? `<span class="profile-step-status profile-step-status--complete">✓ Kész</span>`
    : `<span class="profile-step-status">Lépés ${stepNumber}/3</span>`;
}

function createLockedPanel(stepNumber, title, message) {
  return `
    <section class="profile-stage profile-stage--locked" aria-disabled="true">
      <div class="profile-stage__lock" aria-hidden="true">🔒</div>
      <div><p>${createStepStatus(stepNumber, false)}</p><h2>${title}</h2><p>${message}</p></div>
    </section>
  `;
}

function createClueStage() {
  const selectedCount = Object.values(selectedCategories).filter(Boolean).length;
  const allSelected = selectedCount === clues.length;

  return `
    <section class="profile-stage ${clueStepPassed ? "profile-stage--complete" : ""}">
      <header class="profile-stage__header">
        <div class="profile-task-block__number">1</div>
        <div>
          <div class="profile-stage__heading-line"><h2>Rendezd a nyomokat!</h2>${createStepStatus(1, clueStepPassed)}</div>
          <p>Sorold be mind a hat részletet! Ellenőrzés után minden sornál külön magyarázatot kapsz.</p>
        </div>
      </header>

      <div class="profile-category-legend" aria-label="Nyomkategóriák">
        <span class="profile-category-legend__item profile-category-legend__item--strong"><strong>Erős egyezés</strong><small>más nyomokkal együtt jól összekapcsol</small></span>
        <span class="profile-category-legend__item profile-category-legend__item--weak"><strong>Gyenge egyezés</strong><small>lehet kapcsolat, de nem elég önmagában</small></span>
        <span class="profile-category-legend__item profile-category-legend__item--none"><strong>Nem bizonyít semmit</strong><small>nem használható azonosításra</small></span>
      </div>

      <div class="profile-clue-list">${createClueRows()}</div>

      <div class="profile-stage__footer">
        <p class="profile-stage__progress">${selectedCount} / ${clues.length} nyom besorolva</p>
        ${clueStepPassed
          ? `<div class="profile-stage-message profile-stage-message--success"><strong>Mind a hat nyom jó helyre került.</strong><p>A következtetési feladat feloldva.</p></div>`
          : `<button type="button" class="button button--primary" id="game-profile-check-clues" ${allSelected ? "" : "disabled"}>Nyomok ellenőrzése</button>`}
      </div>
    </section>
  `;
}

function getSelectedConclusionOption() {
  return conclusionOptions.find((option) => option.value === selectedConclusion);
}

function createConclusionStage() {
  if (!clueStepPassed) {
    return createLockedPanel(2, "Hozz következtetést!", "Előbb rendezd helyesen az összes nyomot.");
  }

  const selectedOption = getSelectedConclusionOption();

  return `
    <section class="profile-stage ${conclusionStepPassed ? "profile-stage--complete" : ""}">
      <header class="profile-stage__header">
        <div class="profile-task-block__number">2</div>
        <div>
          <div class="profile-stage__heading-line"><h2>Hozz következtetést!</h2>${createStepStatus(2, conclusionStepPassed)}</div>
          <p>A rendelkezésre álló nyomok alapján mi a legbiztonságosabb állítás?</p>
        </div>
      </header>

      <div class="profile-choice-grid profile-choice-grid--three">${createConclusionOptions()}</div>

      ${conclusionAttempted && selectedOption ? `<div class="profile-stage-message ${selectedOption.isCorrect ? "profile-stage-message--success" : "profile-stage-message--warning"}"><strong>${selectedOption.isCorrect ? "Helyes következtetés." : "Ezt még pontosítsd."}</strong><p>${selectedOption.feedback}</p></div>` : ""}

      <div class="profile-stage__footer">
        ${conclusionStepPassed
          ? `<div class="profile-stage-message profile-stage-message--success"><strong>A következtetés elfogadva.</strong><p>A biztonsági döntés feloldva.</p></div>`
          : `<button type="button" class="button button--primary" id="game-profile-check-conclusion" ${selectedConclusion ? "" : "disabled"}>Következtetés ellenőrzése</button>`}
      </div>
    </section>
  `;
}

function getSelectedSafetyOption() {
  return safetyOptions.find((option) => option.value === selectedSafety);
}

function createCompletionPanel() {
  return `
    <div class="profile-case-complete">
      <span class="profile-case-complete__icon" aria-hidden="true">🏆</span>
      <div><strong>Az ügy minden lépése elkészült.</strong><p>Megtanultad, hogyan erősítheti egymást több különálló digitális nyom.</p></div>
      <button type="button" class="button button--primary" id="game-profile-finish">Ügy lezárása</button>
    </div>
  `;
}

function createSafetyStage() {
  if (!conclusionStepPassed) {
    return createLockedPanel(3, "Tedd biztonságosabbá a profilt!", "Előbb vond le helyesen a következtetést.");
  }

  const selectedOption = getSelectedSafetyOption();

  return `
    <section class="profile-stage ${safetyStepPassed ? "profile-stage--complete" : ""}">
      <header class="profile-stage__header">
        <div class="profile-task-block__number">3</div>
        <div>
          <div class="profile-stage__heading-line"><h2>Tedd biztonságosabbá a profilt!</h2>${createStepStatus(3, safetyStepPassed)}</div>
          <p>Melyik változtatás csökkenti érdemben a profil kockázatát?</p>
        </div>
      </header>

      <div class="profile-choice-grid">${createSafetyOptions()}</div>

      ${safetyAttempted && selectedOption ? `<div class="profile-stage-message ${selectedOption.isCorrect ? "profile-stage-message--success" : "profile-stage-message--warning"}"><strong>${selectedOption.isCorrect ? "Jó biztonsági döntés." : "Ez még nem elég."}</strong><p>${selectedOption.feedback}</p></div>` : ""}

      <div class="profile-stage__footer">
        ${safetyStepPassed ? createCompletionPanel() : `<button type="button" class="button button--primary" id="game-profile-check-safety" ${selectedSafety ? "" : "disabled"}>Biztonsági döntés ellenőrzése</button>`}
      </div>
    </section>
  `;
}

function renderWorkspace() {
  const workspace = document.querySelector("#game-profile-workspace");
  if (!workspace) return;

  const previousScrollTop = workspace.scrollTop;
  workspace.innerHTML = `${createClueStage()}${createConclusionStage()}${createSafetyStage()}<div class="game-profile-actions"><button type="button" class="button button--secondary" id="game-profile-cancel">Vissza</button></div>`;
  workspace.scrollTop = previousScrollTop;
}

function renderOverlay() {
  document.querySelector(`#${OVERLAY_ID}`)?.remove();

  if (!isCaseCompleted(CASE_ID)) {
    resetSessionState();
  } else {
    clueStepPassed = true;
    conclusionStepPassed = true;
    safetyStepPassed = true;
  }

  const overlay = document.createElement("div");
  overlay.className = "game-profile-overlay";
  overlay.id = OVERLAY_ID;
  overlay.innerHTML = `
    <div class="game-profile-overlay__backdrop"></div>
    <section class="game-profile-case" role="dialog" aria-modal="true" aria-labelledby="game-profile-case-title">
      <header class="game-profile-case__header">
        <div><p>2. ügy · Játékprofil</p><h1 id="game-profile-case-title">Kapcsolható-e a korábbi profilhoz?</h1></div>
        <button type="button" class="game-profile-close" aria-label="Ügy bezárása">×</button>
      </header>
      <div class="game-profile-case__layout">
        ${createProfilePanel()}
        <section class="game-profile-workspace" id="game-profile-workspace" aria-label="Játékprofil feladatai"></section>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);
  renderWorkspace();
  overlay.querySelector(".game-profile-close")?.focus();
}

function closeOverlay() {
  document.querySelector(`#${OVERLAY_ID}`)?.remove();
  unlockCaseCard();
}

function checkClues() {
  const allSelected = clues.every((clue) => Boolean(selectedCategories[clue.id]));
  if (!allSelected) return;

  clueAttempted = true;
  clueStepPassed = clues.every((clue) => selectedCategories[clue.id] === clue.correctCategory);
  renderWorkspace();

  const firstIncorrect = document.querySelector(".profile-clue-row--incorrect");
  if (firstIncorrect) {
    firstIncorrect.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function checkConclusion() {
  const selectedOption = getSelectedConclusionOption();
  if (!selectedOption) return;

  conclusionAttempted = true;
  conclusionStepPassed = selectedOption.isCorrect;
  renderWorkspace();
}

function awardCaseResults() {
  if (isCaseCompleted(CASE_ID)) return;

  addScore("evidence", 30);
  addScore("safety", 10);

  clues.filter((clue) => clue.evidence && clue.correctCategory !== "none").forEach((clue) => {
    addEvidenceRecord({ ...clue.evidence, caseId: CASE_ID });
  });

  completeCase(CASE_ID);
}

function checkSafety() {
  const selectedOption = getSelectedSafetyOption();
  if (!selectedOption) return;

  safetyAttempted = true;
  safetyStepPassed = selectedOption.isCorrect;

  if (safetyStepPassed) {
    awardCaseResults();
  }

  renderWorkspace();
}

function initializeEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const gameButton = target.closest('[data-case-id="game-profile"]');
    if (gameButton && !gameButton.hasAttribute("disabled")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      renderOverlay();
      return;
    }

    if (target.closest(".game-profile-close") || target.closest("#game-profile-cancel") || target.closest("#game-profile-finish") || target.closest(".game-profile-overlay__backdrop")) {
      closeOverlay();
      return;
    }

    if (target.closest("#game-profile-check-clues")) {
      checkClues();
      return;
    }

    if (target.closest("#game-profile-check-conclusion")) {
      checkConclusion();
      return;
    }

    if (target.closest("#game-profile-check-safety")) {
      checkSafety();
    }
  }, true);

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) return;

    if (target.matches("select[data-clue-id]")) {
      selectedCategories[target.dataset.clueId] = target.value;
      clueAttempted = false;
      renderWorkspace();
      return;
    }

    if (target.name === "profile-conclusion") {
      selectedConclusion = target.value;
      conclusionAttempted = false;
      renderWorkspace();
      return;
    }

    if (target.name === "profile-safety") {
      selectedSafety = target.value;
      safetyAttempted = false;
      renderWorkspace();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector(`#${OVERLAY_ID}`)) {
      closeOverlay();
    }
  });

  const app = document.querySelector("#app");
  if (app) {
    const observer = new MutationObserver(() => window.requestAnimationFrame(unlockCaseCard));
    observer.observe(app, { childList: true, subtree: false });
  }

  unlockCaseCard();
}

initializeEvents();
