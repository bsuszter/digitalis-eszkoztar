(function () {
  function getToggle(item) {
    if (!item) return null;
    return item.querySelector(':scope > input.md-nav__toggle');
  }

  function closeSiblingBranches(item) {
    if (!item || !item.parentElement) return;

    for (const sibling of item.parentElement.children) {
      if (sibling === item || !sibling.matches('li.md-nav__item--nested')) continue;
      const toggle = getToggle(sibling);
      if (toggle && toggle.checked) toggle.checked = false;
    }
  }

  function normalizeLevel(list) {
    if (!list) return;

    const openItems = Array.from(list.children).filter((item) => {
      if (!item.matches('li.md-nav__item--nested')) return false;
      const toggle = getToggle(item);
      return toggle && toggle.checked;
    });

    if (openItems.length <= 1) return;

    const activeItem = openItems.find((item) =>
      item.querySelector('.md-nav__link--active')
    );
    const keep = activeItem || openItems[0];

    for (const item of openItems) {
      if (item === keep) continue;
      const toggle = getToggle(item);
      if (toggle) toggle.checked = false;
    }
  }

  function markTopicItems() {
    const classByTitle = {
      'Flowgorithm': 'nav-topic--flowgorithm',
      'Tinkercad': 'nav-topic--tinkercad',
      'Digitális kultúra': 'nav-topic--digitalis-kultura',
      'Nyelvtan': 'nav-topic--nyelvtan',
      'Irodalom': 'nav-topic--irodalom',
      'Szakkörök': 'nav-topic--szakkorok'
    };

    document.querySelectorAll('.md-sidebar--primary li.md-nav__item').forEach(function (item) {
      const link = item.querySelector(':scope > .md-nav__link');
      if (!link) return;
      const title = link.textContent.trim();
      const className = classByTitle[title];
      if (className) item.classList.add(className);
    });
  }

  function normalizeSidebar() {
    document.querySelectorAll('.md-sidebar--primary ul.md-nav__list').forEach(normalizeLevel);
  }

  function bindAccordion() {
    markTopicItems();
    normalizeSidebar();

    if (document.documentElement.dataset.navAccordionBound === '1') return;
    document.documentElement.dataset.navAccordionBound = '1';

    document.addEventListener('click', function (event) {
      const label = event.target.closest('.md-sidebar--primary label.md-nav__link[for]');
      if (!label) return;

      const id = label.getAttribute('for');
      if (!id) return;

      const toggle = document.getElementById(id);
      if (!toggle || !toggle.matches('input.md-nav__toggle')) return;

      const item = toggle.closest('li.md-nav__item--nested');
      if (!item) return;

      // A Material témakezelője a kattintás után váltja át a checkboxot,
      // ezért a testvérágakat a következő eseménykörben zárjuk össze.
      window.setTimeout(function () {
        if (toggle.checked) closeSiblingBranches(item);
      }, 0);
    }, true);

    document.addEventListener('change', function (event) {
      const toggle = event.target;
      if (!(toggle instanceof HTMLInputElement)) return;
      if (!toggle.matches('.md-sidebar--primary input.md-nav__toggle')) return;
      if (!toggle.checked) return;

      const item = toggle.closest('li.md-nav__item--nested');
      closeSiblingBranches(item);
    }, true);
  }

  if (typeof document$ !== 'undefined' && document$.subscribe) {
    document$.subscribe(bindAccordion);
  } else {
    document.addEventListener('DOMContentLoaded', bindAccordion);
  }
})();
