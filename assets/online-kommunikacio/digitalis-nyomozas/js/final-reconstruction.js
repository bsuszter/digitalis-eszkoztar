import {
  addScore,
  completeCase,
  getState,
  isCaseCompleted
} from "./state.js";

const CASE_ID = "final-reconstruction";
const OVERLAY_ID = "final-reconstruction-overlay";

const profileStatements = [
  { id: "username", text: "A PixelBeni felhasználónevet több felületen is használja.", correct: "fact", explanation: "A felhasználónév mindkét profilon közvetlenül látható." },
  { id: "basketball", text: "Valószínűleg kosárlabdázik.", correct: "inference", explanation: "Több kosárlabdás részlet együtt erős következtetést tesz lehetővé." },
  { id: "dog", text: "A kutyája neve Zokni.", correct: "fact", explanation: "A név a kutya nyakörvén közvetlenül olvasható." },
  { id: "same-person", text: "Valószínűleg ugyanaz a személy kezeli az összes profilt.", correct: "inference", explanation: "Az azonos felhasználónév, avatar és érdeklődési kör erősen összekapcsolja a profilokat, de teljes bizonyosságot nem ad." },
  { id: "routine", text: "Bizonyos napokon és időben kiszámítható lehet a mozgása.", correct: "inference", explanation: "A közzétett edzésnap, idő, megálló és útvonal együtt erre utal." },
  { id: "address", text: "Pontosan tudjuk a lakcímét.", correct: "unknown", explanation: "A megálló és a buszjárat nem árulja el a pontos lakcímet." }
];

const riskCombinations = [
  { id: "school-street", text: "Iskola neve + utcanév", correct: true, explanation: "A két adat együtt pontos helyszínt szűkíthet." },
  { id: "days-time", text: "Edzésnapok + pontos befejezési idő", correct: true, explanation: "Együtt kiszámíthatóvá teszik, mikor indulhat el." },
  { id: "stop-bus", text: "Megálló + buszjárat", correct: true, explanation: "Együtt az útvonal jelentős részét kirajzolhatják." },
  { id: "username-avatar", text: "Azonos felhasználónév + azonos avatar", correct: true, explanation: "Együtt erősen összekapcsolhatnak két profilt." },
  { id: "emoji-level", text: "Kosárlabda-emoji + játékos szint", correct: false, explanation: "Ez a páros önmagában nem ad érzékeny hely- vagy rutinadatot." },
  { id: "quote-color", text: "Motivációs idézet + profil színe", correct: false, explanation: "Általános részletek, amelyek nem azonosítanak megbízhatóan." }
];

const protectionOptions = [
  { id: "private", text: "A részletes profilokat privátra állítanám.", correct: true },
  { id: "different-name", text: "Különböző felhasználónevet használnék különböző platformokon.", correct: true },
  { id: "no-routine", text: "Nem osztanék meg nyilvánosan pontos helyet, időt és jövőbeli rutint.", correct: true },
  { id: "closed-group", text: "A csapat részleteit zárt csoportban beszélném meg.", correct: true },
  { id: "check-photo", text: "Feltöltés előtt átnézném a képek hátterét és feliratait.", correct: true },
  { id: "delete-emoji", text: "Csak az emojikat törölném a bejegyzésekből.", correct: false },
  { id: "hide-level", text: "Csak a játékos szintet rejteném el.", correct: false }
];

let selectedProfile = {};
let selectedRisks = new Set();
let selectedProtection = new Set();
let profileAttempted = false;
let riskAttempted = false;
let protectionAttempted = false;
let profilePassed = false;
let riskPassed = false;
let protectionPassed = false;

function resetSession() {
  selectedProfile = {};
  selectedRisks = new Set();
  selectedProtection = new Set();
  profileAttempted = false;
  riskAttempted = false;
  protectionAttempted = false;
  profilePassed = false;
  riskPassed = false;
  protectionPassed = false;
}

function unlockCaseCard() {
  const button = document.querySelector('[data-case-id="final-reconstruction"]');
  if (!button) return;

  const available = isCaseCompleted("public-comment") || isCaseCompleted(CASE_ID);
  const completed = isCaseCompleted(CASE_ID);
  if (!available) return;

  const card = button.closest(".case-card");
  const status = card?.querySelector(".case-card__status");
  button.disabled = false;
  button.classList.remove("button--secondary");
  button.classList.add("button--primary");
  button.textContent = completed ? "Zárójelentés megtekintése" : "Finálé megnyitása";
  card?.classList.remove("case-card--locked");
  card?.classList.toggle("case-card--completed", completed);
  card?.classList.toggle("case-card--unlocked", !completed);
  if (status) status.textContent = completed ? "Lezárva" : "Elérhető";
}

