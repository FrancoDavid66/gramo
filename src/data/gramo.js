// =============================================================
//  GRAMO — todos los datos editables de la web
//  Fotos en src/assets/fotos · videos en src/assets/videos
// =============================================================
import { videos } from './videos';

// ---------- Fotos ----------
import tiramicookie from '../assets/fotos/m-tiramicookie.webp';
import roll from '../assets/fotos/m-roll.webp';
import doblechoco from '../assets/fotos/m-doblechoco.webp';
import clasica from '../assets/fotos/m-clasica.webp';
import pistacho from '../assets/fotos/m-pistacho.webp';
import almendras from '../assets/fotos/m-almendras.webp';
import pepa from '../assets/fotos/m-pepa.webp';
import revuelto from '../assets/fotos/m-revuelto.webp';
import sandwich from '../assets/fotos/m-sandwich.webp';
import tarta from '../assets/fotos/m-tarta.webp';
import plato from '../assets/fotos/m-plato.webp';
import tiramisu from '../assets/fotos/m-tiramisu.webp';
import naranja from '../assets/fotos/m-naranja.webp';
import minitorta from '../assets/fotos/m-minitorta.webp';
import barrita from '../assets/fotos/m-barrita.webp';
import matcha from '../assets/fotos/m-matcha.webp';
import frasco from '../assets/fotos/a-frasco.webp';
import biscotti from '../assets/fotos/a-biscotti.webp';
import bolsaCookies from '../assets/fotos/a-cookies.webp';
import tote from '../assets/fotos/a-tote.webp';
import cena from '../assets/fotos/c-cena.webp';
import mesa from '../assets/fotos/c-mesa.webp';
import mesaDulce from '../assets/fotos/p-mesadulce.webp';
import local from '../assets/fotos/v-local.webp';
import u1 from '../assets/fotos/u-1.webp';
import u2 from '../assets/fotos/u-2.webp';
import u3 from '../assets/fotos/u-3.webp';
import u4 from '../assets/fotos/u-4.webp';
import u5 from '../assets/fotos/u-5.webp';
import u6 from '../assets/fotos/u-6.webp';
import s1 from '../assets/fotos/strip-01.webp';
import s2 from '../assets/fotos/strip-02.webp';
import s3 from '../assets/fotos/strip-03.webp';
import s4 from '../assets/fotos/strip-04.webp';
import s5 from '../assets/fotos/strip-05.webp';
import s6 from '../assets/fotos/strip-06.webp';
import s7 from '../assets/fotos/strip-07.webp';
import s8 from '../assets/fotos/strip-08.webp';
import s9 from '../assets/fotos/strip-09.webp';
import s10 from '../assets/fotos/strip-10.webp';
import s11 from '../assets/fotos/strip-11.webp';
import s12 from '../assets/fotos/strip-12.webp';

// ---------- Negocio ----------
export const negocio = {
  nombre: 'GRAMO',
  direccion: 'Dorrego 2517',
  ciudad: 'CABA · Buenos Aires',
  instagram: 'https://www.instagram.com/gramo.ba/',
  instagramUsuario: '@gramo.ba',
  // PENDIENTE: número de WhatsApp con código de país, sin + ni espacios (ej: 5491123456789)
  whatsapp: '',
  maps: 'https://www.google.com/maps/search/?api=1&query=Dorrego+2517+CABA',
  // PENDIENTE: confirmar con el cliente
  anticipacion: '48 h',
  dominio: 'https://TU-DOMINIO.com.ar',
};

// Minutos desde las 00:00 · null = cerrado (0 = domingo … 6 = sábado)
export const horarios = {
  0: [540, 1140],
  1: null,
  2: [510, 1170],
  3: [510, 1170],
  4: [510, 1170],
  5: [510, 1170],
  6: [540, 1170],
};

export const horariosTabla = [
  { dias: 'Lunes', horas: 'Cerrado', nums: [1] },
  { dias: 'Martes a viernes', horas: '8.30 — 19.30', nums: [2, 3, 4, 5] },
  { dias: 'Sábados', horas: '9 — 19.30', nums: [6] },
  { dias: 'Domingos', horas: '9 — 19', nums: [0] },
];

