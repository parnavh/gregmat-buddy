import { VIMEO_SELECTOR } from "@/constants";
import { sanitizedUrl, waitForElement, waitForNoElement } from "@/utils";

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
