(() => {
  function findAPI(win) {
    let tries = 0;
    while (win && tries < 20) {
      try { if (win.API) return win.API; } catch {}
      if (win.parent === win) break;
      win = win.parent;
      tries += 1;
    }
    try {
      if (window.opener) return findAPI(window.opener);
    } catch {}
    return null;
  }

  const api = findAPI(window);
  let initialized = false;
  let terminated = false;

  function ok(value) { return value === true || value === 'true' || value === '1'; }

  window.SCORM12 = {
    available: Boolean(api),
    initialize() {
      if (!api || initialized) return initialized;
      try { initialized = ok(api.LMSInitialize('')); } catch { initialized = false; }
      return initialized;
    },
    get(name) {
      if (!api || !initialized) return '';
      try { return api.LMSGetValue(name) || ''; } catch { return ''; }
    },
    set(name, value) {
      if (!api || !initialized) return false;
      try { return ok(api.LMSSetValue(name, String(value))); } catch { return false; }
    },
    commit() {
      if (!api || !initialized) return false;
      try { return ok(api.LMSCommit('')); } catch { return false; }
    },
    finish() {
      if (!api || !initialized || terminated) return false;
      terminated = true;
      try { return ok(api.LMSFinish('')); } catch { return false; }
    }
  };
})();
