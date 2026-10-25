import { useRef } from 'react';
import { motion } from 'framer-motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import { Flecha, Instagram } from './Iconos';
import { PESA_ASA, PESA_CUERPO } from './Logo';
import { fotoLocal, horariosTabla, negocio } from '../data/gramo';
import { useEstado } from '../lib/horario';
import { ease, viewport } from '../lib/motion';

const calle = (d, i) => ({
  d,
  className: 'ink',
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true },
  transition: { duration: 1.6, ease, delay: 0.2 + i * 0.12 },
});

export default function Visitanos() {
  const mapa = useRef(null);
  const estado = useEstado();

  return (
    <section id="visitanos" className="gutter border-t-[1.5px] border-tinta py-[104px]" aria-label="Visitanos">
      <div className="mx-auto flex max-w-wrap flex-wrap items-stretch gap-16">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-7">
          <div>
            <Reveal as="p" className="kicker">— Visitanos</Reveal>
            <SplitText
              className="font-display text-[clamp(72px,10vw,150px)] leading-[.84] tracking-[-0.03em]"
              stagger={0.1}
              partes={[{ t: negocio.direccion.split(' ')[0] }, { br: true }, { t: negocio.direccion.split(' ').slice(1).join(' '), c: 'italic text-verde' }]}
            />
            <Reveal as="p" delay={0.2} className="up mt-[18px] text-[13px]">
              {negocio.ciudad}
            </Reveal>
          </div>

          <Reveal delay={0.25} className="self-start">
            <span className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-tinta px-4 py-2 text-[12px] uppercase tracking-[.1em]">
              <span className="relative flex h-2.5 w-2.5">
                {estado.abierto && <span className="absolute inset-0 animate-ping rounded-full bg-[#2E9E5B] opacity-70" />}
                <span className={`relative h-2.5 w-2.5 rounded-full ${estado.abierto ? 'bg-[#2E9E5B]' : 'bg-coral'}`} />
              </span>
              {estado.texto}
            </span>
          </Reveal>

          <table className="w-full border-collapse text-[14px]">
            <caption className="pb-2.5 text-left text-[12px] uppercase tracking-[.14em] text-gris">Horarios</caption>
            <tbody>
              {horariosTabla.map((h, i) => {
                const hoy = h.nums.includes(estado.dia);
                return (
                  <motion.tr
                    key={h.dias}
                    className={`border-t-[1.5px] border-tinta last:border-b-[1.5px] ${hoy ? 'bg-tinta text-crema' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.08 }}
                  >
                    <th scope="row" className="px-3 py-3.5 text-left font-medium">
                      {h.dias}
                      {hoy && (
                        <motion.span
                          className="ml-2 inline-block text-[11px] tracking-[.14em] text-coral"
                          animate={{ opacity: [1, 0.35, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        >
                          HOY
                        </motion.span>
                      )}
                    </th>
                    <td className="px-3 py-3.5 text-right">{h.horas}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>

          <Reveal delay={0.2} className="flex flex-wrap gap-3">
            <Magnetic>
              <a href={negocio.maps} target="_blank" rel="noopener noreferrer" className="btn-tinta group">
                Cómo llegar
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Flecha />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={negocio.instagram} target="_blank" rel="noopener noreferrer" className="btn-linea">
                <Instagram className="h-[18px] w-[18px]" /> Instagram
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/* Mapa dibujado */}
        <Reveal delay={0.15} className="min-w-0 flex-[1_1_520px]">
          <div ref={mapa} className="relative h-full min-h-[460px] overflow-hidden rounded-md border-[1.5px] border-tinta bg-papel">
            <svg viewBox="0 0 560 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-tinta" aria-hidden="true">
              <motion.path
                d="M-20 252 C140 246 300 256 580 248"
                fill="none"
                stroke="#EAE3D3"
                strokeWidth="38"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease }}
              />
              <motion.path {...calle('M-20 233 C140 227 300 237 580 229', 0)} />
              <motion.path {...calle('M-20 271 C140 265 300 275 580 267', 1)} />
              <motion.path {...calle('M120 -10 L130 233 M132 271 L140 490', 2)} />
              <motion.path {...calle('M300 -10 L298 234 M297 272 L294 490', 3)} />
              <motion.path {...calle('M470 -10 L476 230 M477 268 L482 490', 4)} />
              <motion.path {...calle('M-20 92 L120 95 M130 95 L300 98 M300 98 L472 100 M476 100 L580 102', 5)} />
              <motion.path {...calle('M-20 400 L132 398 M140 398 L295 395 M295 395 L480 392 M482 392 L580 390', 6)} />
              <motion.text
                x="228"
                y="257"
                className="fill-tinta font-mono text-[13px] tracking-[.3em]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                DORREGO
              </motion.text>
              {/* Pin: la pesa cae y rebota */}
              <motion.g
                initial={{ y: -140, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 11, delay: 1.3 }}
              >
                <motion.ellipse
                  cx="385"
                  cy="232"
                  rx="30"
                  ry="6"
                  fill="#FF8A5B"
                  initial={{ opacity: 0.5, scale: 0.6 }}
                  animate={{ opacity: [0.5, 0, 0.5], scale: [0.6, 1.8, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 2.5 }}
                />
                <g transform="translate(355 168) scale(0.58)">
                  <path d={PESA_CUERPO} fill="#FF8A5B" stroke="#151513" strokeWidth="3.4" strokeLinejoin="round" />
                  <path className="ink-b" d={PESA_ASA} />
                </g>
              </motion.g>
              <motion.text
                className="note-t"
                x="300"
                y="136"
                textAnchor="middle"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.8 }}
              >
                acá estamos
              </motion.text>
              <motion.path {...calle('M330 146 C344 152 352 160 356 172 M349 167 L356 172 L359 164', 9)} transition={{ duration: 0.6, delay: 2 }} />
            </svg>

            {/* Polaroid que se puede arrastrar */}
            <motion.figure
              drag
              dragConstraints={mapa}
              dragElastic={0.15}
              whileDrag={{ scale: 1.06, rotate: 0, cursor: 'grabbing' }}
              initial={{ rotate: -10, opacity: 0, y: 30 }}
              whileInView={{ rotate: -4, opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.5 }}
              className="absolute left-[18px] top-[18px] z-10 m-0 w-[min(36%,220px)] touch-none bg-papel p-2 pb-[34px] shadow-[0_18px_30px_-18px_rgba(21,21,19,.5)]"
              data-cursor="arrastrá"
            >
              <img src={fotoLocal} alt="El salón de GRAMO con la estantería del almacén" className="pointer-events-none aspect-[4/5] w-full object-cover" draggable="false" />
              <figcaption className="absolute inset-x-0 bottom-1 text-center font-hand text-[22px]">el local</figcaption>
            </motion.figure>

            <span className="absolute bottom-3.5 left-[18px] bg-papel px-2 py-1 text-[11px] uppercase tracking-[.16em]">Mapa ilustrativo · N ↑</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
