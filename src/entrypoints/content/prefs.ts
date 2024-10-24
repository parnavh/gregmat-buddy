import { VIMEO_SELECTOR } from "@/constants";
import {
  config as config_store,
  seenBanners,
  vimeoPlaybackRate,
} from "@/utils/storage";
import Player from "@vimeo/player";

export async function vimeoChanges() {
  const config = await config_store.getValue();
  if (!config.playbackRate) return;

  window.addEventListener("vimeoAdded", async () => {
    const iframe = document.querySelector(VIMEO_SELECTOR);

    if (!iframe) return;

    const player = new Player(iframe as HTMLIFrameElement);

    player.setPlaybackRate(await vimeoPlaybackRate.getValue());

    player.on("playbackratechange", (event) => {
      vimeoPlaybackRate.setValue(event.playbackRate);
    });
  });
}

export async function removeBanner() {
  const config = await config_store.getValue();
  if (!config.banner) return;

  const banner = document.querySelector(".px-3.py-3.mx-auto.max-w-7xl");
  if (!banner) return;

  const text = banner.querySelector(".hidden")?.textContent;
  if (!text) return;

  const banners = await seenBanners.getValue();

  const button = banner.querySelector("button");
  if (!button) return;

  if (!banners.includes(text)) {
    button.addEventListener("click", () => {
      seenBanners.setValue([...banners, text]);
    });
    return;
  }

  setTimeout(() => {
    button.click();
  }, 150);
}
