# GRAMO — web

Vite + React + Tailwind + Framer Motion + Lenis.

## Arrancar

```bash
npm install
npm run dev
```

## Dónde se edita todo

- **`src/data/gramo.js`** → WhatsApp, Instagram, dirección, anticipación de pedidos, horarios, recetas de la balanza, menú (cookies, brunch, pastelería, bebidas), tira de fotos, cenas, tipos de pedido, almacén y fotos de "Ustedes".
- **`src/data/videos.js`** → los videos (mp4 + foto de portada). Si un plato tiene `video`, la foto del ticket cobra vida al pasar el mouse.
- **Fotos** → `src/assets/fotos/` (webp). Para cambiar una foto, reemplazá el archivo con el mismo nombre.
- **Colores y tipografías** → `tailwind.config.js` (verde, coral, tinta, crema, arena, papel, noche) y `src/main.jsx` (Instrument Serif + IBM Plex Mono + Caveat, autoalojadas con @fontsource).

## Animaciones (Framer Motion)

- Pantalla de carga: la pesa se dibuja y la balanza pesa hasta 18,0 g; sale como un telón.
- Hero: título que sube por palabras, balanza que se dibuja trazo a trazo (`pathLength`), se balancea al terminar, se inclina con el mouse y tiene el botón "Volver a pesar". Parallax al scrollear.
- Tira de fotos infinita que acelera y cambia de sentido con la velocidad del scroll (`useVelocity`); al tocar una foto se abre grande con transición compartida (`layoutId`).
- Balanza digital con resorte (`useSpring`): los gramos corren, la taza se llena y el plato rebota.
- Menú en tickets: se imprimen al aparecer, pestañas con píldora que se desliza (`layoutId`), `AnimatePresence` al cambiar de pestaña, inclinación 3D con el mouse, peso que cuenta y código de barras que se dibuja.
- Sección "cine": el video crece y se endereza con el scroll y aparecen las frases de la receta.
- Cenas y pedidos con parallax, ticket de pedido en vivo y mensaje de WhatsApp armado.
- Almacén: productos que caen al estante y etiqueta de precio que se hamaca.
- Mapa que se dibuja, pin que cae con rebote y polaroid del local que se puede arrastrar (`drag`).
- Cursor propio, botones magnéticos, navbar que se esconde al bajar, barra de progreso, menú del celu con transición circular y scroll suave con Lenis.
- Respeta "reducir movimiento" del sistema (`MotionConfig reducedMotion="user"`).

## Builds

```bash
npm run build          # dist/ para subir a Hostinger (public_html)
npm run build:single   # dist-single/index.html (todo en un archivo, abre con doble clic)
```

## Pendiente

- Número de WhatsApp (`negocio.whatsapp` en `src/data/gramo.js`). Mientras esté vacío, los botones abren WhatsApp para elegir el contacto.
- Precios, gramos reales, fechas y cupos de las cenas, anticipación de pedidos.
- Dominio: hoy dice `TU-DOMINIO.com.ar` en `index.html`, `public/robots.txt`, `public/sitemap.xml` y `src/data/gramo.js`.
- Logo en vector del cliente (hoy es una versión dibujada de la pesa en `src/components/Logo.jsx`).
