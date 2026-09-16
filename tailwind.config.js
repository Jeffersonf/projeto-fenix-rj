/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#faf8f5',
          card: '#ffffff',
          sand: '#f4efe6',
          border: '#e7e2d7',
          stone: '#78716c',
          text: '#292524',
          terracotta: '#b45309',
          sage: '#4d7c0f',
          ocean: '#0369a1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
