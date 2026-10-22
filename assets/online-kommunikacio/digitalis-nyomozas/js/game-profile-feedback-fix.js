// =========================================================
// DIGITÁLIS NYOMOZÓIRODA – 2. ügy visszajelzés-megőrzés
// Observer és automatikus újraellenőrzés nélkül.
// =========================================================

const CLUE_FEEDBACK = {
  username: {
    correct: "strong",
    explanation: "Az azonos, ritkább felhasználónév több felületen erős összekapcsoló nyom."
  },
  avatar: {
    correct: "strong",
    explanation: "Azonos név és azonos profilkép együtt sokkal erősebb, mint bármelyik önmagában."
  },
  basketball: {
    correct: "strong",
    explanation: "A hobbi önmagában nem azonosít, de a névvel és az avatarral együtt erősíti a kapcsolatot."
  },
  "zokni-fan": {
    correct: "weak",
    explanation: "Lehet kapcsolat a kutya nevével, de a klánnév önmagában többféleképpen is létrejöhetett."
  },
  "city-age": {
    correct: "weak",
    explanation: "Segíthet szűkíteni a kört, de nagyon sok emberre igaz lehet."
  },
  "generic-quote": {
    correct: "none",
    explanation: "Ez egy gyakori, általános mondat, ezért nem használható személyazonosításra."
  }
};

const CATEGORY_LABELS = {
  strong: "Erős egyezés",
  weak: "Gyenge egyezés",
  none: "Nem bizonyít semmit"
};

let feedbackActive = false;
let repaintFrame = 0;

function applyPersistentFeedback() {
  if (!feedbackActive) return;

  document.querySelectorAll("select[data-clue-id]").forEach((select) => {
    const clue = CLUE_FEEDBACK[select.dataset.clueId];
    const row = select.closest(".profile-clue-row");
    const content = row?.querySelector(".profile-clue-row__content");
    if (!clue || !row || !content) return;

    const isCorrect = select.value === clue.correct;
    row.classList.toggle("profile-clue-row--correct", isCorrect);
    row.classList.toggle("profile-clue-row--incorrect", !isCorrect);
    row.classList.remove("is-answered");

    let feedback = content.querySelector(".profile-inline-feedback");
    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "profile-inline-feedback";
      content.appendChild(feedback);
    }

    feedback.innerHTML = isCorrect
      ? `<span aria-hidden="true">✓</span>${CATEGORY_LABELS[clue.correct]} – ${clue.explanation}`
      : `<span aria-hidden="true">✕</span>A választott kategória nem megfelelő. Gondold át: ${clue.explanation}`;
  });
}

function updateCheckButton() {
  const selects = [...document.querySelectorAll("select[data-clue-id]")];
  const button = document.querySelector("#game-profile-check-clues");
  if (!(button instanceof HTMLButtonElement) || !selects.length) return;
  button.disabled = !selects.every((select) => Boolean(select.value));
}

function scheduleFeedbackRefresh() {
  window.cancelAnimationFrame(repaintFrame);
  queueMicrotask(() => {
    repaintFrame = window.requestAnimationFrame(() => {
      updateCheckButton();
      applyPersistentFeedback();
    });
  });
}

// A pointerdown még a fő modul kattintáskezelése és újrarenderelése előtt lefut.
document.addEventListener("pointerdown", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest("#game-profile-check-clues")) {
    feedbackActive = true;
  }
}, true);

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest(".game-profile-close, #game-profile-cancel, #game-profile-finish")) {
    feedbackActive = false;
    return;
  }

  if (target.closest("#game-profile-check-clues")) {
    feedbackActive = true;
    scheduleFeedbackRefresh();
  }
}, true);

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement) || !target.matches("select[data-clue-id]")) return;

  scheduleFeedbackRefresh();
}, true);
