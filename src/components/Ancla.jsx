import { scrollTo } from '../lib/scroll';

// Link interno que baja con scroll suave (Lenis).
// demora: espera unos ms antes de scrollear (ej: para que se cierre el menú del celu).
export default function Ancla({ to, children, onClick, demora = 0, ...rest }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        if (demora) setTimeout(() => scrollTo(to), demora);
        else scrollTo(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
