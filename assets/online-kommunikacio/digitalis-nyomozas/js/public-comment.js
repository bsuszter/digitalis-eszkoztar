import {
  addEvidenceRecord,
  addScore,
  completeCase,
  isCaseCompleted
} from "./state.js";

const CASE_ID = "public-comment";
const OVERLAY_ID = "public-comment-overlay";

const riskSegments = [
  { id: "positive", text: "Szuper volt a mai edzés!", risk: false, explanation: "Ez általános élménybeszámoló, nem árul el pontos rutint." },
  { id: "days", text: "Kedden és csütörtökön", risk: true, explanation: "A rendszeresen ismétlődő napok kiszámíthatóvá teszik a rutint." },
  { id: "time", text: "fél hatkor végzünk.", risk: true, explanation: "A pontos időpont megmutatja, mikor érhet véget az edzés." },
  { id: "place", text: "Általában a Kossuth utcai megállónál várok,", risk: true, explanation: "A rendszeres várakozási hely pontos helyadat." },
  { id: "bus", text: "aztán a 15-ös busszal", risk: true, explanation: "A buszjárat az útvonal szűkítését segíti." },
  { id: "alone", text: "egyedül megyek haza.", risk: true, explanation: "Azt sugallja, hogy egy adott időszakban nincs vele ismerős felnőtt vagy csapattárs." },
  { id: "future", text: "Jövő héten is ugyanígy lesz.", risk: true, explanation: "A jövőbeli ismétlődés előre jelezhetővé teszi a mozgását." },
  { id: "emoji", text: "🏀", risk: false, explanation: "Az emoji önmagában nem teszi veszélyesebbé a hozzászólást." }
];

const inferenceOptions = [
  { id: "training-days", label: "Mely napokon van rendszeresen edzése.", correct: true },
  { id: "arrival-time", label: "Körülbelül mikor lehet a megállónál.", correct: true },
  { id: "bus-route", label: "Melyik buszjáratot használhatja.", correct: true },
  { id: "alone-likely", label: "Bizonyos időszakban valószínűleg egyedül közlekedik.", correct: true },
  { id: "exact-home", label: "Pontosan hol lakik.", correct: false },
  { id: "full-name", label: "Mi a teljes neve.", correct: false },
  { id: "always-alone", label: "Biztosan minden alkalommal teljesen egyedül van.", correct: false }
];

const rewriteGroups = [
  {
    id: "opening",
    title: "Bevezetés",
    options: [
      { id: "opening-safe", text: "Jó volt a mai edzés!", correct: true },
      { id: "opening-time", text: "Kedden fél hatkor végzünk.", correct: false },
      { id: "opening-place", text: "A Kossuth utcán találkozunk.", correct: false }
    ]
  },
  {
    id: "details",
    title: "Következő alkalom",
    options: [
      { id: "details-safe", text: "A következő alkalom részleteit a csapat zárt csoportjában beszéljük meg.", correct: true },
      { id: "details-future", text: "Jövő héten is ugyanitt leszek.", correct: false },
      { id: "details-bus", text: "A 15-ös busszal megyek haza.", correct: false }
    ]
  },
  {
    id: "closing",
    title: "Zárás",
    options: [
      { id: "closing-safe", text: "Hajrá csapat! 🏀", correct: true },
      { id: "closing-alone", text: "Általában egyedül várok.", correct: false },
      { id: "closing-contact", text: "Írjatok rám, ha arra jártok.", correct: false }
    ]
  }
];

let selectedRisks = new Set();
let selectedInferences = new Set();
let selectedRewrite = {};
let riskAttempted = false;
let inferenceAttempted = false;
let rewriteAttempted = false;
let riskPassed = false;
let inferencePassed = false;
let rewritePassed = false;

function resetSession() {
  selectedRisks = new Set();
  selectedInferences = new Set();
  selectedRewrite = {};
  riskAttempted = false;
  inferenceAttempted = false;
  rewriteAttempted = false;
  riskPassed = false;
  inferencePassed = false;
  rewritePassed = false;
}

function unlockCaseCard() {
  const button = document.querySelector('[data-case-id="public-comment"]');
  if (!button) return;

  const available = isCaseCompleted("game-profile") || isCaseCompleted(CASE_ID);
  const completed = isCaseCompleted(CASE_ID);
  if (!available) return;

  const card = button.closest(".case-card");
  const status = card?.querySelector(".case-card__status");

  button.disabled = false;
  button.classList.remove("button--secondary");
  button.classList.add("button--primary");
  button.textContent = completed ? "Ügy megtekintése" : "Ügy megnyitása";

  card?.classList.remove("case-card--locked");
  card?.classList.toggle("case-card--completed", completed);
  card?.classList.toggle("case-card--unlocked", !completed);
  if (status) status.textContent = completed ? "Lezárva" : "Elérhető";
}

