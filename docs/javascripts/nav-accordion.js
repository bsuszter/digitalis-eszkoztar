(function () {
  function directToggle(item) {
    if (!item) return null;
    for (const child of item.children) {
      if (child.matches && child.matches('input.md-nav__toggle')) return child;
    }
    return null;
  }

  function closeSiblingBranches(toggle) {
    if (!toggle || !toggle.checked) return;

    const item = toggle.closest('li.md-nav__item--nested');
    const list = item ? item.parentElement : null;
    if (!item || !list) return;

    for (const sibling of list.children) {
      if (sibling === item || !sibling.matches('li.md-nav__item--nested')) continue;
      const siblingToggle = directToggle(sibling);
      if (siblingToggle) siblingToggle.checked = false;
    }
  }

  function normalizeOpenBranches(sidebar) {
    const lists = sidebar.querySelectorAll('ul.md-nav__list');

    for (const list of lists) {
      const openItems = Array.from(list.children).filter((item) => {
        if (!item.matches('li.md-nav__item--nested')) return false;
        const toggle = directToggle(item);
        return toggle && toggle.checked;
      });

      if (openItems.length <= 1) continue;

      const activeItem = openItems.find((item) =>
        item.querySelector('.md-nav__link--active')
      );
      const keep = activeItem || openItems[0];

      for (const item of openItems) {
        if (item === keep) continue;
        const toggle = directToggle(item);
        if (toggle) toggle.checked = false;
      }
    }
  }

  function initAccordionNavigation() {
    const sidebar = document.querySelector('.md-sidebar--primary');
    if (!sidebar) return;

    normalizeOpenBranches(sidebar);

    if (sidebar.dataset.accordionBound === '1') return;
    sidebar.dataset.accordionBound = '1';

    sidebar.addEventListener('change', function (event) {
      const toggle = event.target;
      if (!(toggle instanceof HTMLInputElement)) return;
      if (!toggle.matches('input.md-nav__toggle')) return;
      closeSiblingBranches(toggle);
    });
  }

  if (typeof document$ !== 'undefined' && document$.subscribe) {
    document$.subscribe(initAccordionNavigation);
  } else {
    document.addEventListener('DOMContentLoaded', initAccordionNavigation);
  }
})();
