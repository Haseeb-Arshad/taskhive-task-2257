import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ─── Font Families ───────────────────────────────────
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          'Menlo',
          'Monaco',
          'Cascadia Code',
          'Courier New',
          'monospace',
        ],
      },

      // ─── Color Palette ────────────────────────────────────
      colors: {
        // Absolute dark base
        void: '#05080f',

        // Surface hierarchy
        surface: {
          0: '#07101e',
          1: '#0c1a2e',
          2: '#0f2040',
          3: '#132548',
        },

        // Primary sky accent (cold blue)
        sky: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },

        // Weather condition semantic colors
        weather: {
          sunny:    '#fbbf24',
          'sunny-dim': '#92400e',
          cloudy:   '#94a3b8',
          rainy:    '#60a5fa',
          'rainy-dim': '#1e3a5f',
          stormy:   '#a78bfa',
          'stormy-dim': '#3b0764',
          snowy:    '#e2e8f0',
          'snowy-dim': '#1e293b',
          foggy:    '#cbd5e1',
          hot:      '#f97316',
          cold:     '#93c5fd',
          wind:     '#67e8f9',
          humid:    '#86efac',
          pressure: '#c084fc',
        },

        // AQI scale
        aqi: {
          good:         '#4ade80',
          moderate:     '#facc15',
          sensitive:    '#fb923c',
          unhealthy:    '#f87171',
          'very-unhealthy': '#c084fc',
          hazardous:    '#e11d48',
        },

        // UV index scale
        uv: {
          low:       '#4ade80',
          moderate:  '#facc15',
          high:      '#fb923c',
          'very-high': '#f87171',
          extreme:   '#c084fc',
        },

        // Temperature range palette
        temp: {
          'frozen':    '#bfdbfe',
          'very-cold': '#93c5fd',
          'cold':      '#60a5fa',
          'cool':      '#7dd3fc',
          'mild':      '#86efac',
          'warm':      '#fde68a',
          'hot':       '#fb923c',
          'very-hot':  '#f97316',
          'extreme':   '#ef4444',
        },

        // Precipitation probability
        precip: {
          none:   'rgba(148, 163, 184, 0.2)',
          low:    '#bae6fd',
          medium: '#60a5fa',
          high:   '#2563eb',
          heavy:  '#1d4ed8',
        },

        // Neutral overrides (cool gray tone)
        slate: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

        // Border utility
        border: {
          DEFAULT: 'rgba(148, 163, 184, 0.08)',
          accent:  'rgba(56, 189, 248, 0.15)',
          warm:    'rgba(251, 191, 36, 0.15)',
          glow:    'rgba(56, 189, 248, 0.3)',
        },
      },

      // ─── Background Images / Gradients ───────────────────
      backgroundImage: {
        // Sky gradients for weather conditions
        'sky-clear-day':   'linear-gradient(180deg, #0c2340 0%, #1a4a7a 40%, #2d7dd2 100%)',
        'sky-clear-night': 'linear-gradient(180deg, #05080f 0%, #0a1628 50%, #0c2340 100%)',
        'sky-cloudy':      'linear-gradient(180deg, #1a2535 0%, #2d3748 50%, #374151 100%)',
        'sky-rainy':       'linear-gradient(180deg, #0c1929 0%, #1a2e44 50%, #1e3a5f 100%)',
        'sky-stormy':      'linear-gradient(180deg, #0a0f1e 0%, #1a1035 50%, #2d1b69 100%)',
        'sky-snowy':       'linear-gradient(180deg, #1a2535 0%, #2d3748 50%, #374151 100%)',
        'sky-sunset':      'linear-gradient(180deg, #0c1929 0%, #4a1942 40%, #c2410c 80%, #ea580c 100%)',
        'sky-dawn':        'linear-gradient(180deg, #0c1929 0%, #1e3a5f 40%, #7c3aed 70%, #db2777 100%)',

        // Surface gradients
        'surface-glow':    'linear-gradient(135deg, rgba(12, 26, 46, 0.9) 0%, rgba(7, 16, 30, 0.95) 100%)',
        'surface-accent':  'linear-gradient(135deg, rgba(56, 189, 248, 0.06) 0%, rgba(12, 26, 46, 0.9) 100%)',
        'surface-warm':    'linear-gradient(135deg, rgba(251, 191, 36, 0.06) 0%, rgba(12, 26, 46, 0.9) 100%)',

        // Card gradients
        'card-sky':        'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(12, 26, 46, 0.7) 100%)',
        'card-warm':       'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(12, 26, 46, 0.7) 100%)',
        'card-storm':      'linear-gradient(135deg, rgba(167, 139, 250, 0.08) 0%, rgba(12, 26, 46, 0.7) 100%)',
        'card-rain':       'linear-gradient(135deg, rgba(96, 165, 250, 0.08) 0%, rgba(12, 26, 46, 0.7) 100%)',

        // Data visualization chart gradients
        'chart-temperature': 'linear-gradient(180deg, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0) 100%)',
        'chart-precipitation': 'linear-gradient(180deg, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0) 100%)',
        'chart-wind':        'linear-gradient(180deg, rgba(103, 232, 249, 0.3) 0%, rgba(103, 232, 249, 0) 100%)',
        'chart-humidity':    'linear-gradient(180deg, rgba(134, 239, 172, 0.3) 0%, rgba(134, 239, 172, 0) 100%)',

        // Ambient glow backgrounds
        'ambient-cold':    'radial-gradient(ellipse 70% 50% at 25% 25%, rgba(56, 189, 248, 0.1) 0%, transparent 60%)',
        'ambient-warm':    'radial-gradient(ellipse 70% 50% at 75% 25%, rgba(251, 191, 36, 0.08) 0%, transparent 60%)',
        'ambient-storm':   'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',

        // Skeleton loader
        'skeleton':        'linear-gradient(90deg, rgba(148, 163, 184, 0.06) 0%, rgba(148, 163, 184, 0.12) 50%, rgba(148, 163, 184, 0.06) 100%)',
      },

      // ─── Border Radius ────────────────────────────────────
      borderRadius: {
        '4xl':  '2rem',
        '5xl':  '2.5rem',
        '6xl':  '3rem',
      },

      // ─── Box Shadows ──────────────────────────────────────
      boxShadow: {
        // Glass morphism
        'glass':      '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-lg':   '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',

        // Glow shadows
        'glow-sky':   '0 0 20px rgba(56, 189, 248, 0.2), 0 0 60px rgba(56, 189, 248, 0.08)',
        'glow-sky-sm':'0 0 10px rgba(56, 189, 248, 0.15)',
        'glow-warm':  '0 0 20px rgba(251, 191, 36, 0.15), 0 0 60px rgba(251, 191, 36, 0.05)',
        'glow-storm': '0 0 20px rgba(167, 139, 250, 0.15), 0 0 60px rgba(167, 139, 250, 0.05)',
        'glow-rain':  '0 0 20px rgba(96, 165, 250, 0.15)',

        // Elevation
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'elevation-2': '0 4px 16px rgba(0, 0, 0, 0.25)',
        'elevation-3': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'elevation-4': '0 16px 48px rgba(0, 0, 0, 0.35)',
        'elevation-5': '0 24px 64px rgba(0, 0, 0, 0.4)',

        // Card depth
        'card':       '0 2px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(56, 189, 248, 0.06)',

        // Inset (inner light refraction)
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'inner-sky':   'inset 0 1px 0 rgba(56, 189, 248, 0.1)',
        'inner-glow':  'inset 0 0 20px rgba(56, 189, 248, 0.05)',
      },

      // ─── Spacing ──────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
        '88': '22rem',
        '96': '24rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Typography ───────────────────────────────────────
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem',     { lineHeight: '1.5rem' }],
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',  { lineHeight: '2.5rem' }],
        '5xl':  ['3rem',     { lineHeight: '1' }],
        '6xl':  ['3.75rem',  { lineHeight: '1' }],
        '7xl':  ['4.5rem',   { lineHeight: '1' }],
        '8xl':  ['6rem',     { lineHeight: '1' }],
        '9xl':  ['8rem',     { lineHeight: '1' }],
        // Weather display sizes
        'temp-sm':  ['2rem',   { lineHeight: '1', letterSpacing: '-0.03em' }],
        'temp-md':  ['3.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'temp-lg':  ['5rem',   { lineHeight: '1', letterSpacing: '-0.05em' }],
        'temp-xl':  ['7rem',   { lineHeight: '1', letterSpacing: '-0.06em' }],
        'temp-2xl': ['9rem',   { lineHeight: '1', letterSpacing: '-0.06em' }],
      },

      letterSpacing: {
        'tightest': '-0.06em',
        'tighter':  '-0.04em',
        'tight':    '-0.02em',
        'normal':   '0',
        'wide':     '0.025em',
        'wider':    '0.05em',
        'widest':   '0.1em',
        'ultra':    '0.15em',
      },

      // ─── Transitions ──────────────────────────────────────
      transitionTimingFunction: {
        'smooth':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-expo':  'cubic-bezier(0.7, 0, 0.84, 0)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      transitionDuration: {
        '0':   '0ms',
        '75':  '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },

      // ─── Animations ───────────────────────────────────────
      animation: {
        'fade-in':      'fade-in 0.4s cubic-bezier(0, 0, 0.2, 1) both',
        'fade-in-up':   'fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-left':   'slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float':        'float 4s ease-in-out infinite',
        'spin-slow':    'spin-slow 8s linear infinite',
        'pulse-ring':   'pulse-ring 2s ease-out infinite',
        'shimmer':      'shimmer 3s ease-in-out infinite',
        'skeleton':     'skeleton-pulse 1.8s ease-in-out infinite',
        'temp-glow':    'temperature-glow 3s ease-in-out infinite',
        'rain-fall':    'rain-fall 1s linear infinite',
        'draw':         'draw 2s ease-in-out forwards',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0' },
          '50%':      { opacity: '1' },
        },
        'skeleton-pulse': {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'temperature-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))' },
          '50%':      { filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))' },
        },
        'rain-fall': {
          '0%':   { transform: 'translateY(-10px)', opacity: '0' },
          '20%':  { opacity: '1' },
          '100%': { transform: 'translateY(40px)', opacity: '0' },
        },
        draw: {
          from: { strokeDashoffset: '1000' },
          to:   { strokeDashoffset: '0' },
        },
      },

      // ─── Backdrop Blur ────────────────────────────────────
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // ─── Z-Index Layers ───────────────────────────────────
      zIndex: {
        'below':    '-1',
        'base':     '0',
        'raised':   '1',
        'dropdown': '100',
        'sticky':   '200',
        'modal':    '300',
        'overlay':  '400',
        'toast':    '500',
        'tooltip':  '600',
      },

      // ─── Screen Breakpoints ───────────────────────────────
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
      },

      // ─── Aspect Ratios ────────────────────────────────────
      aspectRatio: {
        'radar':     '1 / 1',
        'chart-sm':  '2 / 1',
        'chart-md':  '3 / 1',
        'chart-lg':  '4 / 1',
      },
    },
  },
  plugins: [],
}

export default config
