/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          light: '#3385FF',
          dark: '#0052CC',
        },
        'accent-purple': '#A855F7',
        brand: {
          blue: '#0066FF',
          purple: '#A855F7',
          dark: '#050505',
        },
        dark: {
          700: '#1a1a1a',
          800: '#111111',
          900: '#0a0a0a',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
