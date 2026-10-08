/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-ivory',
    'bg-linen',
    'bg-forest',
    'bg-ink',
    'bg-brass',
    'bg-terracotta',
    'text-ivory',
    'text-linen',
    'text-forest',
    'text-ink',
    'text-brass',
    'text-terracotta',
    'border-ivory',
    'border-forest',
    'border-ink',
    'border-brass',
    'on-dark',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F2E8',
        linen: '#EDE4D3',
        forest: '#17301F',
        ink: '#1C1A16',
        brass: '#B98B3E',
        terracotta: '#A83A2A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(23, 48, 31, 0.12)',
        card: '0 4px 24px rgba(28, 26, 22, 0.07)',
        glow: '0 0 24px rgba(185, 139, 62, 0.28)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
