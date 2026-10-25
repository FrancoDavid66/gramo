import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ease, viewport } from '../lib/motion';

// Título que sube palabra por palabra desde una máscara.
// partes: [{ t: 'Un espresso son ' }, { t: '18 gramos', c: 'italic text-verde' }, …]
// listo: si se pasa, anima cuando es true (para el hero); si no, cuando entra en pantalla.
export default function SplitText({ as = 'h2', partes, className = '', delay = 0, stagger = 0.055, listo }) {
  const Tag = motion[as] ?? motion.h2;
  const palabras = partes.flatMap((p) =>
    p.br ? [{ br: true }] : p.t.split(' ').filter(Boolean).map((w) => ({ w, c: p.c })),
  );
  const disparo =
    listo === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport }
      : { initial: 'hidden', animate: listo ? 'show' : 'hidden' };

  return (
    <Tag
      className={className}
      aria-label={partes.map((p) => (p.br ? ' ' : p.t)).join('')}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...disparo}
    >
      {palabras.map((x, i) =>
        x.br ? (
          <br key={i} />
        ) : (
          <Fragment key={i}>
            <span aria-hidden="true" className="-mb-[0.1em] -mr-[0.12em] inline-block overflow-hidden pb-[0.1em] pr-[0.12em] align-bottom">
              <motion.span
                className={`inline-block ${x.c ?? ''}`}
                variants={{
                  hidden: { y: '115%', rotate: 5 },
                  show: { y: '0%', rotate: 0, transition: { duration: 1.05, ease } },
                }}
              >
                {x.w}
              </motion.span>
            </span>{' '}
          </Fragment>
        ),
      )}
    </Tag>
  );
}
