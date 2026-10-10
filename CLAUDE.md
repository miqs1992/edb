# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

A classroom quiz tool for EDB lessons: the teacher opens the page and draws a random military rank insignia for a student to name. The UI is in Polish. It is meant to be published on GitHub Pages, so it must stay a static site with no external dependencies.

## Commands

No build, lint, package manager, or test setup exists. The app is static: open `index.html` in a browser to run it. There are no CDN dependencies, so it works offline.

## Architecture

A single-page static site with two tabs (`role="tab"` buttons, `hidden` panels): "Wojska lądowe" (army) and "Marynarka wojenna" (navy). Each panel has a "Losuj" (draw) button that shows one randomly chosen insignia.

- `main.js` holds two arrays of image base names (`armyImages`, `navyImages`). `appendImages` builds `assets/images/<army|navy>/<name>.svg` paths and appends `<img>` elements to the panel's gallery container. `initTabs` switches tabs, and `initArmy`/`initNavy` wire each draw button to show one random image by toggling the `visible` class.
- `styles.css` holds all styling (CSS variables for colours, no framework). It hides every gallery `img` by default; only `img.visible` is shown.
- `index.html` has the markup. The IDs `#pictures-div`, `#pictures-div2`, `#army-pick`, `#navy-pick`, `#home` and `#profile` are used by `main.js`.

`assets/images/army/` and `assets/images/navy/` hold the SVGs downloaded from the pl.wikipedia "Stopnie wojskowe w Polsce" article. The file names in `main.js` must match them exactly. `assets/images/logos/` holds the Land Forces and Navy eagle emblems shown above each panel title (public domain on Commons). Commons licences for these files typically require attribution, so check each file's licence before publishing.
