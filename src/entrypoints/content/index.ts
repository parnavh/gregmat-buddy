import { registerLocationChange } from "./emitters";

export default defineContentScript({
  matches: ["*://*.prepswift.com/*", "*://*.gregmat.com/*"],
  main() {
    registerLocationChange();
  },
});
