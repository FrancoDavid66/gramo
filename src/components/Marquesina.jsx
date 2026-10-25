import { motion } from 'framer-motion';
import { useEstado } from '../lib/horario';
import { negocio } from '../data/gramo';

// Cartel corrido de arriba: estado en vivo + datos del local
export default function Marquesina() {
  const estado = useEstado();
  const items = [
    { t: estado.texto, vivo: true },
    { t: `${negocio.direccion} · CABA` },
    { t: 'Café de especialidad' },
    { t: 'Cookies del día' },
    { t: 'Cocina de temporada' },
    { t: 'Cenas con velas' },
    { t: 'Almacén' },
  ];
  const fila = (copia) =>
    items.map((it, i) => (
      <span key={`${copia}-${i}`} className="inline-flex items-center gap-2.5 whitespace-nowrap px-6 py-[11px]" aria-hidden={copia ? 'true' : undefined}>
        <span className="relative flex h-2 w-2">
          {it.vivo && estado.abierto && <span className="absolute inset-0 animate-ping rounded-full bg-[#2E9E5B] opacity-70" />}
          <span className={`relative h-2 w-2 rounded-full ${it.vivo && estado.abierto ? 'bg-[#2E9E5B]' : 'bg-coral'}`} />
        </span>
        {it.t}
      </span>
    ));

  return (
    <div className="group overflow-hidden bg-tinta font-mono text-[12px] uppercase tracking-[.14em] text-crema" role="status">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 42, ease: 'linear', repeat: Infinity }}
      >
        {fila(0)}
        {fila(1)}
      </motion.div>
    </div>
  );
}