function stepStatus(number, passed) {
  return passed
    ? '<span class="final-step__status final-step__status--done">✓ Kész</span>'
    : `<span class="final-step__status">${number}/3. lépés</span>`;
}

function lockedStep(number, title, message) {
  return `<section class="final-step final-step--locked" aria-disabled="true"><span class="final-step__lock">🔒</span><div><p>${stepStatus(number, false)}</p><h2>${title}</h2><p>${message}</p></div></section>`;
}

function createProfileStep() {
  const complete = profileStatements.every((item) => selectedProfile[item.id]);
  return `<section class="final-step ${profilePassed ? "final-step--complete" : ""}">
    <header class="final-step__header"><span class="final-step__number">1</span><div><div class="final-step__title-line"><h2>Tény, következtetés vagy nem állapítható meg?</h2>${stepStatus(1, profilePassed)}</div><p>Sorold be mind a hat állítást a bizonyítékok ereje alapján.</p></div></header>
    <div class="final-classification-list">${profileStatements.map((item) => {
      const selected = selectedProfile[item.id] || "";
      const correct = selected === item.correct;
      const stateClass = profileAttempted ? (correct ? "is-correct" : "is-incorrect") : "";
      return `<article class="final-classification ${stateClass}" data-final-profile-row="${item.id}"><div><strong>${item.text}</strong>${profileAttempted ? `<p>${item.explanation}</p>` : ""}</div><select data-final-profile-id="${item.id}" ${profilePassed ? "disabled" : ""}><option value="">Válassz kategóriát</option><option value="fact" ${selected === "fact" ? "selected" : ""}>Biztosan látható adat</option><option value="inference" ${selected === "inference" ? "selected" : ""}>Valószínű következtetés</option><option value="unknown" ${selected === "unknown" ? "selected" : ""}>Nem állapítható meg</option></select></article>`;
    }).join("")}</div>
    <div class="final-step__footer">${profilePassed ? '<div class="final-success"><strong>A profilrekonstrukció pontos.</strong><p>A kockázati kapcsolatok feloldva.</p></div>' : `<button type="button" class="button button--primary" id="final-check-profile" ${complete ? "" : "disabled"}>Besorolás ellenőrzése</button>`}</div>
  </section>`;
}

function createRiskStep() {
  if (!profilePassed) return lockedStep(2, "Kapcsold össze a kockázatos adatokat!", "Előbb készíts pontos profilrekonstrukciót.");
  return `<section class="final-step ${riskPassed ? "final-step--complete" : ""}">
    <header class="final-step__header"><span class="final-step__number">2</span><div><div class="final-step__title-line"><h2>Mely adatok együtt jelentenek nagyobb kockázatot?</h2>${stepStatus(2, riskPassed)}</div><p>Jelöld ki az összes olyan párost, amely összekapcsolva érzékenyebb információt ad.</p></div></header>
    <div class="final-choice-grid">${riskCombinations.map((item) => {
      const selected = selectedRisks.has(item.id);
      let stateClass = "";
      if (riskAttempted && selected) stateClass = item.correct ? "is-correct" : "is-incorrect";
      if (riskAttempted && item.correct && !selected) stateClass = "is-missed";
      return `<label class="final-choice ${stateClass}" data-final-risk-row="${item.id}"><input type="checkbox" data-final-risk-id="${item.id}" ${selected ? "checked" : ""} ${riskPassed ? "disabled" : ""}><span><strong>${item.text}</strong>${riskAttempted ? `<small>${item.explanation}</small>` : ""}</span></label>`;
    }).join("")}</div>
    <div class="final-step__footer">${riskPassed ? '<div class="final-success"><strong>A kockázati térkép elkészült.</strong><p>A védelmi terv feloldva.</p></div>' : `<button type="button" class="button button--primary" id="final-check-risks" ${selectedRisks.size ? "" : "disabled"}>Kapcsolatok ellenőrzése</button>`}</div>
  </section>`;
}