// ---------- Balanza de recetas ----------
export const recetas = [
  { id: 'ristretto', nombre: 'Ristretto', ratio: 1.5, tiempo: '20–25 s' },
  { id: 'espresso', nombre: 'Espresso', ratio: 2, tiempo: '25–30 s' },
  { id: 'lungo', nombre: 'Lungo', ratio: 3, tiempo: '35–40 s' },
  { id: 'filtrado', nombre: 'Filtrado', ratio: 16, tiempo: '3–4 min' },
];

// ---------- Menú ----------
// PENDIENTE: gramos y precios reales (hoy los gramos son de ejemplo)
export const menuTabs = [
  { id: 'cookies', nombre: 'Cookies' },
  { id: 'brunch', nombre: 'Brunch' },
  { id: 'pasteleria', nombre: 'Pastelería' },
  { id: 'bebidas', nombre: 'Bebidas' },
];

export const menu = {
  cookies: [
    { nombre: 'Tiramicookie', desc: 'Café, crema de mascarpone y cacao amargo.', gramos: 120, precio: '', foto: tiramicookie },
    { nombre: 'Cookie roll de canela', desc: 'Masa de canela en espiral con glaseado.', gramos: 120, precio: '', foto: roll },
    { nombre: 'Cookie doble choco', desc: 'Masa de cacao, chocolate en trozos y sal en escamas.', gramos: 110, precio: '', foto: doblechoco },
    { nombre: 'Cookie clásica con sal marina', desc: 'Chips de chocolate semiamargo y flor de sal.', gramos: 110, precio: '', foto: clasica },
    { nombre: 'Cookie avena y pistacho', desc: 'Avena, pistachos tostados y chocolate.', gramos: 110, precio: '', foto: pistacho },
    { nombre: 'Cookie almendras y choco blanco', desc: 'Almendras enteras y chocolate blanco.', gramos: 110, precio: '', foto: almendras },
    { nombre: 'Pepa de avena y membrillo', desc: 'Masa de avena con dulce de membrillo.', gramos: 100, precio: '', foto: pepa },
  ],
  brunch: [
    { nombre: 'Huevos fritos & palta', desc: 'Tostada de masa madre, palta, huevos fritos y semillas.', gramos: 320, precio: '', foto: videos.huevos.poster, video: videos.huevos.src },
    { nombre: 'Revuelto con crackers', desc: 'Huevos revueltos, crackers de semillas, pickles de cebolla y eneldo.', gramos: 320, precio: '', foto: revuelto, video: videos.revuelto.src },
    { nombre: 'Sándwich de masa madre', desc: 'Pan de masa madre, huevo, tomate y papas rústicas al horno.', gramos: 380, precio: '', foto: sandwich },
    { nombre: 'Tarta de espinaca', desc: 'Porción de tarta con hojas verdes de estación.', gramos: 300, precio: '', foto: tarta },
    { nombre: 'Plato de la casa', desc: 'Papas rústicas, hojas verdes y lo que da la estación.', gramos: 350, precio: '', foto: plato },
  ],
  pasteleria: [
    { nombre: 'Torta vasca', desc: 'Cremosa por dentro, tostada por fuera, con frutillas y crema.', gramos: 180, precio: '', foto: videos.tortaVasca.poster, video: videos.tortaVasca.src },
    { nombre: 'Tiramisú', desc: 'Café de la barra, mascarpone y cacao amargo.', gramos: 180, precio: '', foto: tiramisu },
    { nombre: 'Torta de naranja', desc: 'Bizcocho húmedo con rodaja de naranja confitada.', gramos: 160, precio: '', foto: naranja },
    { nombre: 'Mini torta de estación', desc: 'Bizcocho especiado, frosting y flor de azúcar.', gramos: 150, precio: '', foto: minitorta },
    { nombre: 'Barrita de chocolate', desc: 'Chocolate intenso con almendras fileteadas.', gramos: 70, precio: '', foto: barrita },
  ],
  bebidas: [
    { nombre: 'Matcha & frutos rojos', desc: 'Matcha latte sobre leche y frutos rojos.', gramos: 300, precio: '', foto: matcha, video: videos.matcha.src },
    { nombre: 'Flat white', desc: 'Doble ristretto, leche texturizada y latte art.', gramos: 180, precio: '', foto: videos.cafe.poster, video: videos.cafe.src },
    { nombre: 'Espresso', desc: '18 g de café, 36 g de bebida, 28 segundos.', gramos: 36, precio: '' },
    { nombre: 'Filtrado del día', desc: 'Origen rotativo, preguntá en la barra.', gramos: 250, precio: '' },
  ],
};

