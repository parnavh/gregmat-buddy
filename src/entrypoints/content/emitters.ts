import { VIMEO_SELECTOR } from "@/constants";
import { waitForElement, waitForNoElement } from "@/utils";

function sanitizedUrl(url: string) {
  const queryIndex = url.indexOf("?");

  if (queryIndex == -1) return url;

  return url.substring(0, queryIndex);
}

export function registerLocationChange() {
  let currentUrl = sanitizedUrl(location.href);

  setInterval(() => {
    const url = sanitizedUrl(location.href);
    if (url !== currentUrl) {
      currentUrl = url;
      window.dispatchEvent(new Event("locationChange"));
    }
  }, 500);
}

export async function registerVimeoChange() {
  await waitForElement(VIMEO_SELECTOR);
  window.dispatchEvent(new Event("vimeoAdded"));

  await waitForNoElement(VIMEO_SELECTOR);
  window.dispatchEvent(new Event("vimeoRemoved"));

  registerVimeoChange();
}

export function registerEmitters() {
  registerLocationChange();
  registerVimeoChange();
}
