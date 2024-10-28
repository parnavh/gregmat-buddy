import { registerUrl } from "@/utils";
import { main as vocabMountain } from "./vocab-mountain";
import { greVocabMountain, toeflVocabMountain } from "@/utils/storage";

export default defineContentScript({
  matches: ["*://*.gregmat.com/*"],
  runAt: "document_idle",
  main() {
    registerUrl("vocab-mountain", vocabMountain);
    storeVocab();
  },
});

async function storeVocab() {
  const greReq = fetch("https://www.gregmat.com/mountains/vocab-mountain");
  const toeflReq = fetch(
    "https://www.gregmat.com/mountains/toefl-vocab-mountain"
  );

  const req = await Promise.all([greReq, toeflReq]);

  const body = await Promise.all([req[0].text(), req[1].text()]);

  const parser = new DOMParser();

  const lookup = [greVocabMountain, toeflVocabMountain] as const;

  body.forEach((b, idx) => {
    const doc = parser.parseFromString(b, "text/html");

    const data = doc.getElementById("__NUXT_DATA__");
    if (!data) return;

    const json = JSON.parse(data.innerHTML);

    const processed = json[7].map((idx: number) =>
      json[json[idx].mountain_contents]
        .map((entry: number) => json[entry])
        .map((word: any) => ({
          title: json[word.title],
          description: json[word.description],
          pronunciation: json[word.pronunciation],
        }))
    );

    lookup[idx].setValue(processed);
  });
}
