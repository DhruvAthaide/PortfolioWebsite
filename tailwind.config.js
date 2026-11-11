import colors from 'tailwindcss/colors';

/*
 * Palette: midnight + electric cyan.
 * `primary-*`   light-mode accent (deep sky blue, AA on white).
 * `secondary-*` dark-mode accent (electric cyan); `secondary-900` is the main one.
 * `dark-*`      midnight surfaces in dark mode; 400/500 double as body text in light mode.
 * `gray`        mapped to slate so every neutral shares the same cool tint.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0f172a',
        },
        secondary: {
          400: '#67e8f9',
          500: '#3ee0f5',
          800: '#06b6d4',
          900: '#22d3ee',
        },
        dark: {
          100: '#cbd5e1',
          200: '#94a3b8',
          300: '#64748b',
          400: '#475569',
          500: '#334155',
          600: '#16203a',
          700: '#0d1424',
          800: '#070b14',
          900: '#04060c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        marquee: 'marquee 45s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
