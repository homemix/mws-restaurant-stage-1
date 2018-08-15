let cacheName = 'v1'; 


let cacheFiles = [
                 './index.html',
                './',
                './restaurant.html',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './js/sw_register.js',
                './sw.js',
                './manifest.json',
               './css/styles.css',
               './data/restaurants.json',
               './restaurant.html?id=1',
          './restaurant.html?id=2',
          './restaurant.html?id=3',
          './restaurant.html?id=4',
          './restaurant.html?id=5',
          './restaurant.html?id=6',
          './restaurant.html?id=7',
          './restaurant.html?id=8',
          './restaurant.html?id=9',
          './restaurant.html?id=10',
               'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
				
]

self.addEventListener('install', function(e) {
    console.log('service worker installed');

   
    e.waitUntil(

     
      caches.open(cacheName).then(function(cache) {

        
      console.log('service worker caching cachefiles');
      return cache.addAll(cacheFiles);
      })
  ); 
});


self.addEventListener('activate', function(e) {
    console.log('service worker activated');

    e.waitUntil(

    
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {

        if (thisCacheName !== cacheName) {

          console.log('service worker removing rached files from cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  ); 

});


self.addEventListener('fetch', function(e) {
  console.log('service worker Fetch', e.request.url);

 
  e.respondWith(

  
    caches.match(e.request)


      .then(function(response) {

       // if new cache found return it
        if ( response ) {
          console.log("service worker Found in Cache", e.request.url, response);
         
          return response;
        }

        // else fetch new

        let requestClone = e.request.clone();
        return fetch(requestClone)
          .then(function(response) {

            if ( !response ) {
              console.log("service worker No response from fetch ")
              return response;
            }

            let responseClone = response.clone();

           
            caches.open(cacheName).then(function(cache) {

              
              cache.put(e.request, responseClone);
              console.log('service worker New Data Cached', e.request.url);

             
              return response;
      
                }); 

          })
          .catch(function(err) {
            console.log('service worker Error Fetching & Caching New Data', err);
          });


      }) 
  ); 
});