function createForumPanel() {
  return `
    <section class="public-comment-forum" aria-labelledby="public-comment-post-title">
      <div class="public-comment-forum__bar">
        <div><span aria-hidden="true">🏀</span><strong>U15 Kosárcsapat</strong></div>
        <span class="public-comment-forum__public">🌐 Nyilvános fórum</span>
      </div>

      <article class="public-comment-post">
        <header class="public-comment-post__header">
          <div class="public-comment-avatar" role="img" aria-label="PixelBeni rajzolt profilképe"></div>
          <div><h2 id="public-comment-post-title">PixelBeni</h2><p>ma, 18:12 · bárki láthatja</p></div>
        </header>

        <p class="public-comment-post__message">
          ${riskSegments.map((segment) => {
            const selected = selectedRisks.has(segment.id);
            let stateClass = selected ? "public-comment-segment--selected" : "";
            if (riskAttempted) {
              if (segment.risk && selected) stateClass += " public-comment-segment--correct";
              if (!segment.risk && selected) stateClass += " public-comment-segment--incorrect";
              if (segment.risk && !selected) stateClass += " public-comment-segment--missed";
            }
            return `<button type="button" class="public-comment-segment ${stateClass}" data-risk-id="${segment.id}" ${riskPassed ? "disabled" : ""}>${segment.text}</button>`;
          }).join(" ")}
        </p>

        <div class="public-comment-post__meta"><span>👍 14</span><span>💬 3 válasz</span><span>↗ Megosztás</span></div>
      </article>

      <div class="public-comment-warning"><span aria-hidden="true">⚠️</span><p>Ez a fórum nyilvános. A hozzászólást nemcsak a csapattagok láthatják.</p></div>
    </section>
  `;
}

function statusBadge(number, passed) {
  return passed
    ? `<span class="public-comment-step__status public-comment-step__status--done">✓ Kész</span>`
    : `<span class="public-comment-step__status">${number}/3. lépés</span>`;
}

function createRiskStage() {
  const riskyIds = riskSegments.filter((item) => item.risk).map((item) => item.id);
  const selectedCount = selectedRisks.size;
  const feedback = riskAttempted
    ? riskSegments.map((segment) => {
        const selected = selectedRisks.has(segment.id);
        const isCorrect = segment.risk === selected;
        return `<li class="${isCorrect ? "is-correct" : "is-incorrect"}"><strong>${segment.text}</strong> ${segment.explanation}</li>`;
      }).join("")
    : "";

  return `
    <section class="public-comment-step ${riskPassed ? "public-comment-step--complete" : ""}">
      <header class="public-comment-step__header"><span class="public-comment-step__number">1</span><div><div class="public-comment-step__title-line"><h2>Jelöld meg a kockázatos részleteket!</h2>${statusBadge(1, riskPassed)}</div><p>Kattints minden olyan mondatrészre, amelyből hely, időpont, útvonal vagy kiszámítható rutin derülhet ki.</p></div></header>
      <p class="public-comment-step__progress">${selectedCount} részlet kijelölve</p>
      ${riskAttempted ? `<ul class="public-comment-feedback-list">${feedback}</ul>` : ""}
      <div class="public-comment-step__footer">
        ${riskPassed
          ? `<div class="public-comment-success"><strong>Mind a ${riskyIds.length} kockázatos részletet megtaláltad.</strong><p>A következtetési feladat feloldva.</p></div>`
          : `<button type="button" class="button button--primary" id="public-comment-check-risks" ${selectedCount ? "" : "disabled"}>Kockázatok ellenőrzése</button>`}
      </div>
    </section>`;
}

function createLockedStage(number, title, text) {
  return `<section class="public-comment-step public-comment-step--locked" aria-disabled="true"><span class="public-comment-step__lock">🔒</span><div><p>${statusBadge(number, false)}</p><h2>${title}</h2><p>${text}</p></div></section>`;
}