function createProtectionStep() {
  if (!riskPassed) return lockedStep(3, "Állíts össze védelmi tervet!", "Előbb azonosítsd a veszélyes adatkombinációkat.");
  const enoughSelected = selectedProtection.size >= 5;
  return `<section class="final-step ${protectionPassed ? "final-step--complete" : ""}">
    <header class="final-step__header"><span class="final-step__number">3</span><div><div class="final-step__title-line"><h2>Állíts össze védelmi tervet!</h2>${stepStatus(3, protectionPassed)}</div><p>Válaszd ki az öt valóban hatékony biztonsági lépést.</p></div></header>
    <div class="final-choice-grid">${protectionOptions.map((item) => {
      const selected = selectedProtection.has(item.id);
      let stateClass = "";
      if (protectionAttempted && selected) stateClass = item.correct ? "is-correct" : "is-incorrect";
      if (protectionAttempted && item.correct && !selected) stateClass = "is-missed";
      return `<label class="final-choice ${stateClass}" data-final-protection-row="${item.id}"><input type="checkbox" data-final-protection-id="${item.id}" ${selected ? "checked" : ""} ${protectionPassed ? "disabled" : ""}><span>${item.text}</span></label>`;
    }).join("")}</div>
    <div class="final-step__footer">${protectionPassed ? createReport() : `<button type="button" class="button button--primary" id="final-check-protection" ${enoughSelected ? "" : "disabled"}>Védelmi terv ellenőrzése</button>`}</div>
  </section>`;
}

function getRank(total) {
  if (total >= 200) return "Mesternyomozó";
  if (total >= 150) return "Digitális nyomozó";
  if (total >= 100) return "Tapasztalt megfigyelő";
  return "Kezdő nyomkereső";
}

function createReport() {
  const state = getState();
  const total = state.score.investigation + state.score.evidence + state.score.safety;
  return `<section class="final-report" aria-labelledby="final-report-title"><div class="final-report__seal">🏆</div><div><p class="final-report__eyebrow">Nyomozói zárójelentés</p><h2 id="final-report-title">${getRank(total)}</h2><p>Mindhárom bizonyítékforrást összekapcsoltad, és biztonságos védelmi tervet készítettél.</p><div class="final-report__stats"><span><strong>${total}</strong> összpont</span><span><strong>${state.evidenceRecords.length}</strong> összegyűjtött nyom</span><span><strong>${state.completedCases.length}</strong> lezárt ügy</span></div><blockquote>Az internetes nyomok nem külön-külön, hanem összekapcsolva árulják el a legtöbbet.</blockquote></div><button type="button" class="button button--primary" id="final-finish">Zárójelentés lezárása</button></section>`;
}

function renderWorkspace() {
  const workspace = document.querySelector("#final-reconstruction-workspace");
  if (!workspace) return;
  const scrollTop = workspace.scrollTop;
  workspace.innerHTML = `${createProfileStep()}${createRiskStep()}${createProtectionStep()}<div class="final-actions"><button type="button" class="button button--secondary" id="final-cancel">Vissza</button></div>`;
  workspace.scrollTop = scrollTop;
}

function updateProfileFeedback() {
  profileStatements.forEach((item) => {
    const row = document.querySelector(`[data-final-profile-row="${item.id}"]`);
    if (!row) return;
    row.classList.remove("is-correct", "is-incorrect", "is-answered");
    if (profileAttempted) {
      row.classList.add(selectedProfile[item.id] === item.correct ? "is-correct" : "is-incorrect");
    }
  });
  const button = document.querySelector("#final-check-profile");
  if (button instanceof HTMLButtonElement) {
    button.disabled = !profileStatements.every((item) => selectedProfile[item.id]);
  }
}

function updateRiskFeedback() {
  riskCombinations.forEach((item) => {
    const row = document.querySelector(`[data-final-risk-row="${item.id}"]`);
    if (!row) return;
    const selected = selectedRisks.has(item.id);
    row.classList.remove("is-correct", "is-incorrect", "is-missed");
    if (riskAttempted) {
      if (selected) row.classList.add(item.correct ? "is-correct" : "is-incorrect");
      else if (item.correct) row.classList.add("is-missed");
    }
  });
  const button = document.querySelector("#final-check-risks");
  if (button instanceof HTMLButtonElement) button.disabled = selectedRisks.size === 0;
}

function updateProtectionFeedback() {
  protectionOptions.forEach((item) => {
    const row = document.querySelector(`[data-final-protection-row="${item.id}"]`);
    if (!row) return;
    const selected = selectedProtection.has(item.id);
    row.classList.remove("is-correct", "is-incorrect", "is-missed");
    if (protectionAttempted) {
      if (selected) row.classList.add(item.correct ? "is-correct" : "is-incorrect");
      else if (item.correct) row.classList.add("is-missed");
    }
  });
  const button = document.querySelector("#final-check-protection");
  if (button instanceof HTMLButtonElement) button.disabled = selectedProtection.size < 5;
}

