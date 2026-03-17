const CACHE_NAME = 'afinador-v1';
const ASSETS = [
  '/afinadorjrteste/',
  '/afinadorjrteste/index.html',
  '/afinadorjrteste/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Ignora requisições do microfone e APIs externas
  if (e.request.url.includes('blob:') || e.request.url.includes('github')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});