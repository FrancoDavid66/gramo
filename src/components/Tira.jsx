import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import VideoAuto from './VideoAuto';
import Reveal from './Reveal';
import { tira, negocio } from '../data/gramo';
import { ease } from '../lib/motion';
import { lockScroll } from '../lib/scroll';

const envolver = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

// Tira infinita de fotos y videos: se mueve sola y acelera (o cambia de sentido) con la velocidad del scroll.
// Tocás una y se abre grande con una transición compartida (layoutId).
export default function Tira() {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocidad = useVelocity(scrollY);
  const suave = useSpring(velocidad, { damping: 50, stiffness: 400 });
  const factor = useTransform(suave, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${envolver(-50, 0, v)}%`);
  const sentido = useRef(1);
  const pausa = useRef(false);
  const [abierta, setAbierta] = useState(null);

  useAnimationFrame((_, delta) => {
    if (pausa.current || abierta) return;
    let mover = sentido.current * -1.6 * (delta / 1000);
    if (factor.get() < 0) sentido.current = -1;
    else if (factor.get() > 0) sentido.current = 1;
    mover += sentido.current * mover * factor.get();
    base.set(base.get() + mover);
  });

  useEffect(() => {
    lockScroll(!!abierta);
    if (!abierta) return;
    const esc = (e) => e.key === 'Escape' && setAbierta(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [abierta]);

  const items = [...tira.map((t, i) => ({ ...t, id: `a-${i}` })), ...tira.map((t, i) => ({ ...t, id: `b-${i}`, copia: true }))];
  const actual = items.find((i) => i.id === abierta);

  return (
    <section className="overflow-hidden pb-[104px]" aria-label="Fotos y videos de GRAMO">
      <div className="gutter mx-auto mb-7 flex max-w-[1440px] flex-wrap items-end justify-between gap-3">
        <Reveal as="p" className="kicker mb-0">— Así se ve un día en GRAMO</Reveal>
        <Reveal as="a" delay={0.1} href={negocio.instagram} target="_blank" rel="noopener noreferrer" className="up hover:text-verde">
          {negocio.instagramUsuario} ↗
        </Reveal>
      </div>

      <motion.div
        className="flex w-max gap-3.5 px-2 pb-10"
        style={{ x }}
        onPointerEnter={() => (pausa.current = true)}
        onPointerLeave={() => (pausa.current = false)}
      >
        {items.map((it, i) => (
          <motion.button
            key={it.id}
            type="button"
            layoutId={`tira-${it.id}`}
            onClick={() => setAbierta(it.id)}
            className="relative h-[clamp(240px,28vw,380px)] flex-none overflow-hidden rounded-[4px] bg-arena"
            style={{ aspectRatio: '4 / 5', marginTop: i % 2 ? 36 : 0 }}
            whileHover={{ scale: 1.025, rotate: i % 2 ? 1.2 : -1.2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            data-cursor={it.video ? 'play' : 'ver'}
            aria-label={`Ver grande: ${it.alt}`}
            tabIndex={it.copia ? -1 : 0}
            aria-hidden={it.copia ? 'true' : undefined}
          >
            {it.video ? (
              <VideoAuto src={it.video} poster={it.foto} className="h-full w-full object-cover" alt={it.alt} />
            ) : (
              <img src={it.foto} alt={it.copia ? '' : it.alt} loading="lazy" className="h-full w-full object-cover" draggable="false" />
            )}
            {it.video && (
              <span className="absolute left-3 top-3 rounded-full bg-tinta/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-crema backdrop-blur-sm">
                ● Video
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {actual && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-tinta/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAbierta(null)}
            data-cursor="cerrar"
          >
            <motion.div
              layoutId={`tira-${actual.id}`}
              className="relative max-h-[86vh] overflow-hidden rounded-md"
              style={{ aspectRatio: '4 / 5', height: 'min(86vh, 125vw)' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            >
              {actual.video ? (
                <VideoAuto src={actual.video} poster={actual.foto} className="h-full w-full object-cover" alt={actual.alt} />
              ) : (
                <img src={actual.foto} alt={actual.alt} className="h-full w-full object-cover" />
              )}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.25, ease } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-0 right-0 text-center font-hand text-3xl text-crema"
            >
              {actual.alt}
            </motion.p>
            <button
              type="button"
              className="absolute right-5 top-5 h-12 w-12 rounded-full border-[1.5px] border-crema text-crema"
              aria-label="Cerrar"
              onClick={() => setAbierta(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
