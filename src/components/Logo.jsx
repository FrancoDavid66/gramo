import { motion } from 'framer-motion';
import { ease } from '../lib/motion';

export const PESA_CUERPO =
  'M38 34 L82 34 C88 34 90 38 92 44 L104 96 C106 104 101 108 94 108 L26 108 C19 108 14 104 16 96 L28 44 C30 38 32 34 38 34 Z';
export const PESA_ASA = 'M50 34 C46 26 46 16 53 12 C57 10 63 10 67 12 C74 16 74 26 70 34';

// Logo de GRAMO: la pesa dibujada a mano.
// modo: 'quieto' | 'dibujar' (al montar) | 'vista' (cuando aparece en pantalla)
export default function Logo({ modo = 'quieto', className = '', texto = true, delay = 0, titulo = 'GRAMO' }) {
  const trazo =
    modo === 'dibujar'
      ? { initial: { pathLength: 0 }, animate: { pathLength: 1 } }
      : modo === 'vista'
        ? { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true } }
        : {};
  const letras =
    modo === 'dibujar'
      ? { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } }
      : modo === 'vista'
        ? { initial: { opacity: 0, y: 6 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
        : {};

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={titulo}>
      <motion.path d={PESA_CUERPO} className="ink-b" {...trazo} transition={{ duration: 1.3, ease, delay }} />
      <motion.path d={PESA_ASA} className="ink-b" {...trazo} transition={{ duration: 0.8, ease, delay: delay + 0.55 }} />
      {texto && (
        <motion.text x="60" y="86" transform="rotate(-6 60 80)" className="logo-t" {...letras} transition={{ duration: 0.6, delay: delay + 0.9 }}>
          GRAMO
        </motion.text>
      )}
    </svg>
  );
}
