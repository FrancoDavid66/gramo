import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoAuto from './VideoAuto';
import { cine, cineRespaldo } from '../data/gramo';

// Sección "cine": el video crece y se endereza a medida que bajás,
// y aparecen las tres frases de la receta.
function Frase({ progreso, rango, children, className = '' }) {
  const opacity = useTransform(progreso, rango, [0, 1]);
  const y = useTransform(progreso, rango, [50, 0]);
  const blur = useTransform(progreso, rango, ['blur(8px)', 'blur(0px)']);
  return (
    <motion.p style={{ opacity, y, filter: blur }} className={className}>
      {children}
    </motion.p>
  );
}

export default function Cine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const escala = useTransform(scrollYProgress, [0, 0.45], [0.6, 1]);
  const giro = useTransform(scrollYProgress, [0, 0.45], [-6, 0]);
  const radio = useTransform(scrollYProgress, [0, 0.45], [36, 8]);
  const pista = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const barra = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-tinta text-crema" aria-label="Así se hace un café en GRAMO">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <p className="kicker gutter absolute left-0 top-8 text-crema-soft">— Así se hace un café en GRAMO</p>

        <div className="grid w-full max-w-[1440px] grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-12 md:px-12">
          <div className="hidden flex-col items-end gap-2 text-right md:flex">
            <Frase progreso={scrollYProgress} rango={[0.28, 0.4]} className="font-display text-[clamp(48px,6vw,104px)] leading-[.95]">
              18 gramos.
            </Frase>
            <Frase progreso={scrollYProgress} rango={[0.44, 0.56]} className="font-display text-[clamp(48px,6vw,104px)] italic leading-[.95] text-coral">
              28 segundos.
            </Frase>
          </div>

          <motion.div
            style={{ scale: escala, rotate: giro, borderRadius: radio }}
            className="relative mx-auto aspect-[9/16] h-[min(86vh,150vw)] overflow-hidden bg-noche shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]"
          >
            {cine ? (
              <VideoAuto src={cine.src} poster={cine.poster} className="h-full w-full object-cover" alt="Barista haciendo latte art en GRAMO" />
            ) : (
              <img src={cineRespaldo} alt="Matcha con frutos rojos en GRAMO" className="h-full w-full object-cover" />
            )}
            {/* En el celu las frases van encima del video */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-tinta/90 to-transparent p-6 pt-24 md:hidden">
              <Frase progreso={scrollYProgress} rango={[0.28, 0.4]} className="font-display text-[44px] leading-none">
                18 gramos.
              </Frase>
              <Frase progreso={scrollYProgress} rango={[0.44, 0.56]} className="font-display text-[44px] italic leading-none text-coral">
                28 segundos.
              </Frase>
              <Frase progreso={scrollYProgress} rango={[0.6, 0.72]} className="font-display text-[44px] leading-none">
                Ni uno más.
              </Frase>
            </div>
          </motion.div>

          <div className="hidden flex-col items-start gap-5 md:flex">
            <Frase progreso={scrollYProgress} rango={[0.6, 0.72]} className="font-display text-[clamp(48px,6vw,104px)] leading-[.95]">
              Ni uno más.
            </Frase>
            <Frase progreso={scrollYProgress} rango={[0.72, 0.84]} className="max-w-[30ch] text-[14px] leading-relaxed text-crema-soft">
              Pesamos la dosis, pesamos la bebida y medimos el tiempo. Así sale igual de rico el primero y el último del día.
            </Frase>
          </div>
        </div>

        <motion.p style={{ opacity: pista }} className="absolute bottom-8 font-hand text-2xl text-crema-soft">
          seguí bajando ↓
        </motion.p>
        <motion.div style={{ scaleX: barra }} className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-coral" />
      </div>
    </section>
  );
}
