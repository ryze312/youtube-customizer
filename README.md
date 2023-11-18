<div align="center">

<img width="128" height="128" src="extension/icon.svg">

# YouTube Customizer

Web browser extension for customizing YouTube

</div>

<div align="center">
    <a href="https://addons.mozilla.org/addon/youtubecustomizer"><img src="https://img.shields.io/amo/users/youtubecustomizer?label=Firefox users&color=FF7139&style=for-the-badge&logo=firefoxbrowser"></a>
    <a href="https://addons.mozilla.org/addon/youtubecustomizer"><img src="https://img.shields.io/amo/v/youtubecustomizer?&label=Version&color=723F8C&style=for-the-badge"></a>
    <a href="https://img.shields.io/github/issues/ryze312/youtube-customizer/issues"><img src="https://img.shields.io/github/issues/ryze312/youtube-customizer?&color=crimson&style=for-the-badge"></a>
    <a href="https://opensource.org/license/gpl-3-0"><img src="https://img.shields.io/github/license/ryze312/youtube-customizer?color=blue&style=for-the-badge"></a>
</div>


![Demo screenshot](img/demo.png)

## Features
- Toggling various elements of layout (e.g sidebar buttons)
- Redirecting home page to subscriptions
- [ff2mpv](https://github.com/woodruffw/ff2mpv) integration

## Usage
<a href="https://addons.mozilla.org/addon/youtubecustomizer"><img src="img/amo_button.png" alt="Get the addon"></a>

*Chromium-based browsers are not supported*

## Configuration
The extension provides configuration using settings page that can be accessed through web browser extension page.

![Settings Page](img/settings_page.png)

## Supported languages
The extension has localization for the following languages:
- English
- Spanish
- French
- Hungarian
- Russian

## Building
YouTube Customizer uses [pnpm](https://github.com/pnpm/pnpm) and [web-ext](https://github.com/mozilla/web-ext) for building and bundling final package, as well as [TypeScript transpiler](https://github.com/microsoft/TypeScript) for building JavaScript sources.

1. Install TypeScript, pnpm and web-ext using system package manager or npm
```
npm install -g typescript web-ext pnpm 
```

2. Install dependencies and run build
```
pnpm install
pnpm build
```

# Contributing
All issues and pull requests are welcome! Feel free to open an issue if you've got an idea or a problem. You can open a pull request if you are able to implement it yourself.

---
<p align="center">
<sub><strong>
    Made with ponies and love!
    <br/>
    GNU GPL © Ryze 2023 💜
</strong></sub>
</p>
