import { registerEmitters, registerLocationChange } from "./emitters";
import { vimeoChanges } from "./vimeo";

export default defineContentScript({
  matches: ["*://*.prepswift.com/*", "*://*.gregmat.com/*"],
  main() {
    registerEmitters();

    vimeoChanges();
  },
});
