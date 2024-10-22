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

export function sanitizedUrl(url: string) {
  const queryIndex = url.indexOf("?");

  if (queryIndex == -1) return url;

  return url.substring(0, queryIndex);
}

export function registerUrl(url: string, callback: Function) {
  if (sanitizedUrl(window.location.toString()).search(url) != -1) callback();

  window.addEventListener("locationChange", () => {
    if (sanitizedUrl(window.location.toString()).search(url) != -1) callback();
  });
}
