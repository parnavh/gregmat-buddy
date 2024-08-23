# GregMat Buddy

🏗️ IN ACTIVE DEVELOPMENT

Adds useful quality of life features to the GregMat and PrepSwift website.

## Features

- Adds progress stats for PrepSwift
- Remembers your playback speed on GregMat and PrepSwift
- Remembers if you dismissed a banner at the top of the website.
- Adds custom keybinds for vocab mountain
  - Moves to next word automatically after you mark it
  - Adds vim keybinds for cursor movement

## Install

[link-chrome]: https://chromewebstore.google.com/detail/gregmat-buddy/oldbbeonbpmmjfhddalkjfmfmindmjnd "Version published on Chrome Web Store"
[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/gregmat-buddy/ "Version published on Mozilla Add-ons"

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome] [<img src="https://img.shields.io/chrome-web-store/v/oldbbeonbpmmjfhddalkjfmfmindmjnd.svg?label=%20" valign="middle">][link-chrome] for Chrome and other Chromium browsers

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="48" alt="Firefox" valign="middle">][link-firefox] [<img src="https://img.shields.io/amo/v/gregmat-buddy.svg?label=%20" valign="middle">][link-firefox] for Firefox (excluding Firefox for Android)

## Development

### Install Dependencies

```bash
pnpm install
```

### Start development server

```bash
# chrome
pnpm dev

# firefox
pnpm dev:firefox
```

### Build

```bash
# chrome
pnpm build

# firefox
pnpm build:firefox
```
