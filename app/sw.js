/* 离线缓存:首次访问后,即使完全断网也能正常使用 */
const CACHE = "rechoose-v11";
const ASSETS = [
  "./index.html",
  "./privacy.html",
  "./support.html",
  "./css/base.css",
  "./css/web.css",
  "./css/ios.css",
  "./js/platform.js",
  "./js/i18n.js",
  "./js/core/data.js",
  "./js/core/format.js",
  "./js/ui/primitives.js",
  "./js/app.js",
  "./manifest.json",
  "./assets/app-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Cache one complete release at a time so HTML and split JS/CSS never mix versions. */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
