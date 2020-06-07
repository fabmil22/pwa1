
//service Worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./service-worker.js')
          .then( response => console.log('funcionando el serviceWorker' , response) )
            .catch( error => console.log('no fucniona el service worker', error) )
    });
  }else{
    console.log(" no puede usar el service worker");
}


