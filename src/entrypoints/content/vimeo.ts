import { VIMEO_SELECTOR } from "@/constants";
import { vimeoPlaybackRate } from "@/utils/storage";
import Player from "@vimeo/player";

export function vimeoChanges() {
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
