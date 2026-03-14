/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0A0A0A',
        ngGold: {
          400: '#EAC54F',
          500: '#C5A059',
          600: '#997B36',
        },
        ngSilver: '#C0C0C0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Bodoni Moda', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
