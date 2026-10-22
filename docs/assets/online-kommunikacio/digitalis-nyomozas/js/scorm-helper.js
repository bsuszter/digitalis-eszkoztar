// =========================================================
// DIGITÁLIS NYOMOZÓIRODA – SCORM 1.2 integráció
// Normál weboldalon kikapcsol, Moodle SCORM-ban aktiválódik.
// =========================================================

import { getState, restoreState } from "./state.js";

const MAX_GAME_SCORE = 235;
const MAX_LMS_SCORE = 25;
const FINAL_CASE_ID = "final-reconstruction";
const STATE_CHANGE_EVENT = "digital-investigation:state-change";
const RESTORED_EVENT = "digital-investigation:scorm-restored";

const ATTEMPT_SELECTORS = {
  "#check-safety-button": "social-post-safety",
  "#game-profile-check-clues": "game-profile-clues",
  "#game-profile-check-conclusion": "game-profile-conclusion",
  "#game-profile-check-safety": "game-profile-safety",
  "#public-comment-check-risks": "public-comment-risks",
  "#public-comment-check-inferences": "public-comment-inferences",
  "#public-comment-check-rewrite": "public-comment-rewrite",
  "#final-check-profile": "final-profile",
  "#final-check-risks": "final-risks",
  "#final-check-protection": "final-protection"
};

let api = null;
let initialized = false;
let terminated = false;
let saveTimer = null;
let attempts = {};
let modeReported = false;

function reportMode(message, type = "info") {
  const prefix = "[Digitális Nyomozóiroda · SCORM]";
  const logger = console[type] || console.info;
  logger(`${prefix} ${message}`);
}

function findScormApi(startWindow) {
  let current = startWindow;
  let searchAttempts = 0;

  while (current && searchAttempts < 50) {
    try {
      if (current.API) return current.API;
      if (current.parent === current) break;
      current = current.parent;
    } catch {
      break;
    }
    searchAttempts += 1;
  }

  try {
    if (window.opener?.API) return window.opener.API;
  } catch {
    // Más eredetű ablaknál nincs teendő.
  }

  return null;
}

function call(method, ...args) {
  if (!api || typeof api[method] !== "function") return null;

  try {
    return api[method](...args);
  } catch (error) {
    reportMode(`Hiba a(z) ${method} hívás közben.`, "warn");
    console.warn(error);
    return null;
  }
}

function asBoolean(value) {
  return value === true || value === "true" || value === "1";
}

function getTotalScore(state) {
  return state.score.investigation + state.score.evidence + state.score.safety;
}

function getLmsScore(state) {
  const scaledScore = (getTotalScore(state) / MAX_GAME_SCORE) * MAX_LMS_SCORE;
  return Math.max(0, Math.min(MAX_LMS_SCORE, Math.round(scaledScore * 100) / 100));
}

function createSuspendData(state) {
  return JSON.stringify({
    v: 2,
    currentScreen: state.currentScreen,
    score: state.score,
    completedCases: state.completedCases,
    foundHotspotIds: state.foundHotspotIds,
    selectedSafetyOptionIds: state.selectedSafetyOptionIds,
    safetyOptionOrder: state.safetyOptionOrder,
    isFinished: state.isFinished,
    attempts
  });
}

function notifyRestoredState(state) {
  window.dispatchEvent(new CustomEvent(RESTORED_EVENT, {
    detail: {
      state,
      attempts: { ...attempts }
    }
  }));
}

function loadSuspendData() {
  const raw = call("LMSGetValue", "cmi.suspend_data");
  if (!raw) {
    reportMode("Nincs korábbi mentett állapot; új munkamenet indul.");
    return false;
  }

  try {
    const saved = JSON.parse(raw);
    attempts = saved.attempts && typeof saved.attempts === "object"
      ? { ...saved.attempts }
      : {};

    const restored = restoreState(saved);
    if (restored) {
      const restoredState = getState();
      reportMode("A korábbi részpontszám és előrehaladás visszatöltődött.");
      queueMicrotask(() => notifyRestoredState(restoredState));
      return true;
    }

    reportMode("A korábbi mentés nem volt visszaállítható.", "warn");
  } catch (error) {
    reportMode("A suspend_data nem olvasható; új munkamenet indul.", "warn");
    console.warn(error);
  }

  return false;
}

