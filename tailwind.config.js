/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/zentra.js'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: {
        'glow-cyan': '0 0 40px -8px rgba(34, 211, 238, 0.45)',
      },
    },
  },
  plugins: [],
};
