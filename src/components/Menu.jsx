import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import VideoAuto from './VideoAuto';
import { Taza } from './Iconos';
import { menu, menuTabs } from '../data/gramo';
import { ease } from '../lib/motion';

const giros = [-1.2, 0.8, -0.5, 1.1];

// Un plato = un ticket de balanza. Se "imprime" al aparecer, se inclina en 3D con el mouse
// y, si tiene video, la foto cobra vida al pasar por arriba.
function Ticket({ item, i, codigo }) {
  const ref = useRef(null);
  const video = useRef(null);
  const [encima, setEncima] = useState(false);
  const [tactil, setTactil] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 18 });
  const gramos = useMotionValue(0);
  const gramosTexto = useTransform(gramos, (v) => Math.round(v));

  useEffect(() => setTactil(window.matchMedia('(hover: none)').matches), []);
  useEffect(() => {
    const c = animate(gramos, item.gramos, { duration: 1.4, ease, delay: 0.35 + i * 0.1 });
    return () => c.stop();
  }, [gramos, item.gramos, i]);

  const mover = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const entrar = (e) => {
    if (e.pointerType !== 'mouse') return;
    setEncima(true);
    video.current?.play();
  };
  const salir = () => {
    setEncima(false);
    mx.set(0);
    my.set(0);
    video.current?.pause();
  };

  const giro = giros[i % 4];
  const conVideo = Boolean(item.video);

  return (
    <motion.article
      ref={ref}
      layout
      className="ticket relative flex flex-col bg-papel px-[22px] pt-[22px] shadow-ticket"
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)', y: -28, rotate: 0 }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)', y: 0, rotate: giro, transitionEnd: { clipPath: 'none' } }}
      exit={{ opacity: 0, y: 26, scale: 0.95, transition: { duration: 0.28 } }}
      whileHover={{ y: -10, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
      transition={{ duration: 0.9, ease, delay: i * 0.1 }}
      onPointerMove={mover}
      onPointerEnter={entrar}
      onPointerLeave={salir}
      data-cursor={conVideo && !tactil ? 'play' : undefined}
    >
      <div className="flex justify-between text-[11px] uppercase tracking-[.14em] text-gris">
        <span>Gramo · Balanza 02</span>
        <span>N.º {String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className="mb-4 mt-3 border-t-[1.5px] border-tinta" />

      <div className="relative mb-[18px] flex aspect-square items-center justify-center overflow-hidden bg-arena text-tinta">
        {item.foto ? (
          <motion.img
            src={item.foto}
            alt={item.nombre}
            loading="lazy"
            className="h-full w-full object-cover"
            animate={{ scale: encima ? 1.07 : 1 }}
            transition={{ duration: 0.7, ease }}
            draggable="false"
          />
        ) : (
          <Taza className="w-[46%]" />
        )}
        {conVideo && (
          <motion.div className="absolute inset-0" initial={false} animate={{ opacity: encima || tactil ? 1 : 0 }} transition={{ duration: 0.4 }}>
            <VideoAuto ref={video} src={item.video} poster={item.foto} auto={tactil} className="h-full w-full object-cover" alt={item.nombre} />
          </motion.div>
        )}
        {conVideo && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-tinta/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-crema backdrop-blur-sm">
            {tactil ? '● Video' : encima ? '● Reproduciendo' : '▶ Pasá el mouse'}
          </span>
        )}
      </div>

      <h3 className="font-display text-[34px] font-normal leading-none">{item.nombre}</h3>
      <p className="mt-3.5 flex-1 text-[13px] leading-relaxed text-gris">{item.desc}</p>

      <div className="-mx-[22px] mt-[22px] flex h-[120px] flex-col gap-1.5 border-t-[1.5px] border-dashed border-tinta px-[22px] pb-4 pt-3.5 text-[12px] uppercase tracking-[.1em]">
        <div className="flex justify-between">
          <span>Peso neto</span>
          <span className="font-semibold tabular-nums">
            <motion.span>{gramosTexto}</motion.span> g
          </span>
        </div>
        <div className="flex justify-between">
          <span>Precio</span>
          <span>{item.precio || '$ [precio]'}</span>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <motion.div
            className="barcode h-[30px] flex-1 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.5 + i * 0.1 }}
          />
          <span className="text-[11px]">{codigo}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [tab, setTab] = useState('cookies');
  const [visto, setVisto] = useState(false);
  const items = menu[tab];
  const prefijo = String(menuTabs.findIndex((t) => t.id === tab) + 1).padStart(2, '0');

  return (
    <section id="menu" className="gutter border-t-[1.5px] border-tinta bg-arena pb-[104px] pt-24" aria-label="Menú de temporada">
      <div className="mx-auto max-w-wrap">
        <div className="flex flex-wrap items-end justify-between gap-7">
          <div>
            <Reveal as="p" className="kicker">— Carta</Reveal>
            <SplitText className="font-display text-[clamp(56px,7vw,108px)] leading-[.9] tracking-[-0.02em]" partes={[{ t: 'Menú de temporada' }]} />
            <Reveal as="p" delay={0.25} className="mt-2.5 rotate-[-1.5deg] font-hand text-[30px] text-verde">
              primavera 26 · cambia con la estación
            </Reveal>
          </div>
          <Reveal delay={0.2} className="flex flex-wrap gap-2.5" role="group" aria-label="Secciones del menú">
            {menuTabs.map((t) => {
              const on = t.id === tab;
              return (
                <motion.button
                  key={t.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTab(t.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`pill transition-colors duration-300 ${on ? 'text-crema' : 'text-tinta hover:bg-crema'}`}
                >
                  {on && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-tinta" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{t.nombre}</span>
                  <span className={`relative ml-2 text-[10px] ${on ? 'text-coral' : 'text-gris'}`}>{menu[t.id].length}</span>
                </motion.button>
              );
            })}
          </Reveal>
        </div>

        <motion.div
          className="mt-14 grid min-h-[420px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-7 gap-y-8"
          onViewportEnter={() => setVisto(true)}
          viewport={{ once: true, margin: '0px 0px -120px 0px' }}
          aria-live="polite"
        >
          <AnimatePresence mode="popLayout">
            {visto &&
              items.map((item, i) => (
                <Ticket key={`${tab}-${item.nombre}`} item={item} i={i} codigo={`${prefijo}${String(i + 1).padStart(2, '0')}`} />
              ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-[1.5px] border-tinta pt-5 text-[13px]">
          <span className="text-gris">Los platos cambian según la estación. Preguntá por los del día en la barra.</span>
          <span className="up text-gris">Carta completa en el local</span>
        </Reveal>
      </div>
    </section>
  );
}
