import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import Ancla from './Ancla';
import VideoAuto from './VideoAuto';
import { Flecha } from './Iconos';
import { cenas } from '../data/gramo';
import { ease, viewport } from '../lib/motion';
import { linkWhatsApp } from '../lib/whatsapp';

function Fila({ fecha, nombre, detalle, cta, href, i, coral = true }) {
  return (
    <motion.li
      className="group relative flex flex-wrap items-center gap-x-7 gap-y-3.5 overflow-hidden border-b border-crema/35 py-[22px]"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease, delay: i * 0.1 }}
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-crema/[.06] transition-transform duration-500 ease-suave group-hover:scale-x-100" />
      <span className="relative min-w-[110px] text-[13px] uppercase tracking-[.12em]">{fecha}</span>
      <span className="relative grid flex-[1_1_220px] gap-1 transition-transform duration-500 ease-suave group-hover:translate-x-2">
        <span className="font-display text-[28px] leading-[1.05]">{nombre}</span>
        <span className="text-[12px] uppercase tracking-[.08em] text-crema-soft">{detalle}</span>
      </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`relative ${coral ? 'btn-coral' : 'btn-crema'}`}>
          {cta}
        </a>
      ) : (
        <Ancla to="#pedidos" className={`relative ${coral ? 'btn-coral' : 'btn-crema'}`}>
          {cta}
        </Ancla>
      )}
    </motion.li>
  );
}

export default function Cenas() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yFoto = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const yChica = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const giroChica = useTransform(scrollYProgress, [0, 1], [-8, 2]);

  return (
    <section id="cenas" ref={ref} className="gutter bg-noche py-[104px] text-crema" aria-label="Cenas y eventos">
      <div className="mx-auto flex max-w-wrap flex-wrap items-center gap-16">
        <div className="min-w-0 flex-[1_1_540px]">
          <Reveal as="p" className="kicker text-coral">— Cenas &amp; eventos</Reveal>
          <SplitText
            className="font-display text-[clamp(52px,6.4vw,98px)] leading-[.92] tracking-[-0.02em]"
            partes={[{ t: 'Cuando baja el sol, ' }, { t: 'prendemos las velas.', c: 'italic text-coral' }]}
          />
          <Reveal as="p" delay={0.15} className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-crema-soft">
            Cenas de pasos en mesa larga, con cupos chicos. Las anunciamos acá y en Instagram: el que reserva primero, se sienta.
          </Reveal>
          <ul className="mt-10 border-t border-crema/35">
            {cenas.proximas.map((c, i) => (
              <Fila key={i} i={i} fecha={c.fecha} nombre={c.nombre} detalle={c.detalle} cta="Reservar" href={linkWhatsApp(`Hola GRAMO! Quiero reservar para ${c.nombre} (${c.fecha}).`)} />
            ))}
            <Fila i={2} fecha="A medida" nombre="Eventos privados y catering" detalle="Cumpleaños, lanzamientos, equipos" cta="Consultar" coral={false} />
          </ul>
        </div>

        <div className="relative mb-10 min-w-0 flex-[1_1_440px]">
          <motion.figure
            className="relative aspect-[4/5] overflow-hidden rounded-md"
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 6px)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 6px)', opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 1.3, ease }}
            data-cursor="velas"
          >
            <motion.img src={cenas.fotoPrincipal} alt="Cena con velas en GRAMO, mesa larga con mantel blanco" className="h-[116%] w-full object-cover" style={{ y: yFoto }} />
          </motion.figure>
          <motion.figure
            style={{ y: yChica, rotate: giroChica }}
            className="absolute -bottom-10 -left-2 aspect-[4/5] w-[44%] overflow-hidden rounded border-[6px] border-noche shadow-[0_24px_40px_-20px_rgba(0,0,0,.6)] md:-left-7"
            whileHover={{ scale: 1.05, rotate: 0 }}
          >
            {cenas.video ? (
              <VideoAuto src={cenas.video.src} poster={cenas.video.poster} className="h-full w-full object-cover" alt="El local de GRAMO" />
            ) : (
              <img src={cenas.fotoChica} alt="Mesa de bocados para un evento de GRAMO" className="h-full w-full object-cover" loading="lazy" />
            )}
          </motion.figure>
          <motion.p
            className="absolute -top-12 right-2 m-0 font-hand text-[32px] text-coral"
            initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 3, scale: 1 }}
            viewport={viewport}
            transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.6 }}
          >
            ¡reservá con tiempo! <Flecha className="inline h-5 w-5 rotate-90" />
          </motion.p>
        </div>
      </div>
    </section>
  );
}
