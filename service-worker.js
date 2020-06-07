//Asigan nombre y direccion de cache

const CACHE_NAME = 'v1_chache_fab_pwa';

//ficheros a cachear en la aplicacion

var ulsToCache = [
'./',
'./style.css',
'./img/1.png',
'./img/2.png',
'./img/3.png',
'./img/4.png',
'./img/5.png',
'./img/6.png',
'./img/favicon.png',
'./img/favicon-16.png',
'./img/favicon-32.png',
'./img/favicon-64.png',
'./img/favicon-96.png',
'./img/favicon-128.png',
'./img/favicon-192.png',
'./img/favicon-256.png',
'./img/favicon-384.png',
'./img/favicon-512.png',
'./img/favicon-1024.png',
'./img/instagram.png',
'./img/twitter.png',
'./img/facebook.png',
];

//evento instalacion
//esta funcion se encarga de la instalacion y poner en cahe lo archivo de arriba
self.addEventListener('install' , event => {
 event.waitUntil(
     caches.open(CACHE_NAME)
        .then( cache => { 
            return cache.addAll(ulsToCache)
                        .then(() => {
                            self.skipWaiting();
                        })
        }).catch(error => { console.log('no se ha registrado el cache', error)} )
 )
})
// evento activate

self.addEventListener( 'activate' , e =>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then( cacheNames =>{
            return Promise.all(
                cacheNames.map(cachename => { 
                            if(cacheWhiteList.indexOf(cachename) === -1){
                                //borra los elementos que no necesitamos
                                return caches.delete(cachename);
                                 }

                       })
               )
        })
        .then(()=>{
            //active  el cache
            self.clients.claim();
            })
    )
})

//evento fetch
self.addEventListener('fetch' , evento =>{
evento.respondWith(

    caches.match(evento.request)
    .then(res =>{
        if(res){
            return res;
          }
        return fetch(evento.request);
    })
)
        
})