(() => {
  const STORAGE = {
    left: "digitalis-eszkoztar.sidebar.left.hidden",
    right: "digitalis-eszkoztar.sidebar.right.hidden"
  };
  const SIDES = {
    left: { className: "eszkoz-hide-left", name: "Navigáció", icon: "◧" },
    right: { className: "eszkoz-hide-right", name: "Tartalomjegyzék", icon: "◨" }
  };
  const read = side => {
    try { return localStorage.getItem(STORAGE[side]) === "true"; }
    catch (_) { return false; }
  };
  const write = (side, hidden) => {
    try { localStorage.setItem(STORAGE[side], String(hidden)); }
    catch (_) { /* Browsers may disable storage. */ }
  };
  const state = { left: read("left"), right: read("right") };
  const apply = () => {
    for (const side of ["left", "right"]) {
      document.body.classList.toggle(SIDES[side].className, state[side]);
      const button = document.querySelector('[data-eszkoz-sidebar="' + side + '"]');
      if (!button) continue;
      button.setAttribute("aria-pressed", String(!state[side]));
      button.setAttribute("aria-label", SIDES[side].name + (state[side] ? " megjelenítése" : " elrejtése"));
      button.title = SIDES[side].name + (state[side] ? " megjelenítése" : " elrejtése");
      const label = button.querySelector(".eszkoz-layout-toggle__label");
      if (label) label.textContent = state[side] ? SIDES[side].name + " mutatása" : SIDES[side].name + " elrejtése";
    }
  };
  const init = () => {
    const host = document.querySelector(".md-content__inner");
    if (!host) return;
    if (!host.querySelector(".eszkoz-layout-toolbar")) {
      const bar = document.createElement("div");
      bar.className = "eszkoz-layout-toolbar";
      bar.setAttribute("role", "group");
      bar.setAttribute("aria-label", "Oldalsávok kapcsolói");
      for (const side of ["left", "right"]) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "eszkoz-layout-toggle";
        button.dataset.eszkozSidebar = side;
        const icon = document.createElement("span");
        icon.className = "eszkoz-layout-toggle__icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = SIDES[side].icon;
        const label = document.createElement("span");
        label.className = "eszkoz-layout-toggle__label";
        button.append(icon, label);
        button.addEventListener("click", () => {
          state[side] = !state[side];
          write(side, state[side]);
          apply();
        });
        bar.appendChild(button);
      }
      host.prepend(bar);
    }
    apply();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  // Material for MkDocs instant navigation reuses the document.
  if (typeof document$ !== "undefined" && document$?.subscribe) document$.subscribe(init);
})();
