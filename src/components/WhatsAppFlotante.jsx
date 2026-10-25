import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { WhatsApp } from './Iconos';
import { linkWhatsApp } from '../lib/whatsapp';

// Botón flotante de WhatsApp: aparece después del inicio y a los segundos muestra un globito.
export default function WhatsAppFlotante() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [globo, setGlobo] = useState(false);
  const [cerrado, setCerrado] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 650));

  useEffect(() => {
    if (!visible || cerrado) return;
    const a = setTimeout(() => setGlobo(true), 2500);
    const b = setTimeout(() => setGlobo(false), 9000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [visible, cerrado]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 right-5 z-[60] flex items-end gap-3"
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <AnimatePresence>
            {globo && (
              <motion.div
                className="relative mb-2 max-w-[220px] rounded-2xl rounded-br-sm bg-papel px-4 py-3 text-[13px] leading-snug shadow-flota"
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setGlobo(false);
                    setCerrado(true);
                  }}
                  className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-tinta text-[11px] text-crema"
                  aria-label="Cerrar mensaje"
                >
                  ✕
                </button>
                ¿Te armamos un pedido o una mesa para tu evento? <span className="font-hand text-lg text-verde">escribinos</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={linkWhatsApp('¡Hola GRAMO! Quería consultarles…')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-flota"
            whileHover={{ scale: 1.08, rotate: -8 }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
            <WhatsApp className="relative h-8 w-8" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
