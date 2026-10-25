import { motion } from 'framer-motion';
import Logo from './Logo';
import Magnetic from './Magnetic';
import { FlechaArriba } from './Iconos';
import { negocio } from '../data/gramo';
import { ease } from '../lib/motion';
import { scrollTo } from '../lib/scroll';

export default function Footer() {
  const letras = 'GRAMO'.split('');
  return (
    <footer className="gutter overflow-hidden bg-tinta pb-8 pt-20 text-crema">
      <div className="mx-auto max-w-wrap">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <Logo modo="vista" className="h-[150px] w-[150px] text-crema" />
          <motion.p
            className="m-0 max-w-[18ch] font-display text-[clamp(32px,3.6vw,52px)] leading-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            Café de especialidad, cocina de temporada <em className="text-coral">y la medida justa.</em>
          </motion.p>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-crema/30 pt-5 text-[12px] uppercase tracking-[.1em]">
          <span>{negocio.direccion} · CABA</span>
          <span>Mar a vie 8.30–19.30 · Sáb 9–19.30 · Dom 9–19 · Lun cerrado</span>
          <a href={negocio.instagram} target="_blank" rel="noopener noreferrer" className="text-crema hover:text-coral">
            {negocio.instagramUsuario}
          </a>
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-crema transition-colors hover:bg-crema hover:text-tinta"
              aria-label="Volver arriba"
            >
              <FlechaArriba />
            </button>
          </Magnetic>
        </div>

        <motion.div
          className="mt-10 flex select-none justify-between font-display text-[clamp(96px,24vw,360px)] leading-[.8] text-crema/[.07]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          aria-hidden="true"
        >
          {letras.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={{ hidden: { y: '100%' }, show: { y: '0%', transition: { duration: 1.1, ease } } }}>
                {l}
              </motion.span>
            </span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
