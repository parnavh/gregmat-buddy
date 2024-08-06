import { VIMEO_SELECTOR } from "@/constants";
import { waitForElement, waitForNoElement } from "@/utils";

export function registerLocationChange() {
  let currentUrl = location.href;

  setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
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
