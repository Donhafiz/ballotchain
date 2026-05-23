// BallotChain Service Worker
const CACHE = "ballotchain-v19";

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(["/", "/vote", "/verify", "/audit"]))
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});

self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
});
