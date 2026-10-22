// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/state.js
//
// A játék teljes aktuális állapotát kezeli.
// =========================================================

const initialState = {
  currentScreen: "intro",

  activeCaseId: null,

  activeOverlay: null,

  score: {
    investigation: 0,
    evidence: 0,
    safety: 0
  },

  foundHotspotIds: [],

  evidenceRecords: [],

  selectedSafetyOptionIds: [],

  safetyOptionOrder: [],

  completedCases: [],

  isFinished: false
};

let state = structuredClone(initialState);

const STATE_CHANGE_EVENT = "digital-investigation:state-change";

function notifyStateChange(changeType) {
  window.dispatchEvent(new CustomEvent(STATE_CHANGE_EVENT, {
    detail: {
      changeType,
      state: getState()
    }
  }));
}

/**
 * Visszaadja a játék aktuális állapotának másolatát.
 *
 * @returns {object}
 */
export function getState() {
  return structuredClone(state);
}

/**
 * Beállítja az aktuális képernyőt.
 *
 * @param {string} screenName
 */
export function setCurrentScreen(screenName) {
  state.currentScreen = screenName;
}

/**
 * Beállítja az aktív ügy azonosítóját.
 *
 * @param {string|null} caseId
 */
export function setActiveCase(caseId) {
  state.activeCaseId = caseId;
}

/**
 * Megnyit egy felugró lapot.
 *
 * Lehetséges értékek:
 * - "evidence"
 * - "score"
 *
 * @param {string} overlayName
 */
export function openOverlay(overlayName) {
  state.activeOverlay = overlayName;
}

/**
 * Bezárja a megnyitott felugró lapot.
 */
export function closeOverlay() {
  state.activeOverlay = null;
}

/**
 * Hozzáad egy megtalált hotspotot.
 *
 * @param {string} hotspotId
 * @returns {boolean}
 */
export function addFoundHotspot(hotspotId) {
  if (state.foundHotspotIds.includes(hotspotId)) {
    return false;
  }

  state.foundHotspotIds.push(hotspotId);
  notifyStateChange("hotspot-added");

  return true;
}

/**
 * Bizonyítékot ad a Nyomozói laphoz.
 *
 * Ugyanaz a bizonyíték csak egyszer kerülhet be.
 *
 * @param {object} evidenceRecord
 * @param {string} evidenceRecord.id
 * @param {string} evidenceRecord.title
 * @param {string} evidenceRecord.source
 * @param {string} evidenceRecord.certainty
 * @param {string} evidenceRecord.description
 * @param {string} evidenceRecord.caseId
 * @returns {boolean}
 */
export function addEvidenceRecord(evidenceRecord) {
  const alreadyExists =
    state.evidenceRecords.some((record) => {
      return record.id === evidenceRecord.id;
    });

  if (alreadyExists) {
    return false;
  }

  state.evidenceRecords.push({
    ...evidenceRecord
  });

  notifyStateChange("evidence-added");
  return true;
}

/**
 * Beállítja a biztonsági feladatban kiválasztott válaszokat.
 *
 * @param {Array<string>} optionIds
 */
export function setSelectedSafetyOptions(optionIds) {
  state.selectedSafetyOptionIds = [...optionIds];
}

/**
 * Egyszer véletlenszerű sorrendbe rendezi
 * a biztonsági válaszok azonosítóit.
 *
 * @param {Array<string>} optionIds
 */
export function ensureSafetyOptionOrder(optionIds) {
  if (state.safetyOptionOrder.length > 0) {
    return;
  }

  const shuffledIds = [...optionIds];

  for (
    let currentIndex = shuffledIds.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (currentIndex + 1)
    );

    [
      shuffledIds[currentIndex],
      shuffledIds[randomIndex]
    ] = [
      shuffledIds[randomIndex],
      shuffledIds[currentIndex]
    ];
  }

  state.safetyOptionOrder = shuffledIds;
}

/**
 * Visszaadja a biztonsági válaszok
 * eltárolt sorrendjét.
 *
 * @returns {Array<string>}
 */
export function getSafetyOptionOrder() {
  return [...state.safetyOptionOrder];
}

/**
 * Pontot ad a megadott ponttípushoz.
 *
 * Lehetséges ponttípusok:
 * - investigation
 * - evidence
 * - safety
 *
 * @param {string} scoreType
 * @param {number} points
 */
export function addScore(scoreType, points) {
  if (!(scoreType in state.score)) {
    console.error(
      `Ismeretlen ponttípus: ${scoreType}`
    );

    return;
  }

  state.score[scoreType] += points;
  notifyStateChange("score-changed");
}

/**
 * Lezár egy ügyet.
 *
 * @param {string} caseId
 * @returns {boolean}
 */
export function completeCase(caseId) {
  if (state.completedCases.includes(caseId)) {
    return false;
  }

  state.completedCases.push(caseId);
  notifyStateChange("case-completed");

  return true;
}

/**
 * Ellenőrzi, hogy egy ügy már lezárult-e.
 *
 * @param {string} caseId
 * @returns {boolean}
 */
export function isCaseCompleted(caseId) {
  return state.completedCases.includes(caseId);
}

/**
 * SCORM-ból vagy más megbízható mentésből részlegesen visszaállítja az állapotot.
 * Csak a játék által ismert mezőket veszi át.
 *
 * @param {object} savedState
 */
export function restoreState(savedState) {
  if (!savedState || typeof savedState !== "object") return false;

  const restored = structuredClone(initialState);

  if (typeof savedState.currentScreen === "string") {
    restored.currentScreen = savedState.currentScreen;
  }

  if (savedState.score && typeof savedState.score === "object") {
    for (const key of Object.keys(restored.score)) {
      const value = Number(savedState.score[key]);
      if (Number.isFinite(value) && value >= 0) {
        restored.score[key] = value;
      }
    }
  }

  const copyStringArray = (value) => Array.isArray(value)
    ? [...new Set(value.filter((item) => typeof item === "string"))]
    : [];

  restored.foundHotspotIds = copyStringArray(savedState.foundHotspotIds);
  restored.completedCases = copyStringArray(savedState.completedCases);
  restored.selectedSafetyOptionIds = copyStringArray(savedState.selectedSafetyOptionIds);
  restored.safetyOptionOrder = copyStringArray(savedState.safetyOptionOrder);
  restored.isFinished = Boolean(savedState.isFinished);

  if (Array.isArray(savedState.evidenceRecords)) {
    restored.evidenceRecords = savedState.evidenceRecords
      .filter((record) => record && typeof record.id === "string")
      .map((record) => ({ ...record }));
  }

  state = restored;
  notifyStateChange("state-restored");
  return true;
}

/**
 * Visszaállítja a játékot a kezdőállapotba.
 */
export function resetState() {
  state = structuredClone(initialState);
  notifyStateChange("state-reset");
}
