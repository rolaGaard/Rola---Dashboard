// Service Worker mínimo — existe únicamente para que Chrome en Android
// pueda completar la instalación real de la PWA (generar el ícono como
// app de verdad, no solo un acceso directo). Chrome exige un Service
// Worker con un manejador de "fetch" registrado para considerar el sitio
// instalable; sin esto, la instalación se queda colgada en "Instalando...".
//
// A propósito, este Service Worker NO guarda nada en caché — todos los
// pedidos van directo a la red, igual que si no existiera ningún Service
// Worker interceptando. Esto es deliberado: ya tuvimos problemas de
// versiones viejas quedando guardadas en caché, y no queremos repetirlos.

self.addEventListener('install', (event) => {
  // Activamos de inmediato, sin esperar a que se cierren las pestañas viejas.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Sin caché: cada pedido va directo a la red, siempre con el dato más
  // fresco posible — index.html, scores.json, todo.
  event.respondWith(fetch(event.request));
});
