import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
import Logo from './Logo';
import { coma, easeInOut } from '../lib/motion';

// Pantalla de carga: la pesa se dibuja y la balanza "pesa" hasta 18,0 g. Después sube como un telón.
export default function Loader({ alTerminar }) {
  const [g, setG] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctrl = animate(0, 18, {
      duration: reduce ? 0.2 : 1.7,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: setG,
      onComplete: () => setTimeout(alTerminar, reduce ? 0 : 380),
    });
    return () => ctrl.stop();
  }, [alTerminar]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-7 bg-crema text-tinta"
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 1, ease: easeInOut } }}
      style={{ clipPath: 'inset(0 0 0% 0)' }}
      aria-live="polite"
      aria-label="Cargando GRAMO"
    >
      <Logo modo="dibujar" className="h-28 w-28" />
      <div className="flex items-baseline gap-3 font-mono text-[12px] uppercase tracking-[.22em]">
        <span>Pesando</span>
        <span className="min-w-[5ch] text-right text-[22px] tracking-normal tabular-nums">{coma(g)}</span>
        <span>g</span>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-coral"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
      />
      <span className="absolute bottom-6 font-hand text-2xl text-verde">la medida justa</span>
    </motion.div>
  );
}
