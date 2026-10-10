# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

A classroom quiz tool for EDB lessons: the teacher opens the page and draws a random military rank insignia for a student to name. The UI is in Polish. It is meant to be published on GitHub Pages, so it must stay a static site with no external dependencies.

## Commands

No build, lint, package manager, or test setup exists. The app is static: open `index.html` in a browser to run it. There are no CDN dependencies, so it works offline.

## Architecture

A single-page static site with two tabs (`role="tab"` buttons, `hidden` panels): "Wojska lądowe" (army) and "Marynarka wojenna" (navy). Each panel has a "Losuj" (draw) button that shows one randomly chosen insignia, and a "Pokaż nazwę stopnia" switch (off by default) that shows the drawn rank's name under the picture.

- `ranks.js` holds two lists of `{ file, name }` ranks ordered by seniority (`armyRanks`, `navyRanks`) as plain globals; it is a classic script (not an ES module) so the page still works when opened from disk, and it must load before `main.js`.
- `main.js`: `initPanel(panel, folder, ranks)` appends one `<img>` per rank (alt = rank name) to the panel's `.gallery__images`, and wires `.draw-button` and `.name-toggle` inside that panel; `initTabs` switches tabs. The only IDs `main.js` uses are the panel IDs `#home` and `#profile`.
- `styles.css` holds all styling (CSS variables for colours, no framework). Gallery images are hidden unless they have the `visible` class. `.rank-name` uses `visibility` rather than `display`, so its line stays reserved and toggling it never shifts the picture.

`assets/images/army/` and `assets/images/navy/` hold the SVGs downloaded from the pl.wikipedia "Stopnie wojskowe w Polsce" article. Army file names are Wikimedia's own (`Army-POL-OR-04a` etc.); they are positions in that article's table, not exact NATO codes, and the a/b suffixes are not in seniority order (`OR-04b` is starszy kapral, `OR-04a` plutonowy). Navy files were renamed from `POL_PMW_pagon1_<rank>.svg` so each one uses the same code as the army file of the equivalent rank (e.g. kapitan marynarki is `Navy-POL-OF-02`, like kapitan). The file names in `main.js` must match them exactly. `assets/images/logos/` holds the Land Forces and Navy eagle emblems shown above each panel title (public domain on Commons). Commons licences for these files typically require attribution, so check each file's licence before publishing.