export function isScormAvailable() {
  return Boolean(api || findScormApi(window));
}

export function initializeScorm() {
  if (initialized) return true;

  api = findScormApi(window);
  if (!api) {
    if (!modeReported) {
      reportMode("SCORM API nem található – normál webes mód aktív.");
      modeReported = true;
    }
    return false;
  }

  initialized = asBoolean(call("LMSInitialize", ""));
  if (!initialized) {
    reportMode("A SCORM API elérhető, de az inicializálás sikertelen.", "warn");
    return false;
  }

  modeReported = true;
  reportMode("SCORM 1.2 kapcsolat sikeresen inicializálva.");

  const currentStatus = call("LMSGetValue", "cmi.core.lesson_status");
  if (!currentStatus || currentStatus === "not attempted") {
    call("LMSSetValue", "cmi.core.lesson_status", "incomplete");
  }

  call("LMSSetValue", "cmi.core.score.min", "0");
  call("LMSSetValue", "cmi.core.score.max", String(MAX_LMS_SCORE));
  loadSuspendData();
  call("LMSCommit", "");
  return true;
}

export function saveScormProgress(state = getState()) {
  if (!initialized && !initializeScorm()) return false;
  if (terminated) return false;

  const lmsScore = getLmsScore(state);
  const gameScore = getTotalScore(state);
  const finished = state.completedCases.includes(FINAL_CASE_ID);

  call("LMSSetValue", "cmi.core.score.raw", String(lmsScore));
  call("LMSSetValue", "cmi.core.lesson_status", finished ? "completed" : "incomplete");
  call("LMSSetValue", "cmi.core.lesson_location", state.currentScreen || "intro");
  call("LMSSetValue", "cmi.suspend_data", createSuspendData(state));

  const saved = asBoolean(call("LMSCommit", ""));
  if (saved) {
    reportMode(`Mentés kész: ${gameScore}/${MAX_GAME_SCORE} játékpont → ${lmsScore}/${MAX_LMS_SCORE} Moodle-pont · ${finished ? "completed" : "incomplete"}.`);
  } else {
    reportMode("A Moodle nem erősítette meg a mentést.", "warn");
  }
  return saved;
}

function scheduleSave(state) {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => saveScormProgress(state), 250);
}

function recordAttempt(target) {
  for (const [selector, attemptId] of Object.entries(ATTEMPT_SELECTORS)) {
    if (!target.closest(selector)) continue;

    attempts[attemptId] = (attempts[attemptId] || 0) + 1;
    reportMode(`Próbálkozás rögzítve: ${attemptId} = ${attempts[attemptId]}.`);
    scheduleSave(getState());
    return;
  }
}

export function terminateScorm() {
  if (!initialized || terminated) return;

  const state = getState();
  saveScormProgress(state);

  const finished = state.completedCases.includes(FINAL_CASE_ID);
  call("LMSSetValue", "cmi.core.exit", finished ? "logout" : "suspend");
  call("LMSCommit", "");
  call("LMSFinish", "");
  terminated = true;
  reportMode(finished ? "SCORM munkamenet lezárva." : "SCORM munkamenet felfüggesztve.");
}

initializeScorm();
if (initialized) saveScormProgress();

document.addEventListener("click", (event) => {
  if (event.target instanceof Element) recordAttempt(event.target);
}, true);

window.addEventListener(STATE_CHANGE_EVENT, (event) => {
  scheduleSave(event.detail?.state || getState());
});

window.addEventListener("pagehide", terminateScorm);
window.addEventListener("beforeunload", terminateScorm);
