import { useEffect, useState } from 'react';
import { motion, useAnimationControls, useSpring, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { recetas } from '../data/gramo';
import { coma, ease } from '../lib/motion';

// Balanza digital interactiva: elegís bebida y dosis, la balanza marca los gramos con un resorte
// y la taza se llena.
export default function Receta() {
  const [bebida, setBebida] = useState('espresso');
  const [dosis, setDosis] = useState(18);
  const receta = recetas.find((r) => r.id === bebida);
  const objetivo = dosis * receta.ratio;

  const peso = useSpring(objetivo, { stiffness: 90, damping: 18 });
  const pesoTexto = useTransform(peso, (v) => coma(v));
  const llenado = useTransform(peso, [0, 75], [0, 1], { clamp: true });
  const yLiquido = useTransform(llenado, (f) => 94 - f * 40);
  const plato = useAnimationControls();
  const pantalla = useAnimationControls();

  useEffect(() => {
    peso.set(objetivo);
    pantalla.start({ opacity: [1, 0.55, 1, 0.8, 1], transition: { duration: 0.35 } });
  }, [objetivo, peso, pantalla]);

  const golpe = () => plato.start({ y: [0, 7, -2, 0], transition: { duration: 0.55, ease } });

  return (
    <section id="receta" className="gutter border-t-[1.5px] border-tinta py-[104px]" aria-label="Peso por peso">
      <div className="mx-auto flex max-w-wrap flex-wrap items-center gap-16">
        <div className="min-w-0 flex-[1_1_480px]">
          <Reveal as="p" className="kicker">— Peso por peso</Reveal>
          <SplitText
            className="font-display text-[clamp(44px,5vw,72px)] leading-[.98] tracking-[-0.015em]"
            partes={[{ t: 'Un espresso son ' }, { t: '18 gramos', c: 'italic text-verde' }, { t: ' de café y 36 de bebida.' }]}
          />
          <Reveal as="p" delay={0.15} className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-gris">
            Cada receta se pesa. Cambiá la bebida y la dosis, y mirá cuánto marca la balanza.
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Tipo de bebida">
            {recetas.map((r) => {
              const on = r.id === bebida;
              return (
                <motion.button
                  key={r.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setBebida(r.id);
                    golpe();
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`pill transition-colors duration-300 ${on ? 'text-crema' : 'text-tinta hover:bg-arena'}`}
                >
                  {on && <motion.span layoutId="receta-pill" className="absolute inset-0 rounded-full bg-tinta" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{r.nombre}</span>
                </motion.button>
              );
            })}
          </Reveal>

          <Reveal delay={0.25} className="mt-9 max-w-[520px]">
            <label htmlFor="dosis" className="up flex justify-between">
              <span>Dosis de café</span>
              <span className="font-semibold">{coma(dosis)} g</span>
            </label>
            <input
              id="dosis"
              className="dosis"
              type="range"
              min="14"
              max="22"
              step="0.5"
              value={dosis}
              onChange={(e) => setDosis(parseFloat(e.target.value))}
              onPointerUp={golpe}
              onKeyUp={golpe}
            />
            <div className="flex justify-between text-[11px] text-gris" aria-hidden="true">
              <span>14 g</span>
              <span>18 g</span>
              <span>22 g</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex min-w-0 flex-[1_1_460px] justify-center">
          <div className="w-full max-w-[520px]">
            <motion.div animate={plato}>
              <div className="-mb-1.5 flex justify-center">
                <svg viewBox="0 0 120 106" className="h-[150px] w-[170px]" aria-hidden="true">
                  <defs>
                    <clipPath id="taza">
                      <path d="M29 53 L91 53 L85 89 Q60 99 35 89 Z" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#taza)">
                    <motion.rect x="20" width="80" height="60" fill="#6B4226" style={{ y: yLiquido }} />
                    <motion.rect x="20" width="80" height="3" fill="#C99A6B" style={{ y: yLiquido }} />
                  </g>
                  <path className="ink" d="M14 98 Q60 108 106 98" />
                  <path className="ink-b" d="M28 52 L92 52 L86 90 Q60 100 34 90 Z" />
                  <path className="ink" d="M91 60 C108 60 108 82 88 82" />
                  <motion.g animate={{ y: [0, -6, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}>
                    <path className="ink" d="M50 42 C44 32 56 26 50 14" />
                    <path className="ink" d="M68 42 C62 32 74 26 68 14" />
                  </motion.g>
                </svg>
              </div>
              <div className="mx-12 h-4 rounded-t-lg bg-tinta" />
            </motion.div>

            <div className="grid gap-[18px] rounded-[20px] bg-tinta p-[26px] text-crema">
              <motion.div animate={pantalla} className="flex items-end justify-between gap-4 rounded-[10px] bg-lcd px-[22px] py-[18px] text-tinta shadow-[inset_0_2px_0_rgba(0,0,0,.08)]" aria-live="polite">
                <span className="text-[11px] uppercase tracking-[.16em]">Bebida</span>
                <span className="text-[clamp(56px,6.5vw,92px)] font-medium leading-none tracking-[-0.03em] tabular-nums">
                  <motion.span>{pesoTexto}</motion.span>
                  <span className="text-[26px] tracking-normal"> g</span>
                </span>
              </motion.div>
              <div className="grid grid-cols-3 gap-3 text-[11px] uppercase tracking-[.14em]">
                <div className="grid gap-1.5">
                  <span className="text-[#B9B3A5]">Dosis</span>
                  <span className="text-[18px] normal-case tracking-normal">{coma(dosis)} g</span>
                </div>
                <div className="grid gap-1.5">
                  <span className="text-[#B9B3A5]">Ratio</span>
                  <span className="text-[18px] normal-case tracking-normal">1 : {String(receta.ratio).replace('.', ',')}</span>
                </div>
                <div className="grid gap-1.5">
                  <span className="text-[#B9B3A5]">Tiempo</span>
                  <span className="text-[18px] normal-case tracking-normal">{receta.tiempo}</span>
                </div>
              </div>
            </div>
            <p className="mr-2 mt-3.5 rotate-[-2deg] text-right font-hand text-[26px] text-verde">probalo en la barra ↑</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
