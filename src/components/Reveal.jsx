import { motion } from 'framer-motion';
import { ease, viewport } from '../lib/motion';

// Aparece suave desde abajo cuando entra en pantalla
export default function Reveal({ as = 'div', delay = 0, y = 28, x = 0, className = '', children, ...rest }) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}
