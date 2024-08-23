export async function main() {
  registerKeybinds();
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

function registerKeybinds() {
  document.addEventListener("keydown", (ev) => {
    let key = null;

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

    document.body.dispatchEvent(keys.down);
  });
}
