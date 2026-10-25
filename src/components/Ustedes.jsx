import { motion } from 'framer-motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import { Instagram } from './Iconos';
import { negocio, ustedes } from '../data/gramo';
import { ease, viewport } from '../lib/motion';

const giros = [-4, 3, -2, 4, -3, 2];

export default function Ustedes() {
  return (
    <section className="gutter border-t-[1.5px] border-tinta bg-arena py-[104px]" aria-label="Ustedes en GRAMO">
      <div className="mx-auto max-w-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="kicker">— Ustedes</Reveal>
            <SplitText className="max-w-[16ch] font-display text-[clamp(44px,5.4vw,84px)] leading-[.95] tracking-[-0.02em]" partes={[{ t: 'Lo mejor de GRAMO no entra en una balanza.' }]} />
          </div>
          <Reveal delay={0.15}>
            <Magnetic>
              <a href={negocio.instagram} target="_blank" rel="noopener noreferrer" className="btn-linea">
                <Instagram className="h-[18px] w-[18px]" /> Etiquetanos en {negocio.instagramUsuario}
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5">
          {ustedes.map((u, i) => (
            <motion.a
              key={i}
              href={u.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded"
              initial={{ opacity: 0, y: 40, rotate: giros[i] }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={viewport}
              transition={{ duration: 0.9, ease, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              data-cursor="ver en IG"
            >
              <img src={u.foto} alt={u.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-suave group-hover:scale-[1.07]" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-tinta/75 to-transparent p-3.5 pt-10 text-[11px] uppercase tracking-[.14em] text-crema opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                Ver en Instagram ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
