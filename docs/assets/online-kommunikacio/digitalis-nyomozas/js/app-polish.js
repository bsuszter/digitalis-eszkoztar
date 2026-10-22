// =========================================================
// DIGITÁLIS NYOMOZÓIRODA – alkalmazásszintű finomhangolások
// =========================================================

import { getState } from "./state.js";

const rewriteOrderByGroup = new Map();

function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function updateHeadquartersProgress() {
  const progressValue = document.querySelector(".progress-panel__value");
  const progressFill = document.querySelector(".progress-panel__fill");
  const caseCards = document.querySelectorAll(".case-card");
  if (!progressValue || !progressFill || caseCards.length === 0) return;

  const completedCount = getState().completedCases.length;
  const totalCount = caseCards.length;
  progressValue.textContent = `${completedCount} / ${totalCount} ügy lezárva`;
  progressFill.style.width = `${Math.min(100, (completedCount / totalCount) * 100)}%`;
}

function markAnsweredSelect(select) {
  const answered = select.value !== "";
  select.dataset.answered = String(answered);
  const container = select.closest(
    ".profile-clue-row, .final-classification, .public-comment-choice"
  );
  container?.classList.toggle("is-answered", answered);
}

function refreshAnsweredSelects() {
  document.querySelectorAll("select").forEach(markAnsweredSelect);
}

function applyRewriteOrder() {
  document.querySelectorAll(".public-comment-rewrite-groups fieldset").forEach((fieldset) => {
    const inputs = [...fieldset.querySelectorAll("input[data-rewrite-group]")];
    if (inputs.length === 0) return;

    const groupId = inputs[0].dataset.rewriteGroup;
    const values = inputs.map((input) => input.value);
    if (!rewriteOrderByGroup.has(groupId)) {
      rewriteOrderByGroup.set(groupId, shuffle(values));
    }

    const order = rewriteOrderByGroup.get(groupId);
    inputs.forEach((input) => {
      const label = input.closest("label");
      const optionIndex = order.indexOf(input.value);
      if (label && optionIndex >= 0) label.style.order = String(optionIndex + 1);
    });
  });
}

function enhanceIntro() {
  const startButton = document.querySelector("#start-button");
  const content = startButton?.closest(".screen__content");
  if (!content || content.querySelector("#mystery-letter-scene")) return;

  const scene = document.createElement("section");
  scene.id = "mystery-letter-scene";
  scene.className = "intro-story-card";
  scene.setAttribute("aria-labelledby", "mystery-letter-title");
  scene.innerHTML = `
    <div class="intro-story-visual" aria-hidden="true">
      <div class="intro-beni">
        <span class="intro-beni__head"></span>
        <span class="intro-beni__hair"></span>
        <span class="intro-beni__body"></span>
        <span class="intro-phone"></span>
      </div>
      <div class="intro-envelope"></div>
    </div>
    <article class="intro-letter">
      <p>Az üzenet, amely elindította az ügyet</p>
      <h2 id="mystery-letter-title">„Szia, PixelBeni!”</h2>
      <p>
        Tudom, hogy Zokni a kutyád neve, ugyanazt a nevet és avatart használod a játékban, kedden és csütörtökön fél hatkor végzel, a Kossuth utcai megállónál várod a 15-ös buszt, és gyakran egyedül mész haza. Azt is tudom, melyik iskolába jársz. Meglepő, mennyi mindent elárul rólad az internet…
      </p>
      <p>— Egy ismeretlen megfigyelő</p>
      <p><strong>A feladó honnan tudhatta mindezt?</strong> A válasz három különböző internetes nyomban rejtőzik.</p>
    </article>`;

  const missionCard = content.querySelector(".mission-card");
  missionCard?.insertAdjacentElement("beforebegin", scene);
}

