let staticCacheName = 'currency-con';
let excangeRates = 'currency-ex';
let allCaches = [
  staticCacheName,
  excangeRates
];

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
          'index.html',
          'js/bootstrap.min.js',
          'js/convert.js',
          'css/bootstrap.min.css',
          'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js'
        ]);
      })
    );
  });

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('currency-') &&
                   !allCaches.includes(cacheName);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

  //check if rate is in cache and add it if it missing
  self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);

    //only store fetchs to the api
    if (requestUrl.pathname.startsWith('/api/v5/convert')) {
    event.respondWith(
      caches.open('currency-ex').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );}
  });