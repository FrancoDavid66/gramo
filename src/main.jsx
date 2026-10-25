import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Tipografías autoalojadas (solo latin: liviano y con tildes y ñ)
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import '@fontsource/caveat/latin-500.css';
import '@fontsource/caveat/latin-700.css';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
