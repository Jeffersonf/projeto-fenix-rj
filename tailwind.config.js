/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rio: {
          forest: '#059669',
          forestDark: '#064e3b',
          forestLight: '#10b981',
          ocean: '#0284c7',
          oceanDark: '#0c4a6e',
          oceanLight: '#38bdf8',
          sunset: '#f97316',
          sunsetDark: '#c2410c',
          gold: '#eab308',
          darkBg: '#0a0f18',
          cardBg: '#131e2e',
          cardBorder: '#1f2f45',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
