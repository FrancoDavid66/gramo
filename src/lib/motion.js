// Curvas y variantes compartidas de Framer Motion
export const ease = [0.22, 1, 0.36, 1];
export const easeInOut = [0.76, 0, 0.24, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const stagger = (s = 0.08, d = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

export const viewport = { once: true, margin: '0px 0px -80px 0px' };

export const coma = (v, dec = 1) => Number(v).toFixed(dec).replace('.', ',');
