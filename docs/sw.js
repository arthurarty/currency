var staticCacheName = 'currency-con';

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
          'js/bootstrap.min.js',
          'css/bootstrap.min.css',
          'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js'
        ]);
      })
    );
  });

/*self.addEventListener('fetch', function(event) {
    event.respondWith(
        new Response('Hello <b> There this is</b>', {
            headers: {'Content-Type': 'text/html'}
        })
    );
  });*/