// ---------- Tira de fotos (y videos) ----------
export const tira = [
  { foto: s1, alt: 'Mesa larga con bocados y flores' },
  { foto: videos.dia.poster, video: videos.dia.src, alt: 'Mañana, mediodía y tarde en GRAMO' },
  { foto: s2, alt: 'Catering con salmón, ensaladas y panes' },
  { foto: s4, alt: 'Matcha con frutos rojos' },
  { foto: videos.montaje.poster, video: videos.montaje.src, alt: 'Pastelería, limonada y bombones' },
  { foto: s5, alt: 'Pastelería y frascos GRAMO' },
  { foto: s3, alt: 'Sándwiches para un evento' },
  { foto: videos.tortaVasca.poster, video: videos.tortaVasca.src, alt: 'Torta vasca con frutillas y crema' },
  { foto: s7, alt: 'Mesa dulce con frutos rojos' },
  { foto: s8, alt: 'Cookies en fuente de plata' },
  { foto: videos.huevos.poster, video: videos.huevos.src, alt: 'Huevos fritos con palta' },
  { foto: s6, alt: 'Tortilla con espárragos' },
  { foto: s9, alt: 'Revuelto con crackers y limonada' },
  { foto: s10, alt: 'Mesa con flores silvestres' },
  { foto: s11, alt: 'Bocados para evento' },
  { foto: s12, alt: 'Mesa de catering al aire libre' },
];

// ---------- Video de la sección "cine" ----------
export const cine = videos.cafe;
export const cineRespaldo = s4;

// ---------- Cenas y eventos ----------
// PENDIENTE: fechas, nombres y cupos reales
export const cenas = {
  fotoPrincipal: cena,
  fotoChica: mesa,
  video: null,
  proximas: [
    { fecha: '[Vie 00/00]', nombre: '[Nombre de la cena]', detalle: 'Menú de pasos · [cupos] lugares' },
    { fecha: '[Sáb 00/00]', nombre: '[Nombre de la cena]', detalle: 'Menú de pasos · [cupos] lugares' },
  ],
};

// ---------- Pedidos ----------
export const pedidosTipos = ['Torta entera', 'Caja de cookies', 'Mesa dulce', 'Catering para eventos'];
export const pedidosFoto = mesaDulce;

// ---------- Almacén ----------
export const almacen = [
  { nombre: 'Dulce de la casa', detalle: 'Frasco · [g]', precio: '', foto: frasco },
  { nombre: 'Biscotti', detalle: 'Bolsa · [g]', precio: '', foto: biscotti },
  { nombre: 'Bolsa de cookies', detalle: 'Bolsa · [g]', precio: '', foto: bolsaCookies },
  { nombre: 'Bolsa de tela', detalle: '0 g de plástico', precio: '', foto: tote },
];

// ---------- Ustedes (cada foto abre su post) ----------
export const ustedes = [
  { foto: u1, alt: 'Dos clientas con sus platos en la puerta de GRAMO', link: 'https://www.instagram.com/gramo.ba/p/DecFMs9EUjn/' },
  { foto: u2, alt: 'Gente sirviéndose en un evento de GRAMO', link: 'https://www.instagram.com/gramo.ba/p/DeKsibzD8aN/' },
  { foto: u3, alt: 'Invitadas con limonadas en un evento', link: 'https://www.instagram.com/gramo.ba/p/De4TWaAEQ6-/' },
  { foto: u4, alt: 'Plato con sándwich de masa madre y papas', link: 'https://www.instagram.com/gramo.ba/p/DecFMs9EUjn/' },
  { foto: u5, alt: 'Cookie de avena y pistacho en la vereda', link: 'https://www.instagram.com/gramo.ba/p/DezUqd3kfH6/' },
  { foto: u6, alt: 'Catering de GRAMO en un local de ropa', link: 'https://www.instagram.com/gramo.ba/p/De4TWaAEQ6-/' },
];

export const fotoLocal = local;
