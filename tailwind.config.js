/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: '0 4px 24px rgba(28, 26, 22, 0.07)',
        glow: '0 0 24px rgba(185, 139, 62, 0.28)',
      },
    },
  },
  plugins: [],
}
