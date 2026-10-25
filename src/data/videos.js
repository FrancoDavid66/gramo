// Videos de GRAMO (src/assets/videos), bajados de su Instagram y comprimidos (mudos, en loop).
// Cada uno tiene su mp4 y su foto de portada. Si falta alguno, la web usa la foto en su lugar.
import cafe from '../assets/videos/cafe.mp4';
import cafePoster from '../assets/videos/cafe.webp';
import matcha from '../assets/videos/matcha.mp4';
import matchaPoster from '../assets/videos/matcha.webp';
import huevos from '../assets/videos/huevos.mp4';
import huevosPoster from '../assets/videos/huevos.webp';
import revuelto from '../assets/videos/revuelto.mp4';
import revueltoPoster from '../assets/videos/revuelto.webp';
import tortaVasca from '../assets/videos/torta-vasca.mp4';
import tortaVascaPoster from '../assets/videos/torta-vasca.webp';
import montaje from '../assets/videos/montaje.mp4';
import montajePoster from '../assets/videos/montaje.webp';
import dia from '../assets/videos/dia.mp4';
import diaPoster from '../assets/videos/dia.webp';

export const videos = {
  cafe: { src: cafe, poster: cafePoster }, // latte art y café de la barra
  matcha: { src: matcha, poster: matchaPoster }, // matcha latte con frutos rojos
  huevos: { src: huevos, poster: huevosPoster }, // huevos fritos con palta
  revuelto: { src: revuelto, poster: revueltoPoster }, // revuelto con crackers
  tortaVasca: { src: tortaVasca, poster: tortaVascaPoster }, // torta vasca con frutillas
  montaje: { src: montaje, poster: montajePoster }, // pastelería, limonada y bombones
  dia: { src: dia, poster: diaPoster }, // mañana, mediodía y tarde
};
