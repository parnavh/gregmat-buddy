import { registerEmitters } from "./emitters";
import { removeBanner, vimeoChanges } from "./prefs";

export default defineContentScript({
  matches: ["*://*.prepswift.com/*", "*://*.gregmat.com/*"],
  main() {
    registerEmitters();

    vimeoChanges();
    removeBanner();
  },
});
