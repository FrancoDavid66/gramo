import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import Logo from './Logo';
import Ancla from './Ancla';
import Magnetic from './Magnetic';
import { ease, easeInOut } from '../lib/motion';
import { lockScroll } from '../lib/scroll';
import { negocio } from '../data/gramo';

const links = [
  { to: '#menu', label: 'Menú' },
  { to: '#cenas', label: 'Cenas' },
  { to: '#pedidos', label: 'Pedidos' },
  { to: '#almacen', label: 'Almacén' },
  { to: '#visitanos', label: 'Visitanos' },
];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const [oculto, setOculto] = useState(false);
  const [chico, setChico] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(null);

  // Se esconde al bajar y vuelve al subir
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setOculto(v > prev && v > 420 && !abierto);
    setChico(v > 40);
  });

  // Marca la sección en la que estás
  useEffect(() => {
    const secciones = links.map((l) => document.querySelector(l.to)).filter(Boolean);
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          const id = `#${e.target.id}`;
          if (e.isIntersecting) setActivo(id);
          else setActivo((a) => (a === id ? null : a));
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    secciones.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(abierto);
  }, [abierto]);

  return (
    <>
      <motion.header
        className={`gutter sticky top-0 z-50 border-b-[1.5px] transition-colors duration-500 ${
          abierto ? 'border-transparent bg-transparent text-crema' : 'border-tinta bg-crema/85 text-tinta backdrop-blur-md'
        }`}
        animate={{ y: oculto ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease }}
      >
        <motion.div
          className="mx-auto flex max-w-wrap items-center justify-between gap-6"
          animate={{ paddingTop: chico ? 6 : 12, paddingBottom: chico ? 6 : 12 }}
          transition={{ duration: 0.35, ease }}
        >
          <Ancla to="#top" demora={abierto ? 120 : 0} aria-label="GRAMO, volver al inicio" onClick={() => setAbierto(false)} className="group flex text-current">
            <motion.div animate={{ width: chico ? 48 : 62, height: chico ? 48 : 62 }} transition={{ duration: 0.35, ease }} whileHover={{ rotate: -8 }}>
              <Logo className="h-full w-full" />
            </motion.div>
          </Ancla>

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Ancla key={l.to} to={l.to} className="relative px-3.5 py-2 font-mono text-[13px] uppercase tracking-[.1em] text-tinta">
                {activo === l.to && (
                  <motion.span layoutId="nav-activo" className="absolute inset-0 rounded-full bg-arena" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{l.label}</span>
              </Ancla>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-block">
              <Ancla to="#pedidos" className="btn-tinta min-h-[46px] px-5 text-[12px] tracking-[.12em]">
                Hacer un pedido
              </Ancla>
            </Magnetic>
            <button
              type="button"
              className="relative flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-current md:hidden"
              aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={abierto}
              onClick={() => setAbierto((a) => !a)}
            >
              <motion.span className="absolute h-[1.5px] w-5 bg-current" animate={abierto ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} />
              <motion.span className="absolute h-[1.5px] w-5 bg-current" animate={abierto ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} />
            </button>
          </div>
        </motion.div>
        <motion.div className="absolute bottom-[-1.5px] left-0 right-0 h-[3px] origin-left bg-coral" style={{ scaleX: progreso }} />
      </motion.header>

      {/* Menú del celu */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-verde px-6 pb-10 pt-36 text-crema md:hidden"
            initial={{ clipPath: 'circle(0% at 88% 6%)' }}
            animate={{ clipPath: 'circle(150% at 88% 6%)' }}
            exit={{ clipPath: 'circle(0% at 88% 6%)' }}
            transition={{ duration: 0.8, ease: easeInOut }}
          >
            <motion.nav
              aria-label="Menú del celular"
              className="flex flex-col gap-2"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
            >
              {links.map((l, i) => (
                <div key={l.to} className="overflow-hidden">
                  <motion.div variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.8, ease } } }}>
                    <Ancla to={l.to} demora={120} onClick={() => setAbierto(false)} className="flex items-baseline gap-4 font-display text-[56px] leading-[1.05] text-crema">
                      <span className="font-mono text-[12px] tracking-[.14em] text-coral">0{i + 1}</span>
                      {l.label}
                    </Ancla>
                  </motion.div>
                </div>
              ))}
            </motion.nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }} exit={{ opacity: 0 }} className="flex flex-col gap-2 font-mono text-[13px] uppercase tracking-[.12em]">
              <span>{negocio.direccion} · CABA</span>
              <a href={negocio.instagram} target="_blank" rel="noopener noreferrer" className="text-crema underline underline-offset-4">
                {negocio.instagramUsuario}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
