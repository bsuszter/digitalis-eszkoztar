(function () {
  "use strict";

  let api = null;
  let initialized = false;
  let finished = false;

  function findApi(startWindow) {
    let current = startWindow;
    let attempts = 0;

    while (current && attempts < 20) {
      try {
        if (current.API) return current.API;
        if (current.parent && current.parent !== current) {
          current = current.parent;
        } else {
          break;
        }
      } catch {
        break;
      }
      attempts += 1;
    }

    try {
      if (window.opener?.API) return window.opener.API;
    } catch {
      // Más eredetű ablak esetén nincs hozzáférés.
    }

    return null;
  }

  function call(method, ...args) {
    if (!api || typeof api[method] !== "function") return null;

    try {
      return api[method](...args);
    } catch (error) {
      console.warn(`SCORM-hívási hiba: ${method}`, error);
      return null;
    }
  }

  function initialize() {
    if (initialized) return true;

    api = findApi(window);
    if (!api) {
      console.info("E-mail-küldetés: normál webes mód, SCORM API nem található.");
      return false;
    }

    const result = call("LMSInitialize", "");
    initialized = result === "true" || result === true;

    if (!initialized) {
      console.warn("E-mail-küldetés: a SCORM-kapcsolat nem inicializálható.");
      return false;
    }

    const status = call("LMSGetValue", "cmi.core.lesson_status");
    if (!status || status === "not attempted") {
      call("LMSSetValue", "cmi.core.lesson_status", "incomplete");
      call("LMSCommit", "");
    }

    console.info("E-mail-küldetés: SCORM 1.2 mód, pontozás nélkül.");
    return true;
  }

  function markCompleted() {
    if (!initialize() || finished) return;

    call("LMSSetValue", "cmi.core.lesson_status", "completed");
    call("LMSSetValue", "cmi.core.exit", "");
    call("LMSCommit", "");
    finished = true;
    console.info("E-mail-küldetés: teljesítés mentve a Moodle-ba.");
  }

  function finish() {
    if (!initialized) return;

    if (!finished) {
      call("LMSSetValue", "cmi.core.exit", "suspend");
      call("LMSCommit", "");
    }

    call("LMSFinish", "");
    initialized = false;
  }

  document.addEventListener("click", function (event) {
    const target = event.target;
    if (target instanceof Element && target.closest("#review-letter")) {
      markCompleted();
    }
  });

  window.addEventListener("pagehide", finish);
  window.addEventListener("beforeunload", finish);

  window.EmailMissionSCORM = {
    initialize,
    markCompleted,
    finish
  };

  initialize();
})();