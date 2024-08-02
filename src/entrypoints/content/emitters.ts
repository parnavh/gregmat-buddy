export function registerLocationChange() {
  let currentUrl = location.href;

  setInterval(() => {
    if (location.href !== currentUrl) {
      currentUrl = location.href;
      window.dispatchEvent(new Event("locationChange"));
    }
  }, 500);
}