function renderOverlay() {
  document.querySelector(`#${OVERLAY_ID}`)?.remove();
  if (!isCaseCompleted(CASE_ID)) resetSession();
  else profilePassed = riskPassed = protectionPassed = true;

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "final-overlay";
  overlay.innerHTML = `<div class="final-overlay__backdrop"></div><section class="final-case" role="dialog" aria-modal="true" aria-labelledby="final-case-title"><header class="final-case__header"><div><p>Végső ügy · Digitális lábnyom</p><h1 id="final-case-title">Rekonstruáld, mit tudhat meg egy idegen!</h1></div><button type="button" class="final-close" aria-label="Finálé bezárása">×</button></header><div class="final-case__body"><aside class="final-evidence-board"><div class="final-evidence-board__top"><span>🧩</span><div><p>Összekapcsolt ügyirat</p><h2>PixelBeni digitális lábnyoma</h2></div></div><div class="final-source-list"><article><span>01</span><div><strong>Közösségi poszt</strong><p>Felhasználónév, kutyanév, iskola, utcanév, hobbi és rutin.</p></div></article><article><span>02</span><div><strong>Játékprofil</strong><p>Azonos avatar, név és több erős vagy gyenge egyezés.</p></div></article><article><span>03</span><div><strong>Nyilvános hozzászólás</strong><p>Edzésnap, idő, megálló, buszjárat és jövőbeli útvonal.</p></div></article></div><div class="final-evidence-board__note"><strong>Nyomozói alapelv</strong><p>Egyetlen adat lehet ártalmatlan. Több adat összekapcsolva azonban részletes profilt adhat.</p></div></aside><section class="final-workspace" id="final-reconstruction-workspace" aria-label="Végső összegző feladatok"></section></div></section>`;
  document.body.appendChild(overlay);
  renderWorkspace();
  overlay.querySelector(".final-close")?.focus();
}

function closeOverlay() {
  document.querySelector(`#${OVERLAY_ID}`)?.remove();
  unlockCaseCard();
}

function checkProfile() {
  profileAttempted = true;
  profilePassed = profileStatements.every((item) => selectedProfile[item.id] === item.correct);
  renderWorkspace();
}

function checkRisks() {
  riskAttempted = true;
  riskPassed = riskCombinations.every((item) => selectedRisks.has(item.id) === item.correct);
  renderWorkspace();
}

function checkProtection() {
  protectionAttempted = true;
  protectionPassed = protectionOptions.every((item) => selectedProtection.has(item.id) === item.correct);
  if (protectionPassed && !isCaseCompleted(CASE_ID)) {
    addScore("investigation", 15);
    addScore("evidence", 15);
    addScore("safety", 15);
    completeCase(CASE_ID);
  }
  renderWorkspace();
}

function scheduleUnlock(attempt = 0) {
  window.requestAnimationFrame(() => {
    unlockCaseCard();
    if (!document.querySelector('[data-case-id="final-reconstruction"]') && attempt < 5) scheduleUnlock(attempt + 1);
  });
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const caseButton = target.closest('[data-case-id="final-reconstruction"]');
  if (caseButton && !caseButton.hasAttribute("disabled")) {
    event.preventDefault();
    event.stopImmediatePropagation();
    renderOverlay();
    return;
  }

  if (target.closest("#final-check-profile")) return checkProfile();
  if (target.closest("#final-check-risks")) return checkRisks();
  if (target.closest("#final-check-protection")) return checkProtection();
  if (target.closest(".final-close, #final-cancel, #final-finish, .final-overlay__backdrop")) closeOverlay();
}, true);

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target instanceof HTMLSelectElement && target.dataset.finalProfileId) {
    selectedProfile[target.dataset.finalProfileId] = target.value;
    updateProfileFeedback();
    return;
  }
  if (!(target instanceof HTMLInputElement)) return;
  if (target.dataset.finalRiskId) {
    target.checked ? selectedRisks.add(target.dataset.finalRiskId) : selectedRisks.delete(target.dataset.finalRiskId);
    updateRiskFeedback();
    return;
  }
  if (target.dataset.finalProtectionId) {
    target.checked ? selectedProtection.add(target.dataset.finalProtectionId) : selectedProtection.delete(target.dataset.finalProtectionId);
    updateProtectionFeedback();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.querySelector(`#${OVERLAY_ID}`)) closeOverlay();
});

window.addEventListener("digital-investigation:state-change", scheduleUnlock);
document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("#continue-button, #headquarters-back-button, #game-profile-finish, #public-comment-finish")) scheduleUnlock();
});

scheduleUnlock();