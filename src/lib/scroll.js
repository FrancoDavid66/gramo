import Lenis from 'lenis';

let lenis = null;

// Scroll suave con Lenis (se desactiva solo si la persona pidió menos movimiento)
export function initLenis() {
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  let id;
  const raf = (time) => {
    lenis.raf(time);
    id = requestAnimationFrame(raf);
  };
  id = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(id);
    lenis.destroy();
    lenis = null;
  };
}

export const getLenis = () => lenis;

export function scrollTo(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el && target !== 0) return;
  if (lenis) lenis.scrollTo(target === 0 ? 0 : el, { offset: target === 0 ? 0 : -24, duration: 1.4 });
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function lockScroll(lock) {
  if (lenis) (lock ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}
