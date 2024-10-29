export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  browser.runtime.onMessage.addListener((req, sender) => {
    if (sender.id != browser.runtime.id) return;
    if (req.type === "redirect") {
      browser.tabs.create({ url: req.url });
    }
  });
});
