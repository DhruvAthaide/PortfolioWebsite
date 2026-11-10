import colors from 'tailwindcss/colors';

/*
 * Hallmark · redesign · genre: editorial/technical · tone: plain, warm, human
 * Accent: amber (light: #B45309, dark: #F59E0B). Neutrals: warm stone, no pure black/white.
 * Type: Schibsted Grotesk (display) + IBM Plex Sans (body) + JetBrains Mono (code only).
 * `primary-*` is the light-mode accent, `secondary-900/400` the dark-mode accent; the
 * class names are kept so existing components keep working.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: colors.stone,
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#1c1917',
        },
        secondary: {
          400: '#fbbf24',
          800: '#d97706',
          900: '#f59e0b',
        },
        dark: {
          100: '#d6d3d1',
          200: '#a8a29e',
          300: '#78716c',
          400: '#57534e',
          500: '#3a3632',
          600: '#2a2724',
          700: '#1c1a17',
          800: '#141210',
          900: '#0c0a09',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['"Schibsted Grotesk"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
