const app = document.querySelector("#app");
const missionStatus = document.querySelector("#mission-status");
const homeLink = document.querySelector("#home-link");
const imageDialog = document.querySelector("#image-dialog");
const imageDialogImage = document.querySelector("#image-dialog-image");
const imageDialogTitle = document.querySelector("#image-dialog-title");
const imageDialogClose = document.querySelector("#image-dialog-close");

const missions = [
  {
    id: "museum-poster",
    number: "1. küldetés",
    title: "A rejtélyes plakát",
    shortDescription: "A plakáton két különböző időpont szerepel. Derítsd ki, melyik a helyes!",
    tag: "Ellentmondás tisztázása",
    emoji: "🗺️",
    recipient: "program@iskolapelda.hu",
    imagePath: "assets/images/muzeumi-plakat.png",
    imageAlt: "Egy múzeumi program plakátja, amelyen eltérő kezdési és találkozási időpont látható.",
    instruction: "Figyeld meg a program plakátját! Írj levelet a szervezőnek, és tisztázd udvariasan a bizonytalan információkat!",
    observations: [
      "Mi az, ami nem egyértelmű a plakáton?",
      "Melyik adat biztos, és melyikre kell rákérdezni?",
      "Milyen választ vársz a szervezőtől?"
    ],
    prompts: [
      "Melyik programról írsz?",
      "Melyik időpontot szeretnéd tisztázni?",
      "Mit kell még magaddal vinned?"
    ],
    requiredIdeas: ["17", "18", "óra", "időpont", "kezd", "találkoz", "vinni"]
  },
  {
    id: "lost-bottle",
    number: "2. küldetés",
    title: "Az elveszett kulacs",
    shortDescription: "Egy 5. B jelzésű kulacsot találtál az udvaron. Segíts visszajuttatni a gazdájához!",
    tag: "Tárgy pontos leírása",
    emoji: "🥤",
    recipient: "attila.bacsi@iskolapelda.hu",
    imagePath: "assets/images/elveszett-kulacs.png",
    imageAlt: "Egy iskolaudvari padon álló színes kulacs, amelyen 5. B felirat és több matrica látható.",
    instruction: "Nézd meg alaposan a talált kulacsot! Írj levelet Attila bácsinak, az 5. B osztályfőnökének! Írd le, hol találtad, és hogyan lehet felismerni!",
    observations: [
      "Milyen színű a kulacs?",
      "Milyen osztályjelzés és matricák láthatók rajta?",
      "Hol találtad meg?"
    ],
    prompts: [
      "Hogyan szólítod meg Attila bácsit?",
      "Mely részletek alapján lehet felismerni a kulacsot?",
      "Hogyan juthat vissza a tulajdonosához?"
    ],
    requiredIdeas: ["kulacs", "5. b", "5.b", "pad", "udvar", "matrica", "talált"]
  },
  {
    id: "trip-notice",
    number: "3. küldetés",
    title: "A hiányos kirándulás",
    shortDescription: "A hirdetésből fontos részletek hiányoznak. Kérdezd meg, amit indulás előtt tudnod kell!",
    tag: "Hiányzó információk",
    emoji: "🎒",
    recipient: "kirandulas@iskolapelda.hu",
    imagePath: "assets/images/kirandulasi-hirdetes.png",
    imageAlt: "Egy osztálykirándulás hirdetése, amelyről hiányzik a visszaérkezés időpontja és a szükséges felszerelés.",
    instruction: "Vizsgáld meg a kirándulási hirdetést! Írj érdeklődő levelet a szervezőnek a hiányzó, de számodra fontos információkról!",
    observations: [
      "Mely adatokat tudod meg a hirdetésből?",
      "Mi az, amit indulás előtt még feltétlenül tudnod kell?",
      "Hány kérdést érdemes feltenned?"
    ],
    prompts: [
      "Melyik kirándulás érdekel?",
      "Mikor érkezik vissza a csoport?",
      "Mit kell magaddal vinned?"
    ],
    requiredIdeas: ["vissza", "érkez", "vinni", "felszerel", "kirándul"]
  }
];

const state = {
  screen: "missions",
  missionId: null,
  recipient: "",
  subject: "",
  message: ""
};

function getMission() {
  return missions.find((mission) => mission.id === state.missionId) || null;
}

function cloneTemplate(id) {
  const template = document.querySelector(`#${id}`);
  return template.content.cloneNode(true);
}

function focusApp() {
  window.requestAnimationFrame(() => app.focus());
}

