const CACHE_NAME = 'life-loops-cache-v1'; // Increment version to update cache
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './assets/triangles.png',
    './nes.min.css',
    'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap', // Consider hosting fonts locally for true offline
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js' // Consider hosting confetti locally for true offline
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cacheName => {
                    return caches.delete(cacheName); // Clean up old caches
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request); // No cache hit - fetch from network
            })
    );
});
