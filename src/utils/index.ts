export function waitForElement(selector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export function waitForNoElement(selector: string) {
  return new Promise<void>((resolve) => {
    if (!document.querySelector(selector)) {
      return resolve();
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        return;
      }
      observer.disconnect();
      resolve();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export function registerUrl(url: string, callback: Function) {
  if (window.location.toString().search(url) != -1) callback();

  window.addEventListener("locationChange", () => {
    if (window.location.toString().search(url) != -1) callback();
  });
}