function getCertificateData() {
  const state = getState();
  const total = state.score.investigation + state.score.evidence + state.score.safety;
  return {
    total,
    rank: document.querySelector("#final-report-title")?.textContent?.trim() || "Digitális nyomozó",
    evidenceCount: state.evidenceRecords.length,
    completedCount: state.completedCases.length,
    date: new Intl.DateTimeFormat("hu-HU", {
      year: "numeric", month: "long", day: "numeric"
    }).format(new Date())
  };
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createCertificateSvg(name, data) {
  const safeName = escapeXml(name || "Digitális nyomozó");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="990" viewBox="0 0 1400 990">
    <defs>
      <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffdf5"/><stop offset="1" stop-color="#efe5cf"/></linearGradient>
    </defs>
    <rect width="1400" height="990" fill="url(#paper)"/>
    <rect x="35" y="35" width="1330" height="920" rx="12" fill="none" stroke="#173249" stroke-width="12"/>
    <rect x="58" y="58" width="1284" height="874" rx="8" fill="none" stroke="#c59a3c" stroke-width="4"/>
    <circle cx="700" cy="175" r="72" fill="#173249" stroke="#c59a3c" stroke-width="10"/>
    <text x="700" y="190" text-anchor="middle" font-family="Arial" font-size="42" font-weight="800" fill="#f8e8b8">DN</text>
    <text x="700" y="290" text-anchor="middle" font-family="Georgia" font-size="76" font-weight="700" fill="#102234">Nyomozói oklevél</text>
    <text x="700" y="355" text-anchor="middle" font-family="Arial" font-size="26" letter-spacing="7" fill="#16899a">DIGITÁLIS NYOMOZÓIRODA</text>
    <text x="700" y="445" text-anchor="middle" font-family="Arial" font-size="30" fill="#41566a">Ez az oklevél igazolja, hogy</text>
    <text x="700" y="535" text-anchor="middle" font-family="Georgia" font-size="62" font-weight="700" fill="#173249">${safeName}</text>
    <line x1="310" y1="560" x2="1090" y2="560" stroke="#c59a3c" stroke-width="3"/>
    <text x="700" y="625" text-anchor="middle" font-family="Arial" font-size="29" fill="#41566a">sikeresen feltárta és összekapcsolta PixelBeni digitális nyomait.</text>
    <text x="700" y="700" text-anchor="middle" font-family="Georgia" font-size="42" font-weight="700" fill="#173249">${escapeXml(data.rank)}</text>
    <text x="700" y="770" text-anchor="middle" font-family="Arial" font-size="28" fill="#41566a">${data.total} összpont · ${data.evidenceCount} bizonyíték · ${data.completedCount} lezárt ügy</text>
    <text x="700" y="845" text-anchor="middle" font-family="Georgia" font-size="25" font-style="italic" fill="#173249">„Az apró internetes részletek együtt sokkal többet árulhatnak el.”</text>
    <text x="700" y="900" text-anchor="middle" font-family="Arial" font-size="22" fill="#5c6e7f">Kelt: ${escapeXml(data.date)}</text>
  </svg>`;
}

function downloadCertificate() {
  const input = document.querySelector("#certificate-name");
  const name = input instanceof HTMLInputElement ? input.value.trim() : "";
  const svg = createCertificateSvg(name, getCertificateData());
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "digitalis-nyomozoi-oklevel.svg";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openCertificate() {
  document.querySelector("#detective-certificate-overlay")?.remove();
  const data = getCertificateData();
  const overlay = document.createElement("div");
  overlay.id = "detective-certificate-overlay";
  overlay.className = "certificate-overlay";
  overlay.innerHTML = `
    <div class="certificate-overlay__backdrop" data-certificate-close="true"></div>
    <section class="detective-certificate" role="dialog" aria-modal="true" aria-labelledby="certificate-title">
      <button type="button" class="certificate-close" data-certificate-close="true" aria-label="Oklevél bezárása">×</button>
      <p class="detective-certificate__eyebrow">Digitális Nyomozóiroda</p>
      <div class="detective-certificate__seal" aria-hidden="true">DN</div>
      <h1 id="certificate-title">Nyomozói oklevél</h1>
      <p class="detective-certificate__lead">Az oklevél igazolja, hogy tulajdonosa sikeresen feltárta és összekapcsolta PixelBeni digitális lábnyomának nyomait.</p>
      <div class="detective-certificate__name-field">
        <label for="certificate-name">A nyomozó neve</label>
        <input id="certificate-name" type="text" maxlength="70" placeholder="Írd be a nevet az oklevélhez">
      </div>
      <p class="detective-certificate__rank">${data.rank}</p>
      <div class="detective-certificate__stats"><span><strong>${data.total}</strong> összpont</span><span><strong>${data.evidenceCount}</strong> bizonyíték</span><span><strong>${data.completedCount}</strong> lezárt ügy</span></div>
      <blockquote>Az apró internetes részletek együtt sokkal többet árulhatnak el, mint külön-külön.</blockquote>
      <p class="detective-certificate__date">Kelt: ${data.date}</p>
      <div class="detective-certificate__actions">
        <button type="button" class="button button--primary" id="certificate-download">Oklevél letöltése</button>
        <button type="button" class="button button--secondary" id="certificate-print">Nyomtatás</button>
        <button type="button" class="button button--secondary" data-certificate-close="true">Bezárás</button>
      </div>
    </section>`;
  document.body.appendChild(overlay);
  overlay.querySelector("#certificate-name")?.focus();
}

function enhanceFinalReport() {
  const report = document.querySelector(".final-report");
  if (!report || report.querySelector("#open-certificate")) return;
  const button = document.createElement("button");
  button.type = "button";
  button.id = "open-certificate";
  button.className = "button button--secondary";
  button.textContent = "Nyomozói oklevél";
  report.querySelector("#final-finish")?.insertAdjacentElement("beforebegin", button);
}

function scheduleRefresh() {
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    updateHeadquartersProgress();
    refreshAnsweredSelects();
    applyRewriteOrder();
    enhanceIntro();
    enhanceFinalReport();
  }));
}

window.addEventListener("digital-investigation:state-change", scheduleRefresh);

document.addEventListener("change", (event) => {
  if (event.target instanceof HTMLSelectElement) markAnsweredSelect(event.target);
  scheduleRefresh();
}, true);

document.addEventListener("pointerdown", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest('[data-case-id="public-comment"]')) rewriteOrderByGroup.clear();
  scheduleRefresh();
}, true);

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest("#open-certificate")) return openCertificate();
  if (target.closest("#certificate-download")) return downloadCertificate();
  if (target.closest("#certificate-print")) return window.print();
  if (target.closest("[data-certificate-close='true']")) {
    document.querySelector("#detective-certificate-overlay")?.remove();
    return;
  }
  scheduleRefresh();
}, true);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") document.querySelector("#detective-certificate-overlay")?.remove();
});

scheduleRefresh();