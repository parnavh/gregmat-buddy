import { waitForElement, registerUrl } from "@/utils";

export default defineContentScript({
  matches: ["*://*.prepswift.com/*"],
  runAt: "document_idle",
  main() {
    registerUrl("gre-quant", main);
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

  const observer = new MutationObserver(() =>
    calculate_time(container, summary),
  );

  document
    .querySelectorAll(".cursor-pointer.linkHolder.font-semibold")
    .forEach((tag) => {
      observer.observe(tag, { attributes: true });
    });
}

async function calculate_time(
  container: Element,
  summary: HTMLParagraphElement,
) {
  let rootTotalCount = 0,
    rootDoneCount = 0,
    rootTotalSecs = 0,
    rootDoneSecs = 0;

  await waitForElement(".video-duration-badge");

  Array.from(container.children).forEach((div) => {
    const title = div.querySelector("h2");

    if (!title) return;

    const all = div.querySelectorAll(".video-duration-badge");
    const done = div.querySelectorAll(".video-duration-badge.text-purple-400");
    const allTimestamps = div.querySelectorAll(".video-duration-badge");
    const doneTimestamps = div.querySelectorAll(
      ".video-duration-badge.text-purple-400",
    );

    let totalSecs = 0,
      doneSecs = 0;

    allTimestamps.forEach((a) => {
      const s = (a.textContent ?? ":").split(":");
      totalSecs += Number.parseInt(s[0]) * 60 + Number.parseInt(s[1]);
    });

    doneTimestamps.forEach((a) => {
      const s = (a.textContent ?? ":").split(":");
      doneSecs += Number.parseInt(s[0]) * 60 + Number.parseInt(s[1]);
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
      text + " - " + getText(done.length, all.length, doneSecs, totalSecs);
  });

  summary.textContent =
    "Total - " +
    getText(rootDoneCount, rootTotalCount, rootDoneSecs, rootTotalSecs);
}

function getText(
  doneCount: number,
  totalCount: number,
  doneSecs: number,
  totalSecs: number,
): string {
  if (doneCount === totalCount) {
    return "Done!";
  }

  if (doneCount === 0) {
    return `Lectures: ${totalCount} | Mins: ${(totalSecs / 60).toFixed(2)} | Hours: ${(totalSecs / 3600).toFixed(2)}`;
  }

  return `Lectures: ${doneCount}/${totalCount} | Mins: ${(doneSecs / 60).toFixed(2)}/${(totalSecs / 60).toFixed(2)}| Hours: ${(doneSecs / 3600).toFixed(2)}/${(totalSecs / 3600).toFixed(2)}`;
}
