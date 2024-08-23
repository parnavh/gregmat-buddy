import { registerUrl } from "@/utils";
import { main as vocabMountain } from "./vocab-mountain";

export default defineContentScript({
  matches: ["*://*.gregmat.com/*"],
  runAt: "document_idle",
  main() {
    registerUrl("vocab-mountain", vocabMountain);
  },
});
