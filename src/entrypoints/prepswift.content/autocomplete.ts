import { VIMEO_SELECTOR } from "@/constants";
import Player from "@vimeo/player";
import { config as config_store } from "@/utils/storage";

export async function main() {
  register();
  window.addEventListener("vimeoAdded", register);
}

async function register() {
  const config = await config_store.getValue();
  if (!config.prepswiftAutoComplete) return;

  const iframe = document.querySelector(VIMEO_SELECTOR);

  if (!iframe) return;

  const player = new Player(iframe as HTMLIFrameElement);

  player.on("ended", () => {
    const tickbox = document.querySelector("svg[data-icon='square']");

    if (!tickbox) return;

    tickbox.parentElement?.click();
  });
}
