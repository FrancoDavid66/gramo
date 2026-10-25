import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Marquesina from './components/Marquesina';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tira from './components/Tira';
import Receta from './components/Receta';
import Menu from './components/Menu';
import Cine from './components/Cine';
import Cenas from './components/Cenas';
import Pedidos from './components/Pedidos';
import Almacen from './components/Almacen';
import Ustedes from './components/Ustedes';
import Visitanos from './components/Visitanos';
import Footer from './components/Footer';
import WhatsAppFlotante from './components/WhatsAppFlotante';
import { initLenis, lockScroll } from './lib/scroll';

export default function App() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const destruir = initLenis();
    return () => destruir?.();
  }, []);

  useEffect(() => {
    lockScroll(cargando);
  }, [cargando]);

  const terminar = useCallback(() => setCargando(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{cargando && <Loader key="loader" alTerminar={terminar} />}</AnimatePresence>
      <Cursor />
      <div id="top">
        <Marquesina />
        <Navbar />
        <main>
          <Hero listo={!cargando} />
          <Tira />
          <Receta />
          <Menu />
          <Cine />
          <Cenas />
          <Pedidos />
          <Almacen />
          <Ustedes />
          <Visitanos />
        </main>
        <Footer />
      </div>
      <WhatsAppFlotante />
    </MotionConfig>
  );
}