function createMissionCardVisual(mission) {
  const visual = document.createElement("div");
  visual.className = "mission-card__visual";
  visual.setAttribute("aria-hidden", "true");

  const fallback = document.createElement("span");
  fallback.className = "mission-card__emoji";
  fallback.textContent = mission.emoji;
  visual.appendChild(fallback);

  const image = new Image();
  image.className = "mission-card__image";
  image.alt = "";
  image.src = mission.imagePath;
  image.addEventListener("load", () => {
    visual.classList.add("has-image");
    visual.replaceChildren(image);
  });

  return visual;
}

function renderMissionSelection() {
  state.screen = "missions";
  missionStatus.textContent = "Küldetésválasztás";
  app.replaceChildren(cloneTemplate("mission-selection-template"));

  const grid = document.querySelector("#mission-grid");
  missions.forEach((mission) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mission-card";
    button.dataset.missionId = mission.id;

    const visual = createMissionCardVisual(mission);
    const body = document.createElement("div");
    body.className = "mission-card__body";
    body.innerHTML = `
      <h2>${mission.title}</h2>
      <p>${mission.shortDescription}</p>
      <span class="mission-card__tag">${mission.tag}</span>
    `;

    button.append(visual, body);
    grid.appendChild(button);
  });

  focusApp();
}

function createVisualPlaceholder(mission) {
  const wrapper = document.createElement("div");
  wrapper.className = "visual-placeholder";
  wrapper.innerHTML = `
    <span aria-hidden="true">${mission.emoji}</span>
    <strong>Tedd a képet ebbe a mappába!</strong>
    <code>${mission.imagePath}</code>
  `;
  return wrapper;
}

function loadMissionVisual(container, mission) {
  container.setAttribute("aria-label", `${mission.imageAlt} Kattints a nagyításhoz!`);
  container.dataset.imagePath = mission.imagePath;
  container.dataset.imageAlt = mission.imageAlt;
  container.dataset.imageTitle = mission.title;

  const image = new Image();
  image.className = "mission-image";
  image.alt = mission.imageAlt;
  image.src = mission.imagePath;
  image.addEventListener("load", () => {
    container.disabled = false;
    container.classList.add("has-image");
    container.replaceChildren(image);
  });
  image.addEventListener("error", () => {
    container.disabled = true;
    container.classList.remove("has-image");
    container.replaceChildren(createVisualPlaceholder(mission));
  });

  container.disabled = true;
  container.replaceChildren(createVisualPlaceholder(mission));
}

function openImageDialog(path, alt, title) {
  if (!path || !imageDialog || !imageDialogImage) return;
  imageDialogImage.src = path;
  imageDialogImage.alt = alt || "A küldetés nagyított képe";
  imageDialogTitle.textContent = title || "Küldetés képe";
  imageDialog.showModal();
  imageDialogClose.focus();
}

function closeImageDialog() {
  if (!imageDialog?.open) return;
  imageDialog.close();
  imageDialogImage.src = "";
}

function normalizeText(text) {
  return text.trim().toLowerCase();
}

function isValidEmail(value) {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasGreeting(text) {
  const firstLines = normalizeText(text).split(/\n+/).slice(0, 2).join(" ");
  return /^(kedves|tisztelt|szia|jó napot)/.test(firstLines);
}

function hasClosing(text) {
  const lower = normalizeText(text);
  return ["üdvözlettel", "köszönettel", "tisztelettel", "szia", "üdv"].some((word) => lower.includes(word));
}

function hasSignature(text) {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 3) return false;
  const lastLine = lines.at(-1);
  return lastLine.length >= 2 && lastLine.length <= 40;
}

function containsMissionIdea(text, mission) {
  const lower = normalizeText(text);
  return mission.requiredIdeas.some((idea) => lower.includes(idea));
}

function hasMessageBody(text, mission) {
  const trimmed = text.trim();
  return trimmed.length >= 70 && containsMissionIdea(trimmed, mission);
}

function getCriteria(mission) {
  const text = state.message.trim();
  const emailIsCorrect = isValidEmail(state.recipient) && state.recipient.trim().toLowerCase() === mission.recipient.toLowerCase();

  return [
    {
      label: "A címzett e-mail-címe pontos és megfelelő formájú.",
      met: emailIsCorrect,
      className: "criteria-item--important"
    },
    {
      label: "A tárgy röviden jelzi a levél célját.",
      met: state.subject.trim().length >= 5,
      className: "criteria-item--important"
    },
    {
      label: "1. Van megfelelő megszólítás.",
      met: hasGreeting(text),
      className: "criteria-item--section"
    },
    {
      label: "2. A levél szövege kapcsolódik a képen látható helyzethez.",
      met: hasMessageBody(text, mission),
      className: "criteria-item--section"
    },
    {
      label: "3. Van elköszönés és aláírás.",
      met: hasClosing(text) && hasSignature(text),
      className: "criteria-item--section"
    }
  ];
}