function createInferenceStage() {
  if (!riskPassed) return createLockedStage(2, "Mit lehet kikövetkeztetni?", "Előbb találd meg az összes kockázatos részletet.");

  return `
    <section class="public-comment-step ${inferencePassed ? "public-comment-step--complete" : ""}">
      <header class="public-comment-step__header"><span class="public-comment-step__number">2</span><div><div class="public-comment-step__title-line"><h2>Mit lehet kikövetkeztetni?</h2>${statusBadge(2, inferencePassed)}</div><p>Jelöld ki az összes megalapozott következtetést, de ne válassz túl erős állítást.</p></div></header>
      <div class="public-comment-choice-grid">
        ${inferenceOptions.map((option) => {
          const selected = selectedInferences.has(option.id);
          let feedbackClass = "";
          if (inferenceAttempted && selected) feedbackClass = option.correct ? "is-correct" : "is-incorrect";
          if (inferenceAttempted && option.correct && !selected) feedbackClass = "is-missed";
          return `<label class="public-comment-choice ${feedbackClass}"><input type="checkbox" data-inference-id="${option.id}" ${selected ? "checked" : ""} ${inferencePassed ? "disabled" : ""}><span>${option.label}</span></label>`;
        }).join("")}
      </div>
      ${inferenceAttempted ? `<div class="public-comment-explanation"><strong>${inferencePassed ? "Helyes következtetések." : "Néhány állítást még gondolj át."}</strong><p>A pontos lakcím, a teljes név és a teljes bizonyosság nem következik a hozzászólásból.</p></div>` : ""}
      <div class="public-comment-step__footer">${inferencePassed ? `<div class="public-comment-success"><strong>A következtetések rendben vannak.</strong><p>A biztonságos átírás feloldva.</p></div>` : `<button type="button" class="button button--primary" id="public-comment-check-inferences" ${selectedInferences.size ? "" : "disabled"}>Következtetések ellenőrzése</button>`}</div>
    </section>`;
}

function createRewriteStage() {
  if (!inferencePassed) return createLockedStage(3, "Készíts biztonságosabb hozzászólást!", "Előbb válaszd ki helyesen a megalapozott következtetéseket.");

  const complete = rewriteGroups.every((group) => selectedRewrite[group.id]);
  const preview = rewriteGroups.map((group) => {
    const option = group.options.find((item) => item.id === selectedRewrite[group.id]);
    return option?.text || "…";
  }).join(" ");

  return `
    <section class="public-comment-step ${rewritePassed ? "public-comment-step--complete" : ""}">
      <header class="public-comment-step__header"><span class="public-comment-step__number">3</span><div><div class="public-comment-step__title-line"><h2>Készíts biztonságosabb hozzászólást!</h2>${statusBadge(3, rewritePassed)}</div><p>Mindhárom részből válassz egy mondatot. A biztonságos változat ne tartalmazzon pontos rutint.</p></div></header>
      <div class="public-comment-rewrite-groups">
        ${rewriteGroups.map((group) => `<fieldset><legend>${group.title}</legend>${group.options.map((option) => {
          const selected = selectedRewrite[group.id] === option.id;
          let stateClass = "";
          if (rewriteAttempted && selected) stateClass = option.correct ? "is-correct" : "is-incorrect";
          return `<label class="public-comment-choice ${stateClass}"><input type="radio" name="rewrite-${group.id}" data-rewrite-group="${group.id}" value="${option.id}" ${selected ? "checked" : ""} ${rewritePassed ? "disabled" : ""}><span>${option.text}</span></label>`;
        }).join("")}</fieldset>`).join("")}
      </div>
      <div class="public-comment-preview"><span>Összeállított hozzászólás</span><p>${preview}</p></div>
      ${rewriteAttempted ? `<div class="public-comment-explanation"><strong>${rewritePassed ? "Biztonságosabb változat készült." : "Maradt benne túl pontos információ."}</strong><p>A részleteket a csapat zárt csoportjában érdemes megbeszélni.</p></div>` : ""}
      <div class="public-comment-step__footer">${rewritePassed ? `<div class="public-comment-case-complete"><div><strong>A 3. ügy minden lépése elkészült.</strong><p>Felismerted, hogyan áll össze egy nyilvános hozzászólásból a napi rutin.</p></div><button type="button" class="button button--primary" id="public-comment-finish">Ügy lezárása</button></div>` : `<button type="button" class="button button--primary" id="public-comment-check-rewrite" ${complete ? "" : "disabled"}>Átírás ellenőrzése</button>`}</div>
    </section>`;
}

function renderWorkspace() {
  const workspace = document.querySelector("#public-comment-workspace");
  if (!workspace) return;
  const scrollTop = workspace.scrollTop;
  workspace.innerHTML = `${createRiskStage()}${createInferenceStage()}${createRewriteStage()}<div class="public-comment-actions"><button type="button" class="button button--secondary" id="public-comment-cancel">Vissza</button></div>`;
  workspace.scrollTop = scrollTop;
}

