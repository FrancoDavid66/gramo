import { motion } from 'framer-motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { almacen } from '../data/gramo';
import { ease, viewport } from '../lib/motion';

// Productos en el estante: la madera se dibuja, los productos caen y la etiqueta de precio se hamaca.
function Producto({ p, i }) {
  return (
    <motion.article
      className="group grid gap-3.5"
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.2 + i * 0.12 }}
      whileHover="hover"
    >
      <div className="relative aspect-square overflow-hidden" data-cursor="llevar">
        <motion.img
          src={p.foto}
          alt={p.nombre}
          loading="lazy"
          className="h-full w-full object-cover"
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.6, ease }}
        />
        <motion.span
          className="absolute right-3 top-0 flex origin-top flex-col items-center"
          variants={{ hover: { rotate: [0, 10, -7, 4, 0] } }}
          transition={{ duration: 1.1 }}
        >
          <span className="h-5 w-px bg-tinta" />
          <span className="rounded-sm bg-papel px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[.1em] shadow">{p.precio || '$ [precio]'}</span>
        </motion.span>
      </div>
      <motion.div
        className="h-1.5 origin-left bg-tinta"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 1, ease, delay: i * 0.12 }}
      />
      <h3 className="mt-1.5 font-display text-[30px] font-normal leading-none">{p.nombre}</h3>
      <p className="up text-gris">{p.detalle}</p>
    </motion.article>
  );
}

export default function Almacen() {
  return (
    <section id="almacen" className="gutter border-t-[1.5px] border-tinta py-[104px]" aria-label="Almacén">
      <div className="mx-auto max-w-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="kicker">— Almacén</Reveal>
            <SplitText
              className="font-display text-[clamp(52px,6.4vw,98px)] leading-[.92] tracking-[-0.02em]"
              partes={[{ t: 'Llevate GRAMO ' }, { t: 'a casa.', c: 'italic text-verde' }]}
            />
          </div>
          <Reveal as="p" delay={0.15} className="m-0 max-w-[38ch] text-[15px] leading-relaxed text-gris">
            Lo que usamos en la cocina, en frascos y bolsas para llevar. Se compra en el local.
          </Reveal>
        </div>
        <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-x-8 gap-y-12">
          {almacen.map((p, i) => (
            <Producto key={p.nombre} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
