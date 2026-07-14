const CACHE_NAME = "audit-cjjd-v2";

const APP_FILES = [

    "/audit-financier-cjjd/",

    "/audit-financier-cjjd/index.html",

    "/audit-financier-cjjd/style.css",

    "/audit-financier-cjjd/script.js",

    "/audit-financier-cjjd/manifest.json",

    "/audit-financier-cjjd/assets/logo-cjjd.jpg",

    "/audit-financier-cjjd/assets/icon-192.png",

    "/audit-financier-cjjd/assets/icon-512.png"

];

self.addEventListener("install",event=>{

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>cache.addAll(APP_FILES))

    );

});

self.addEventListener("activate",event=>{

    event.waitUntil(

        caches.keys()

        .then(keys=>

            Promise.all(

                keys.map(key=>{

                    if(key!==CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            )

        )

    );

    self.clients.claim();

});

self.addEventListener("fetch",event=>{

    event.respondWith(

        caches.match(event.request)

        .then(response=>{

            return response || fetch(event.request);

        })

    );

});