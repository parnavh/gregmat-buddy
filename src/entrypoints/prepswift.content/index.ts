import { waitForElement } from "@/utils";

export default defineContentScript({
  matches: ["*://*.prepswift.com/*"],
  runAt: "document_idle",
  main() {
    if (window.location.toString().search("gre-quant")) main();
    window.addEventListener("locationChange", () => {
      if (window.location.toString().search("gre-quant")) main();
    });
  },
});

async function main() {
  await waitForElement(".htmlContent");
  const container = document.querySelector("div[class='space-y-6 my-10']");
  const header = document.querySelector(".htmlContent");

  if (!container || !header) {
    return;
  }

  let summary = document.getElementById("buddy-stats") as HTMLParagraphElement;

  if (!summary) {
    summary = header
      .querySelector("p:nth-child(2)")!
      .cloneNode() as HTMLParagraphElement;
    summary.textContent = "loading...";
    summary.setAttribute("id", "buddy-stats");
    header.appendChild(summary);
  }

  calculate_time(container, summary);

  document
    .querySelectorAll(".inline.transition-all.duration-300")
    .forEach((but) => {
      (but as HTMLButtonElement).onclick = () => {
        setTimeout(() => {
          calculate_time(container, summary);
        }, 2000);
      };
    });
}

function calculate_time(container: Element, summary: HTMLParagraphElement) {
  let rootTotalCount = 0,
    rootDoneCount = 0,
    rootTotalSecs = 0,
    rootDoneSecs = 0;

  Array.from(container.children).forEach((div) => {
    let title = div.querySelector("h2");

    if (!title) return;

    let all = div.querySelectorAll(".video-duration-badge");
    let done = div.querySelectorAll(".video-duration-badge.text-purple-400");
    let allTimestamps = div.querySelectorAll(".video-duration-badge");
    let doneTimestamps = div.querySelectorAll(
      ".video-duration-badge.text-purple-400",
    );

    let totalSecs = 0,
      doneSecs = 0;

    allTimestamps.forEach((a) => {
      let s = (a.textContent ?? ":").split(":");
      totalSecs += parseInt(s[0]) * 60 + parseInt(s[1]);
    });

    doneTimestamps.forEach((a) => {
      let s = (a.textContent ?? ":").split(":");
      doneSecs += parseInt(s[0]) * 60 + parseInt(s[1]);
    });

    rootTotalSecs += totalSecs;
    rootDoneSecs += doneSecs;
    rootTotalCount += all.length;
    rootDoneCount += done.length;

    let text = title.textContent;

    if (!text) return;

    if (text.search(" - ") != -1) {
      text = text.substring(0, text.search(" - "));
    }

    title.textContent =
      text +
      ` - Lectures: ${done.length}/${all.length} | Mins: ${(doneSecs / 60).toFixed(2)}/${(totalSecs / 60).toFixed(2)}`;
  });

  summary.textContent = `Lectures: ${rootDoneCount}/${rootTotalCount} | Mins: ${(rootDoneSecs / 60).toFixed(2)}/${(rootTotalSecs / 60).toFixed(2)} | Hours: ${(rootDoneSecs / 3600).toFixed(2)}/${(rootTotalSecs / 3600).toFixed(2)}`;
}
