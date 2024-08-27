export async function main() {
  registerKeybinds();
  addStats();
}

function eventGenerator(key: KeyboardEvent["key"]) {
  return new KeyboardEvent("keydown", {
    key: key,
    bubbles: true,
  });
}

const keys = {
  down: eventGenerator("ArrowDown"),
  up: eventGenerator("ArrowUp"),
  left: eventGenerator("ArrowLeft"),
  right: eventGenerator("ArrowRight"),
} as const;

function isNotesFocused() {
  const note = document.getElementById("note");

  return document.activeElement == note;
}

function registerKeybinds() {
  document.addEventListener("keydown", (ev) => {
    let key = null;

    if (isNotesFocused()) return;

    switch (ev.key) {
      case String(ev.key.match(/^j$/i)):
        key = keys.down;
        break;

      case String(ev.key.match(/^k$/i)):
        key = keys.up;
        break;

      case String(ev.key.match(/^l$/i)):
        key = keys.right;
        break;

      case String(ev.key.match(/^h$/i)):
        key = keys.left;
        break;
    }

    if (!key) return;

    document.body.dispatchEvent(key);
  });

  document.addEventListener("keyup", (ev) => {
    if (!ev.key.match(/^[grf]$/i)) return;

    if (isNotesFocused()) return;

    document.body.dispatchEvent(keys.down);
  });
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
    summary.classList.add("text-lg", "dark:text-gray-50", "text-center");
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

  return `Stats: <div class="flex">Accuracy: ${correct}/${total} | <p class="font-semibold ml-1" style="color: ${color};"> ${percentage.toFixed(
    2
  )}% </p> </div>`;
}
