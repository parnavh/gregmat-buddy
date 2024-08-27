export async function main() {
  registerKeybinds();
  showKeybinds();
  addStats();
}

function eventGenerator(key: KeyboardEvent["key"]) {
  return new KeyboardEvent("keydown", {
    key: key,
    bubbles: true,
  });
}

const keys = {
  j: eventGenerator("ArrowDown"),
  k: eventGenerator("ArrowUp"),
  h: eventGenerator("ArrowLeft"),
  l: eventGenerator("ArrowRight"),
  m: eventGenerator("d"),
  ",": eventGenerator("s"),
  correct: eventGenerator("g"),
  incorrect: eventGenerator("r"),
} as const;

function isNotesFocused() {
  const note = document.getElementById("note");

  return document.activeElement == note;
}

function registerKeybinds() {
  document.addEventListener("keydown", (ev) => {
    if (!ev.key.match(/^[hjkluim,]$/i) || isNotesFocused()) return;

    const eventKey = ev.key.toLowerCase();

    let key = null;

    switch (eventKey) {
      case "h":
      case "j":
      case "k":
      case "l":
      case "m":
      case ",":
        key = keys[eventKey];
        break;

      case "u":
        document.body.dispatchEvent(keys.correct);
        key = keys.j;
        break;

      case "i":
        document.body.dispatchEvent(keys.incorrect);
        key = keys.j;
        break;
    }

    if (!key) return;

    document.body.dispatchEvent(key);
  });
}

async function showKeybinds() {
  await waitForElement("button[tabindex='-1']");

  const shown = !!document.getElementById("buddy-nav");

  if (shown) return;

  const container = document.querySelector(
    ".flex.w-full.flex-row.flex-wrap.justify-center.space-x-6.mt-6.gap-y-2.gap-x-2"
  );

  if (!container || container.childNodes.length < 6) return;
  const nodes = container.childNodes;

  const vimNav = nodes[0].cloneNode(true) as HTMLDivElement;
  vimNav.setAttribute("id", "buddy-nav");
  vimNav.classList.add("font-semibold");

  let idx = 0;

  vimNav.querySelectorAll("button").forEach((button) => {
    button.innerHTML = ["k", "h", "j", "l"][idx++];
  });

  idx = 0;

  for (let i = 1; i < 6; i++) {
    if (i == 4) continue;
    const copy = (nodes[i] as HTMLDivElement)
      .querySelector(".flex.flex-row.justify-center.w-full")
      ?.cloneNode(true);

    if (!copy) return;

    copy.childNodes[0].childNodes[0].textContent = ["m", "u", "i", ","][idx++];

    nodes[i].childNodes[0].appendChild(copy);
  }

  container.insertBefore(vimNav, nodes[1]);
}

async function addStats() {
  await waitForElement("button[tabindex='-1']");

  const parent = document.querySelector(
    ".w-full.flex.flex-col.justify-start.items-center.space-y-2"
  );

  if (!parent) return;

  let summary = document.getElementById("buddy-stats") as HTMLDivElement;

  if (!summary) {
    summary = document.createElement("div");
    summary.textContent = "loading...";
    summary.classList.add("text-lg", "dark:text-gray-50", "text-center", "mb-6");
    summary.setAttribute("id", "buddy-stats");
    parent.prepend(summary);
  }

  const day = document.querySelector(
    "h3[class='font-semibold text-lg dark:text-gray-50']"
  );

  if (!day) return;

  const buttonObserver = new MutationObserver((mutations) => {
    if (mutations.length > 1) return;

    calculate_stats(summary);
  });

  const dayObserver = new MutationObserver(() => {
    calculate_stats(summary);
    buttonObserver.disconnect();
    registerChanges();
  });

  dayObserver.observe(day, {
    childList: true,
  });

  function registerChanges() {
    document.querySelectorAll("button[tabindex='-1']").forEach((button) => {
      buttonObserver.observe(button, {
        attributes: true,
        attributeOldValue: true,
      });
    });
  }

  calculate_stats(summary);
  registerChanges();
}

function calculate_stats(summary: HTMLDivElement) {
  const buttons = document.querySelectorAll("button[tabindex='-1']");

  if (buttons.length === 0) return;

  let total = 0,
    correct = 0;

  buttons.forEach((button) => {
    if (button.classList.contains("bg-green-200")) {
      correct++;
      total++;
    } else if (button.classList.contains("bg-red-200")) {
      total++;
    }
  });

  if (total != buttons.length) total = -1;

  summary.innerHTML = getVocabStatsText(correct, total);
}

function getVocabStatsText(correct: number, total: number) {
  if (total == -1) {
    return `Stats: DNF`;
  }

  const percentage = (correct / total) * 100;

  let color = "#f57c00"; // text-orange-500

  if (percentage >= 90) {
    color = "#4caf50"; // text-green-500
  }

  return `<h3 class="font-semibold underline mb-2">Stats</h3>
    <ul>
      <li>Accuracy: ${correct}/${total} | <span class="font-semibold ml-1" style="color: ${color};">${percentage.toFixed(2)}%</span></li>
    </ul>
  `;
}
