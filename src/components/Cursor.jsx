import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

// Cursor propio (solo con mouse): un punto y un aro que lo sigue con resorte.
// Sobre fotos/videos con data-cursor="texto" el aro crece y muestra el texto.
export default function Cursor() {
  const [activo, setActivo] = useState(false);
  const [modo, setModo] = useState(null); // null | 'link' | 'texto' | { label }
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fino = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fino || reduce) return;
    setActivo(true);
    document.documentElement.classList.add('cursor-on');

    const mover = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const sobre = (e) => {
      const t = e.target.closest?.('[data-cursor],a,button,input,textarea,select,label');
      if (!t) return setModo(null);
      if (t.dataset.cursor) return setModo({ label: t.dataset.cursor });
      if (/INPUT|TEXTAREA|SELECT/.test(t.tagName)) return setModo('texto');
      setModo('link');
    };
    const salir = () => setVisible(false);
    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerover', sobre);
    document.addEventListener('pointerleave', salir);
    return () => {
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerover', sobre);
      document.removeEventListener('pointerleave', salir);
      document.documentElement.classList.remove('cursor-on');
    };
  }, [x, y]);

  if (!activo) return null;
  const conTexto = modo && typeof modo === 'object';
  const tam = conTexto ? 96 : modo === 'link' ? 58 : modo === 'texto' ? 6 : 36;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[6px] w-[6px] rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible && !(modo && typeof modo === 'object') ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] flex items-center justify-center rounded-full border-[1.5px] border-solid"
        style={{
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          mixBlendMode: conTexto ? 'normal' : 'difference',
        }}
        animate={{
          width: tam,
          height: tam,
          backgroundColor: conTexto ? '#FF8A5B' : 'rgba(255,255,255,0)',
          borderColor: conTexto ? '#FF8A5B' : 'rgba(255,255,255,1)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        initial={false}
      >
        <AnimatePresence>
          {conTexto && (
            <motion.span
              key={modo.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[11px] uppercase tracking-[.14em] text-tinta"
            >
              {modo.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
