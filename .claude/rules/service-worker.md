---
paths:
  - "index.html"
  - "styles.css"
  - "main.js"
  - "ranks.js"
  - "manifest.webmanifest"
  - "sw.js"
  - "assets/**"
---

# Keep the service worker in sync

`sw.js` precaches every app file so the installed PWA works offline. Whenever you change, add, rename or remove any of the files above, update `sw.js` in the same change:

- **Changed a cached file** → bump `CACHE_NAME` (`edb-stopnie-v1` → `edb-stopnie-v2`). Otherwise installed copies keep serving the old version forever.
- **Added a file** the page loads → add its path to `FILES` and bump `CACHE_NAME`.
- **Renamed or removed a file** → fix or drop its `FILES` entry and bump `CACHE_NAME`. A path in `FILES` that no longer exists makes `cache.addAll` reject, so the service worker never installs and offline mode breaks.

Bump at most once per change set (one commit), not once per edited file. Never list `.DS_Store` or other untracked files in `FILES`.

Before finishing, check that every path in `FILES` exists:

```sh
grep -oE "^    '[^']+'" sw.js | tr -d " '" | grep -v '^\./$' | while read f; do [ -f "$f" ] || echo "MISSING $f"; done
```
