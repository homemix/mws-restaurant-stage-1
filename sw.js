let staticCacheName = 'v1';

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
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
               './img/1-300.jpg',
               './img/2-300.jpg',
               './img/3-300.jpg',
               './img/4-300.jpg',
               './img/5-300.jpg',
               './img/6-300.jpg',
               './img/7-300.jpg',
               './img/8-300.jpg',
               './img/9-300.jpg',
               './img/10-300.jpg',
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
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') &&
						   cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			return response || fetch(event.request);
		})
	);
});
