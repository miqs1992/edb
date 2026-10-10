// Caches every file of the app on install so it works offline once added to the home screen.
// Bump CACHE_NAME whenever any file changes, otherwise installed copies keep serving the old version.
const CACHE_NAME = 'edb-stopnie-v1';

const FILES = [
    './',
    'index.html',
    'styles.css',
    'ranks.js',
    'main.js',
    'manifest.webmanifest',
    'assets/favicon.svg',
    'assets/apple-touch-icon.png',
    'assets/icon-192.png',
    'assets/icon-512.png',
    'assets/images/army/Army-POL-OF-01a.svg',
    'assets/images/army/Army-POL-OF-01b.svg',
    'assets/images/army/Army-POL-OF-02.svg',
    'assets/images/army/Army-POL-OF-03.svg',
    'assets/images/army/Army-POL-OF-04.svg',
    'assets/images/army/Army-POL-OF-05.svg',
    'assets/images/army/Army-POL-OF-06.svg',
    'assets/images/army/Army-POL-OF-07.svg',
    'assets/images/army/Army-POL-OF-08.svg',
    'assets/images/army/Army-POL-OF-09.svg',
    'assets/images/army/Army-POL-OF-10.svg',
    'assets/images/army/Army-POL-OR-01.svg',
    'assets/images/army/Army-POL-OR-02.svg',
    'assets/images/army/Army-POL-OR-03.svg',
    'assets/images/army/Army-POL-OR-04a.svg',
    'assets/images/army/Army-POL-OR-04b.svg',
    'assets/images/army/Army-POL-OR-05.svg',
    'assets/images/army/Army-POL-OR-06.svg',
    'assets/images/army/Army-POL-OR-07.svg',
    'assets/images/army/Army-POL-OR-08.svg',
    'assets/images/army/Army-POL-OR-09a.svg',
    'assets/images/army/Army-POL-OR-09b.svg',
    'assets/images/logos/marynarka-wojenna.webp',
    'assets/images/logos/wojska-ladowe.svg',
    'assets/images/navy/Navy-POL-OF-01a.svg',
    'assets/images/navy/Navy-POL-OF-01b.svg',
    'assets/images/navy/Navy-POL-OF-02.svg',
    'assets/images/navy/Navy-POL-OF-03.svg',
    'assets/images/navy/Navy-POL-OF-04.svg',
    'assets/images/navy/Navy-POL-OF-05.svg',
    'assets/images/navy/Navy-POL-OF-06.svg',
    'assets/images/navy/Navy-POL-OF-07.svg',
    'assets/images/navy/Navy-POL-OF-08.svg',
    'assets/images/navy/Navy-POL-OF-09.svg',
    'assets/images/navy/Navy-POL-OR-01.svg',
    'assets/images/navy/Navy-POL-OR-02.svg',
    'assets/images/navy/Navy-POL-OR-03.svg',
    'assets/images/navy/Navy-POL-OR-04a.svg',
    'assets/images/navy/Navy-POL-OR-04b.svg',
    'assets/images/navy/Navy-POL-OR-05.svg',
    'assets/images/navy/Navy-POL-OR-06.svg',
    'assets/images/navy/Navy-POL-OR-07.svg',
    'assets/images/navy/Navy-POL-OR-08.svg',
    'assets/images/navy/Navy-POL-OR-09a.svg',
    'assets/images/navy/Navy-POL-OR-09b.svg',
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

// Cache first: the app is fully static, so a cached file is always good enough
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
            .then(cached => cached || fetch(event.request))
    );
});
