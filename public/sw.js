const cacheName = 'LegendayPWA-v1';
const cachedFiles = [
    "./?version=1.0",
    'index.html',
    'app.tsx',
    'style.css',
    'script.jsx',
    'src/*',
    'public/*'
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(cachedFiles);
        })
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
