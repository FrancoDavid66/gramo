import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

// Botón "magnético": se acerca al mouse cuando pasás cerca
export default function Magnetic({ children, fuerza = 0.28, className = '' }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const mover = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * fuerza);
    y.set((e.clientY - (r.top + r.height / 2)) * fuerza);
  };
  const soltar = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={mover} onPointerLeave={soltar} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}
