/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'api-cache-v1';
const API_URL = 'https://jsonplaceholder.typicode.com/users';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // Only cache the API call
  if (request.url === API_URL) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(response => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(request, response.clone());
              return response;
            });
          })
          .catch(() => {
            // Fallback: return cached version even if offline
            return caches.match(request);
          });
      })
    );
  }
});
