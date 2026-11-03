/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          void: '#040407',
          deep: '#07070C',
          navy: '#090B19',
          afterhours: '#14050A',
        },
        champagne: {
          gold: '#D9AE50',
          bright: '#FDE68A',
          amber: '#F59E0B',
          soft: '#FEF3C7',
        },
        butter: {
          yellow: '#F8E6A0',
        },
        ivory: {
          warm: '#FFF9EA',
        },
        amber: {
          soft: '#E9B85B',
        },
        peach: {
          pale: '#F6D5B5',
        },
        warmwhite: '#FFFDF5',
        blush: {
          rose: '#FDA4AF',
          pink: '#F472B6',
        },
        crimson: {
          lust: '#E11D48',
          deep: '#9F1239',
        },
        parchment: {
          warm: '#F5EBDD',
          light: '#FAF5EE',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'Dancing Script', 'cursive'],
        calligraphy: ['"Great Vibes"', '"Alex Brush"', '"Caveat"', 'cursive'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 25px rgba(253, 230, 138, 0.25)',
        'glow-rose': '0 0 25px rgba(244, 114, 182, 0.35)',
        'glow-crimson': '0 0 25px rgba(225, 29, 72, 0.35)',
      },
    },
  },
  plugins: [],
};