function renderOverlay() {
  document.querySelector(`#${OVERLAY_ID}`)?.remove();
  if (!isCaseCompleted(CASE_ID)) resetSession();
  else riskPassed = inferencePassed = rewritePassed = true;

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.className = "public-comment-overlay";
  overlay.innerHTML = `<div class="public-comment-overlay__backdrop"></div><section class="public-comment-case" role="dialog" aria-modal="true" aria-labelledby="public-comment-case-title"><header class="public-comment-case__header"><div><p>3. ügy · Nyilvános hozzászólás</p><h1 id="public-comment-case-title">Mennyit árul el a napi rutin?</h1></div><button type="button" class="public-comment-close" aria-label="Ügy bezárása">×</button></header><div class="public-comment-case__layout">${createForumPanel()}<section class="public-comment-workspace" id="public-comment-workspace" aria-label="A nyilvános hozzászólás feladatai"></section></div></section>`;
  document.body.appendChild(overlay);
  renderWorkspace();
  overlay.querySelector(".public-comment-close")?.focus();
}

function closeOverlay() {
  document.querySelector(`#${OVERLAY_ID}`)?.remove();
  unlockCaseCard();
}

function checkRisks() {
  riskAttempted = true;
  riskPassed = riskSegments.every((segment) => segment.risk === selectedRisks.has(segment.id));
  renderWorkspace();
}

function checkInferences() {
  inferenceAttempted = true;
  inferencePassed = inferenceOptions.every((option) => option.correct === selectedInferences.has(option.id));
  renderWorkspace();
}

function awardResults() {
  if (isCaseCompleted(CASE_ID)) return;
  addScore("investigation", 20);
  addScore("evidence", 20);
  addScore("safety", 20);

  [
    { id: "public-comment-days-time", title: "Rendszeres edzésnapok és pontos idő", certainty: "Biztosan közölt információ", description: "A hozzászólás rendszeresen ismétlődő napokat és pontos befejezési időt közöl." },
    { id: "public-comment-place", title: "Kossuth utcai megálló", certainty: "Biztos adat", description: "A rendszeres várakozási hely nyilvánosan látható." },
    { id: "public-comment-route", title: "15-ös buszjárat", certainty: "Valószínű útvonal", description: "A megadott buszjárat segíthet az útvonal szűkítésében." },
    { id: "public-comment-alone", title: "Valószínűleg egyedül közlekedik", certainty: "Valószínű következtetés", description: "A közlés szerint az edzés után egyedül indul haza." },
    { id: "public-comment-future", title: "A rutin a következő héten ismétlődik", certainty: "Biztosan közölt információ", description: "A jövőbeli ismétlődés előre jelezhetővé teszi a mozgását." }
  ].forEach((record) => addEvidenceRecord({ ...record, source: "Nyilvános sportfórum", caseId: CASE_ID }));

  completeCase(CASE_ID);
}

function checkRewrite() {
  rewriteAttempted = true;
  rewritePassed = rewriteGroups.every((group) => {
    const option = group.options.find((item) => item.id === selectedRewrite[group.id]);
    return option?.correct;
  });
  if (rewritePassed) awardResults();
  renderWorkspace();
}

function initializeEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const caseButton = target.closest('[data-case-id="public-comment"]');
    if (caseButton && !caseButton.hasAttribute("disabled")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      renderOverlay();
      return;
    }

    const riskButton = target.closest("[data-risk-id]");
    if (riskButton && !riskPassed) {
      const id = riskButton.dataset.riskId;
      selectedRisks.has(id) ? selectedRisks.delete(id) : selectedRisks.add(id);
      riskAttempted = false;
      document.querySelector(".public-comment-forum")?.replaceWith(document.createRange().createContextualFragment(createForumPanel()));
      renderWorkspace();
      return;
    }

    if (target.closest("#public-comment-check-risks")) return checkRisks();
    if (target.closest("#public-comment-check-inferences")) return checkInferences();
    if (target.closest("#public-comment-check-rewrite")) return checkRewrite();

    if (target.closest(".public-comment-close, #public-comment-cancel, #public-comment-finish, .public-comment-overlay__backdrop")) closeOverlay();
  }, true);

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;

    if (target.dataset.inferenceId) {
      target.checked ? selectedInferences.add(target.dataset.inferenceId) : selectedInferences.delete(target.dataset.inferenceId);
      inferenceAttempted = false;
      renderWorkspace();
      return;
    }

    if (target.dataset.rewriteGroup) {
      selectedRewrite[target.dataset.rewriteGroup] = target.value;
      rewriteAttempted = false;
      renderWorkspace();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector(`#${OVERLAY_ID}`)) closeOverlay();
  });

  const app = document.querySelector("#app");
  if (app) {
    const observer = new MutationObserver(() => window.requestAnimationFrame(unlockCaseCard));
    observer.observe(app, { childList: true, subtree: false });
  }

  unlockCaseCard();
}

initializeEvents();
