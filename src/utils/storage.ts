export const vimeoPlaybackRate = storage.defineItem<number>(
  "local:vimeoPlaybackRate",
  { fallback: 1 }
);

export const seenBanners = storage.defineItem<string[]>("local:seenBanners", {
  fallback: [],
});

type ConfigType = {
  banner: boolean;
  playbackRate: boolean;
  vocabMountain: boolean;
  prepswiftStats: boolean;
  prepswiftAutoComplete: boolean;
};

export const config = storage.defineItem<ConfigType>("local:config", {
  fallback: {
    banner: true,
    playbackRate: true,
    vocabMountain: true,
    prepswiftStats: true,
    prepswiftAutoComplete: true,
  },
  version: 1,
});
