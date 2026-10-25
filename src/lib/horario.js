import { useEffect, useState } from 'react';
import { horarios } from '../data/gramo';

const nombres = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// 510 -> "8.30", 540 -> "9"
export const fmtHora = (m) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return mm ? `${h}.${String(mm).padStart(2, '0')}` : String(h);
};

function ahoraBA() {
  try {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
  } catch {
    return new Date();
  }
}

// Calcula si GRAMO está abierto ahora (hora de Buenos Aires) y arma el texto
export function calcularEstado() {
  const ba = ahoraBA();
  const dia = ba.getDay();
  const mins = ba.getHours() * 60 + ba.getMinutes();
  const hoy = horarios[dia];
  if (hoy && mins >= hoy[0] && mins < hoy[1]) {
    return { dia, abierto: true, texto: `Abierto ahora · cierra ${fmtHora(hoy[1])}` };
  }
  if (hoy && mins < hoy[0]) {
    return { dia, abierto: false, texto: `Cerrado · abrimos hoy ${fmtHora(hoy[0])}` };
  }
  let n = (dia + 1) % 7;
  let k = 1;
  while (!horarios[n]) {
    n = (n + 1) % 7;
    k++;
  }
  const cuando = k === 1 ? 'mañana' : `el ${nombres[n]}`;
  return {
    dia,
    abierto: false,
    texto: `${dia === 1 ? 'Hoy descansamos' : 'Cerrado'} · abrimos ${cuando} ${fmtHora(horarios[n][0])}`,
  };
}

// Hook: se actualiza solo cada minuto
export function useEstado() {
  const [estado, setEstado] = useState(calcularEstado);
  useEffect(() => {
    const id = setInterval(() => setEstado(calcularEstado()), 60000);
    return () => clearInterval(id);
  }, []);
  return estado;
}
