import { negocio } from '../data/gramo';

// Arma el link de WhatsApp con el mensaje ya escrito.
// Si todavía no cargaste el número en data/gramo.js, abre WhatsApp para elegir el contacto.
export function linkWhatsApp(mensaje = '') {
  const texto = encodeURIComponent(mensaje);
  return negocio.whatsapp ? `https://wa.me/${negocio.whatsapp}?text=${texto}` : `https://wa.me/?text=${texto}`;
}
