/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Instrument Serif = títulos editoriales
        // IBM Plex Mono = textos, tickets y etiquetas (como una balanza de almacén)
        // Caveat = notas a mano (como el lettering del logo)
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        verde: '#1F6B43', // aberturas y sillas del local
        coral: '#FF8A5B', // acento de las destacadas de IG
        tinta: '#151513', // texto y trazos
        crema: '#F4EFE3', // fondo principal
        arena: '#EAE3D3', // fondo secundario
        papel: '#FFFDF7', // tickets y tarjetas
        noche: '#10291D', // sección cenas
        gris: '#5A574F', // texto secundario
        lcd: '#C8D2B4', // pantalla de la balanza
        'crema-soft': '#D6CFBF', // texto sobre fondos oscuros
      },
      maxWidth: {
        wrap: '1328px',
      },
      transitionTimingFunction: {
        suave: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        ticket: '0 1px 0 #D9D1BF, 0 22px 34px -22px rgba(21,21,19,.45)',
        flota: '0 30px 50px -30px rgba(21,21,19,.5)',
      },
    },
  },
  plugins: [],
};
