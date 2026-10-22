import { isCaseCompleted } from "./state.js";

const CASE_ID = "public-comment";
const PREVIOUS_CASE_ID = "game-profile";

function updatePublicCommentCard() {
  const button = document.querySelector('[data-case-id="public-comment"]');

  if (!button) {
    return;
  }

  const completed = isCaseCompleted(CASE_ID);
  const available = isCaseCompleted(PREVIOUS_CASE_ID) || completed;

  if (!available) {
    return;
  }

  const card = button.closest(".case-card");
  const status = card?.querySelector(".case-card__status");

  button.disabled = false;
  button.classList.remove("button--secondary");
  button.classList.add("button--primary");
  button.textContent = completed ? "Ügy megtekintése" : "Ügy megnyitása";

  card?.classList.remove("case-card--locked");
  card?.classList.toggle("case-card--completed", completed);
  card?.classList.toggle("case-card--unlocked", !completed);

  if (status) {
    status.textContent = completed ? "Lezárva" : "Elérhető";
  }
}

window.addEventListener("digital-investigation:state-change", (event) => {
  if (
    event.detail?.changeType === "case-completed" ||
    event.detail?.changeType === "state-reset"
  ) {
    window.requestAnimationFrame(updatePublicCommentCard);
  }
});

const app = document.querySelector("#app");

if (app) {
  const observer = new MutationObserver(() => {
    window.requestAnimationFrame(updatePublicCommentCard);
  });

  observer.observe(app, {
    childList: true,
    subtree: false
  });
}

updatePublicCommentCard();
