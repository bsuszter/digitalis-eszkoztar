(() => {
  let api = null;
  let initialized = false;
  let finished = false;

  function findApi(startWindow) {
    let current = startWindow;
    let attempts = 0;
    while (current && attempts < 20) {
      try {
        if (current.API) return current.API;
        if (current.parent && current.parent !== current) current = current.parent;
        else break;
      } catch (error) {
        break;
      }
      attempts += 1;
    }
    try {
      if (window.opener) return findApi(window.opener);
    } catch (error) {
      return null;
    }
    return null;
  }

  function call(method, ...args) {
    if (!api || typeof api[method] !== 'function') return null;
    try {
      return api[method](...args);
    } catch (error) {
      console.warn(`SCORM ${method} hiba:`, error);
      return null;
    }
  }

  function ok(result) {
    return result === true || result === 'true';
  }

  window.SCORM12 = {
    init() {
      if (initialized) return true;
      api = findApi(window);
      if (!api) {
        console.info('SCORM API nem található; az alkalmazás webes módban fut.');
        return false;
      }
      initialized = ok(call('LMSInitialize', ''));
      return initialized;
    },

    isAvailable() {
      return initialized;
    },

    get(name) {
      if (!initialized) return '';
      const value = call('LMSGetValue', name);
      return value == null ? '' : String(value);
    },

    set(name, value) {
      if (!initialized) return false;
      return ok(call('LMSSetValue', name, String(value)));
    },

    commit() {
      if (!initialized || finished) return false;
      return ok(call('LMSCommit', ''));
    },

    finish() {
      if (!initialized || finished) return false;
      this.commit();
      finished = ok(call('LMSFinish', ''));
      return finished;
    }
  };
})();
