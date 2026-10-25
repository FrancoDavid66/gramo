import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import { WhatsApp } from './Iconos';
import { negocio, pedidosFoto, pedidosTipos } from '../data/gramo';
import { ease, viewport } from '../lib/motion';
import { linkWhatsApp } from '../lib/whatsapp';

const hoyMas = (dias) => {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
};
const lindo = (iso) => {
  if (!iso) return '—';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
};

// Valor del ticket que cambia con una animación de "impresión"
function Valor({ v }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.strong
          key={v}
          className="inline-block font-semibold"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          {v}
        </motion.strong>
      </AnimatePresence>
    </span>
  );
}

export default function Pedidos() {
  const ref = useRef(null);
  const [tipo, setTipo] = useState(pedidosTipos[0]);
  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState('');
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yFoto = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  const mensaje = useMemo(
    () =>
      [
        '¡Hola GRAMO! Quiero hacer un pedido:',
        `• ${tipo}`,
        `• Retiro: ${lindo(fecha)}`,
        personas && `• Personas: ${personas}`,
        nombre && `• A nombre de: ${nombre}`,
        nota && `• Nota: ${nota}`,
      ]
        .filter(Boolean)
        .join('\n'),
    [tipo, fecha, personas, nombre, nota],
  );

  return (
    <section id="pedidos" ref={ref} className="gutter bg-coral py-[104px] text-tinta" aria-label="Pedidos">
      <div className="mx-auto flex max-w-wrap flex-wrap items-start gap-16">
        <div className="min-w-0 flex-[1_1_440px]">
          <Reveal as="p" className="kicker text-tinta">— Pedidos</Reveal>
          <SplitText
            className="font-display text-[clamp(52px,6.4vw,98px)] leading-[.92] tracking-[-0.02em]"
            partes={[{ t: 'Tortas, cookies y mesas ' }, { t: 'enteras.', c: 'italic' }]}
          />
          <Reveal as="p" delay={0.15} className="mt-6 max-w-[42ch] text-[15px] leading-relaxed">
            Encargalo con {negocio.anticipacion} de anticipación y lo retirás por {negocio.direccion}. Para eventos, armamos la mesa completa.
          </Reveal>
          <motion.figure
            className="relative mt-9 aspect-[5/4] overflow-hidden rounded"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={viewport}
            transition={{ duration: 1.2, ease }}
          >
            <motion.img src={pedidosFoto} alt="Mesa dulce armada por GRAMO para un evento, con flores" className="h-[116%] w-full object-cover" style={{ y: yFoto }} loading="lazy" />
            <motion.span
              className="absolute bottom-4 left-4 bg-papel px-3.5 py-2.5 text-[11px] uppercase tracking-[.14em] shadow-[0_10px_20px_-12px_rgba(21,21,19,.5)]"
              initial={{ rotate: -12, opacity: 0, y: 20 }}
              whileInView={{ rotate: -2, opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.7 }}
            >
              Mesa dulce · evento privado
            </motion.span>
          </motion.figure>
        </div>

        <Reveal delay={0.1} className="min-w-0 flex-[1_1_520px]">
          <form
            className="grid gap-6 rounded bg-papel p-[clamp(22px,3vw,40px)] shadow-flota"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(linkWhatsApp(mensaje), '_blank', 'noopener');
            }}
            aria-label="Formulario de pedido"
          >
            <fieldset className="grid gap-3">
              <legend className="up mb-3 tracking-[.14em]">¿Qué querés pedir?</legend>
              <div className="flex flex-wrap gap-2.5">
                {pedidosTipos.map((t) => {
                  const on = t === tipo;
                  return (
                    <motion.button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTipo(t)}
                      whileTap={{ scale: 0.95 }}
                      className={`pill transition-colors duration-300 ${on ? 'text-crema' : 'text-tinta hover:bg-arena'}`}
                    >
                      {on && <motion.span layoutId="pedido-pill" className="absolute inset-0 rounded-full bg-tinta" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                      <span className="relative">{t}</span>
                    </motion.button>
                  );
                })}
              </div>
            </fieldset>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
              <label className="up grid gap-1">
                Fecha de retiro
                <input className="field" type="date" min={hoyMas(2)} value={fecha} onChange={(e) => setFecha(e.target.value)} />
              </label>
              <label className="up grid gap-1">
                Personas
                <input className="field" type="number" min="1" placeholder="12" value={personas} onChange={(e) => setPersonas(e.target.value)} />
              </label>
            </div>
            <label className="up grid gap-1">
              Nombre
              <input className="field" type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" />
            </label>
            <label className="up grid gap-1">
              Contanos
              <textarea className="field resize-y" rows="3" placeholder="Sabores, dedicatoria, alergias…" value={nota} onChange={(e) => setNota(e.target.value)} />
            </label>

            {/* Ticket del pedido en vivo */}
            <div className="relative border-[1.5px] border-dashed border-tinta bg-crema/60 px-[18px] py-4 text-[12px] uppercase tracking-[.1em]">
              <div className="mb-2.5 flex justify-between text-gris">
                <span>Ticket de pedido</span>
                <span>Gramo · Dorrego 2517</span>
              </div>
              <div className="grid gap-1.5">
                <div className="flex justify-between gap-4">
                  <span>Pedido</span>
                  <Valor v={tipo} />
                </div>
                <div className="flex justify-between gap-4">
                  <span>Retiro</span>
                  <Valor v={lindo(fecha)} />
                </div>
                <div className="flex justify-between gap-4">
                  <span>Personas</span>
                  <Valor v={personas || '—'} />
                </div>
                <div className="flex justify-between gap-4">
                  <span>A nombre de</span>
                  <Valor v={nombre || '—'} />
                </div>
              </div>
            </div>

            <Magnetic fuerza={0.12} className="w-full">
              <motion.button type="submit" whileTap={{ scale: 0.97 }} className="btn-tinta w-full min-h-[58px]">
                <WhatsApp className="h-5 w-5" />
                Enviar por WhatsApp
              </motion.button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
