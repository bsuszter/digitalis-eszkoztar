// =========================================================
// DIGITÁLIS NYOMOZÓIRODA
// Fájl: js/mutation-observer-hotfix.js
//
// Megakadályozza, hogy az #app teljes al-fáját figyelő modulok
// saját DOM-módosításaikkal végtelen megfigyelési ciklust hozzanak létre.
// Az alkalmazás képernyőváltásai az #app közvetlen gyermekeit cserélik,
// ezért a subtree figyelésre nincs szükség.
// =========================================================

const NativeMutationObserver = window.MutationObserver;

window.MutationObserver = class SafeMutationObserver extends NativeMutationObserver {
  observe(target, options = {}) {
    if (target instanceof Element && target.id === "app") {
      super.observe(target, {
        ...options,
        subtree: false
      });
      return;
    }

    super.observe(target, options);
  }
};
