export const vimeoPlaybackRate = storage.defineItem<number>(
  "local:vimeoPlaybackRate",
  { fallback: 1 },
);

export const seenBanners = storage.defineItem<string[]>("local:seenBanners", {
  fallback: [],
});