function refreshCriteria() {
  const mission = getMission();
  const list = document.querySelector("#criteria-list");
  if (!mission || !list) return;

  list.innerHTML = getCriteria(mission).map((criterion) => `
    <li class="criteria-item ${criterion.className} ${criterion.met ? "is-met" : ""}">
      <span class="criteria-icon" aria-hidden="true">${criterion.met ? "✓" : "•"}</span>
      <span>${criterion.label}</span>
    </li>
  `).join("");
}

function renderComposer() {
  const mission = getMission();
  if (!mission) return renderMissionSelection();

  state.screen = "composer";
  missionStatus.textContent = mission.number;
  app.replaceChildren(cloneTemplate("composer-template"));

  document.querySelector("#mission-number").textContent = mission.number;
  document.querySelector("#composer-title").textContent = mission.title;
  document.querySelector("#mission-instruction").textContent = mission.instruction;
  document.querySelector("#mission-badge").textContent = mission.tag;

  const recipient = document.querySelector("#recipient");
  const subject = document.querySelector("#subject");
  const message = document.querySelector("#message");

  recipient.placeholder = mission.recipient;
  recipient.value = state.recipient;
  subject.value = state.subject;
  message.value = state.message;

  document.querySelector("#character-count").textContent = `${state.message.length} / 1600`;
  document.querySelector("#observation-list").innerHTML = mission.observations.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#prompt-list").innerHTML = mission.prompts.map((item) => `<li>${item}</li>`).join("");

  loadMissionVisual(document.querySelector("#mission-visual"), mission);
  refreshCriteria();
  focusApp();
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderPreview() {
  const mission = getMission();
  if (!mission) return renderMissionSelection();

  state.screen = "preview";
  missionStatus.textContent = "Levél átnézése";
  app.replaceChildren(cloneTemplate("preview-template"));

  document.querySelector("#preview-subject").textContent = state.subject.trim() || "(Nincs tárgy)";
  document.querySelector("#preview-recipient").textContent = state.recipient.trim() || "(Nincs címzett)";
  document.querySelector("#preview-message").innerHTML = escapeHtml(state.message.trim() || "(A levél szövege üres.)");
  focusApp();
}

function selectMission(missionId) {
  state.missionId = missionId;
  state.recipient = "";
  state.subject = "";
  state.message = "";
  if (getMission()) renderComposer();
}

function updateComposerState(target) {
  if (target.id === "recipient") state.recipient = target.value;
  if (target.id === "subject") state.subject = target.value;
  if (target.id === "message") {
    state.message = target.value;
    const count = document.querySelector("#character-count");
    if (count) count.textContent = `${state.message.length} / 1600`;
  }
  refreshCriteria();
}

function toggleAtHelp() {
  const button = document.querySelector("#at-help-button");
  const panel = document.querySelector("#at-help-panel");
  if (!button || !panel) return;

  const willOpen = panel.hidden;
  panel.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  button.textContent = willOpen ? "Segítség bezárása" : "Hogyan írok @ jelet?";
}

function formatLetterForCopy() {
  return `Címzett: ${state.recipient.trim()}\nTárgy: ${state.subject.trim()}\n\n${state.message.trim()}`;
}

async function copyLetter() {
  const feedback = document.querySelector("#copy-feedback");
  try {
    await navigator.clipboard.writeText(formatLetterForCopy());
    feedback.textContent = "A levél a vágólapra került.";
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = formatLetterForCopy();
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    textarea.remove();
    feedback.textContent = success
      ? "A levél a vágólapra került."
      : "A másolás nem sikerült. Jelöld ki a levelet kézzel!";
  }
}

homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  renderMissionSelection();
});

imageDialogClose.addEventListener("click", closeImageDialog);
imageDialog.addEventListener("click", (event) => {
  if (event.target === imageDialog) closeImageDialog();
});

imageDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeImageDialog();
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const missionCard = target.closest("[data-mission-id]");
  if (missionCard) return selectMission(missionCard.dataset.missionId);

  const missionVisual = target.closest("#mission-visual.has-image");
  if (missionVisual) {
    return openImageDialog(
      missionVisual.dataset.imagePath,
      missionVisual.dataset.imageAlt,
      missionVisual.dataset.imageTitle
    );
  }

  if (target.closest("#back-to-missions")) return renderMissionSelection();
  if (target.closest("#at-help-button")) return toggleAtHelp();
  if (target.closest("#review-letter")) return renderPreview();
  if (target.closest("#edit-letter")) return renderComposer();
  if (target.closest("#copy-letter")) return copyLetter();
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    updateComposerState(target);
  }
});

renderMissionSelection();