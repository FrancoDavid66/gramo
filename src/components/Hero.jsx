import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useScroll, useSpring, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import Magnetic from './Magnetic';
import Ancla from './Ancla';
import { Flecha } from './Iconos';
import { PESA_ASA, PESA_CUERPO } from './Logo';
import { ease } from '../lib/motion';
import { useEstado } from '../lib/horario';
import { negocio } from '../data/gramo';

// Rectángulo invisible centrado en el pivote de la balanza (300, 244):
// así Framer rota la viga justo desde el eje.
const Pivote = () => <rect x="40" y="44" width="520" height="400" fill="none" stroke="none" />;

export default function Hero({ listo }) {
  const ref = useRef(null);
  const estado = useEstado();
  const viga = useAnimationControls();
  const inclinacion = useSpring(0, { stiffness: 70, damping: 11 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yTexto = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yArte = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const escalaArte = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const pesar = () =>
    viga.start({ rotate: [0, -6, 4, -2, 0.8, 0], transition: { duration: 2.6, ease: 'easeInOut' } });

  useEffect(() => {
    if (!listo) return;
    const t = setTimeout(pesar, 2300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listo]);

  const trazo = (delay, dur = 1.3) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: listo ? { pathLength: 1, opacity: 1 } : {},
    transition: { pathLength: { duration: dur, ease, delay }, opacity: { duration: 0.01, delay } },
  });
  const aparece = (delay) => ({
    initial: { opacity: 0, y: 8 },
    animate: listo ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease, delay },
  });

  const moverMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    inclinacion.set(((e.clientX - r.left) / r.width - 0.5) * 8);
  };

  return (
    <section ref={ref} className="gutter pb-24 pt-10" aria-label="Inicio">
      <div className="mx-auto flex max-w-wrap flex-wrap items-stretch gap-10">
        {/* Texto */}
        <motion.div style={{ y: yTexto }} className="flex min-w-0 flex-[1_1_520px] flex-col justify-between gap-11 pt-8">
          <div>
            <motion.p {...aparece(0.1)} className="kicker mb-7">
              Café de especialidad · Cookies · Cocina de temporada
            </motion.p>
            <SplitText
              as="h1"
              listo={listo}
              delay={0.15}
              stagger={0.09}
              className="font-display text-[clamp(68px,9.4vw,156px)] font-normal leading-[.86] tracking-[-0.025em]"
              partes={[{ t: 'La medida' }, { br: true }, { t: 'justa.', c: 'italic text-verde' }]}
            />
            <motion.p {...aparece(0.7)} className="mt-8 max-w-[30ch] font-display text-[clamp(22px,2vw,27px)] leading-[1.3]">
              Pesamos el café al gramo y cocinamos con lo que da la estación. Desayunos, brunch, cookies, cenas con velas y un almacén para llevarte un poco a casa.
            </motion.p>
          </div>

          <motion.div {...aparece(0.9)} className="flex flex-wrap gap-3">
            <Magnetic>
              <Ancla to="#menu" className="btn-tinta group">
                Ver el menú de temporada
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Flecha />
                </span>
              </Ancla>
            </Magnetic>
            <Magnetic>
              <Ancla to="#cenas" className="btn-linea">
                Reservar una cena
              </Ancla>
            </Magnetic>
          </motion.div>

          <motion.div {...aparece(1.05)} className="flex flex-wrap items-center gap-x-7 gap-y-3.5 border-t-[1.5px] border-tinta pt-5 text-[13px]">
            <span className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-tinta px-4 py-2 text-[12px] uppercase tracking-[.1em]">
              <span className="relative flex h-2.5 w-2.5">
                {estado.abierto && <span className="absolute inset-0 animate-ping rounded-full bg-[#2E9E5B] opacity-70" />}
                <span className={`relative h-2.5 w-2.5 rounded-full ${estado.abierto ? 'bg-[#2E9E5B]' : 'bg-coral'}`} />
              </span>
              {estado.texto}
            </span>
            <span>{negocio.direccion}, CABA</span>
            <span className="text-gris">Martes a domingo</span>
          </motion.div>
        </motion.div>

        {/* Balanza */}
        <motion.div
          style={{ y: yArte, scale: escalaArte }}
          initial={{ clipPath: 'inset(100% 0 0 0 round 6px)' }}
          animate={listo ? { clipPath: 'inset(0% 0 0 0 round 6px)' } : {}}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
          onPointerMove={moverMouse}
          onPointerLeave={() => inclinacion.set(0)}
          className="relative flex min-h-[440px] min-w-0 flex-[1_1_560px] items-center justify-center overflow-hidden rounded-md bg-verde px-8 py-[72px] text-crema md:min-h-[620px]"
          data-cursor="pesá"
        >
          <span className="absolute left-6 top-[22px] text-[11px] uppercase tracking-[.18em]">Balanza N.º 01</span>
          <span className="absolute right-6 top-[22px] text-[11px] uppercase tracking-[.18em]">Tara 0,0 g</span>

          <svg viewBox="0 0 600 450" className="h-auto w-full max-w-[640px] overflow-visible" aria-hidden="true">
            <motion.path className="ink" d="M50 404 C200 400 400 406 550 403" {...trazo(0.5)} />
            <motion.path className="ink" d="M206 404 C212 370 220 344 232 330 L368 330 C380 344 388 370 394 404" {...trazo(0.6)} />
            <motion.path className="ink" d="M300 330 L300 252" {...trazo(0.9, 0.6)} />

            <motion.g style={{ rotate: inclinacion }}>
              <Pivote />
              <motion.g animate={viga}>
                <Pivote />
                <motion.path className="ink" d="M108 244 C200 242 400 246 492 244" {...trazo(1.0)} />
                <motion.path className="ink" d="M150 244 L150 214" {...trazo(1.3, 0.4)} />
                <motion.path className="ink" d="M450 244 L450 214" {...trazo(1.3, 0.4)} />
                <motion.path className="ink" d="M70 212 C110 228 190 228 230 212 Z" {...trazo(1.4, 0.9)} />
                <motion.path className="ink" d="M370 212 C410 228 490 228 530 212 Z" {...trazo(1.4, 0.9)} />
                <g transform="translate(96 113) scale(0.9)">
                  <motion.path className="ink-b" d={PESA_CUERPO} {...trazo(1.6, 1.1)} />
                  <motion.path className="ink-b" d={PESA_ASA} {...trazo(2.0, 0.6)} />
                  <motion.text x="60" y="86" transform="rotate(-6 60 80)" className="logo-t" {...aparece(2.3)}>
                    GRAMO
                  </motion.text>
                </g>
                <motion.path className="ink" d="M396 208 C430 217 470 217 504 208" {...trazo(1.7, 0.6)} />
                <motion.path className="ink-b" d="M414 146 L486 146 L479 196 C470 206 430 206 421 196 Z" {...trazo(1.8, 1)} />
                <motion.path className="ink" d="M484 158 C506 158 506 186 480 186" {...trazo(2.1, 0.5)} />
                <motion.g
                  animate={listo ? { y: [0, -7, 0], opacity: [1, 0.35, 1] } : {}}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                >
                  <motion.path className="ink" d="M436 132 C428 118 446 110 438 94" {...trazo(2.3, 0.6)} />
                  <motion.path className="ink" d="M462 132 C454 118 472 110 464 94" {...trazo(2.4, 0.6)} />
                </motion.g>
              </motion.g>
            </motion.g>
            <motion.circle className="ink" cx="300" cy="244" r="8" {...trazo(1.0, 0.5)} />

            <motion.text className="note-t" x="18" y="82" {...aparece(2.5)}>
              18 g de café
            </motion.text>
            <motion.path className="ink" d="M70 94 C82 106 94 116 110 122 M100 125 L110 122 L105 113" {...trazo(2.6, 0.6)} />
            <motion.text className="note-t" x="512" y="62" textAnchor="middle" {...aparece(2.7)}>
              36 g de bebida
            </motion.text>
            <motion.path className="ink" d="M510 74 C508 92 500 108 490 120 M486 110 L490 120 L499 115" {...trazo(2.8, 0.6)} />
            <motion.text className="note-t" x="300" y="444" textAnchor="middle" {...aparece(3)}>
              = la medida justa
            </motion.text>
          </svg>

          {/* Sello giratorio */}
          <motion.div
            className="absolute bottom-5 left-5 hidden h-[118px] w-[118px] sm:block"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={listo ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2.6, type: 'spring', stiffness: 160, damping: 14 }}
            aria-hidden="true"
          >
            <motion.svg viewBox="0 0 120 120" className="h-full w-full" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
              <defs>
                <path id="circulo" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text className="fill-crema font-mono text-[10.5px] uppercase tracking-[.3em]">
                <textPath href="#circulo">Dorrego 2517 · Café · Cookies · Cocina ·</textPath>
              </text>
            </motion.svg>
            <svg viewBox="0 0 120 120" className="absolute inset-0 m-auto h-11 w-11 text-crema">
              <path className="ink-b" d={PESA_CUERPO} />
              <path className="ink-b" d={PESA_ASA} />
            </svg>
          </motion.div>

          <motion.button
            type="button"
            onClick={pesar}
            whileTap={{ scale: 0.94 }}
            className="absolute bottom-4 right-[18px] min-h-[44px] rounded-full border-[1.5px] border-crema/60 px-4 font-mono text-[11px] uppercase tracking-[.14em] text-crema transition-colors hover:bg-crema hover:text-verde"
          >
            Volver a pesar ↻
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
