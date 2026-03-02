import type { Config } from 'tailwindcss';

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
      /* ─── Font Families ─── */
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },

      /* ─── Custom Colors ─── */
      colors: {
        /* Base dark surface palette */
        atm: {
          base: '#080c18',
          'surface-1': '#0d1226',
          'surface-2': '#111829',
          'surface-3': '#18213a',
          'surface-4': '#1e2844',
          border: 'rgba(255,255,255,0.06)',
          'border-subtle': 'rgba(255,255,255,0.04)',

          /* Text scale */
          text: {
            primary: '#e8edf5',
            secondary: '#8a9bbf',
            muted: '#4a5a7a',
            inverse: '#0a0f1e',
          },

          /* Accent — Electric Blue */
          accent: {
            DEFAULT: '#3b82f6',
            light: '#60a5fa',
            dim: 'rgba(59,130,246,0.12)',
            glow: 'rgba(59,130,246,0.25)',
          },

          /* Semantic */
          success: '#34d399',
          warning: '#fbbf24',
          danger: '#f87171',
          info: '#38bdf8',
        },

        /* Temperature gradient scale */
        temp: {
          frigid: '#a5b4fc',
          cold: '#7dd3fc',
          cool: '#6ee7b7',
          mild: '#fde68a',
          warm: '#fb923c',
          hot: '#f87171',
          scorching: '#ef4444',
        },

        /* Weather condition overlay colors */
        weather: {
          'clear-from': '#1a2744',
          'clear-to': '#0f1e3d',
          'partly-cloudy-from': '#1c2540',
          'partly-cloudy-to': '#111b35',
          'cloudy-from': '#1e2535',
          'cloudy-to': '#141b2d',
          'rain-from': '#0f1d35',
          'rain-to': '#0a1428',
          'storm-from': '#16113a',
          'storm-to': '#0a0f28',
          'snow-from': '#172035',
          'snow-to': '#0d1a2e',
          'fog-from': '#1a1e2a',
          'fog-to': '#10141e',
          'wind-from': '#12192f',
          'wind-to': '#0a1020',
        },

        /* UV Index scale */
        uv: {
          low: '#34d399',
          moderate: '#fbbf24',
          high: '#fb923c',
          'very-high': '#f87171',
          extreme: '#c084fc',
        },

        /* Air quality index */
        aqi: {
          good: '#34d399',
          moderate: '#a3e635',
          'unhealthy-sensitive': '#fbbf24',
          unhealthy: '#fb923c',
          'very-unhealthy': '#f87171',
          hazardous: '#c084fc',
        },
      },

      /* ─── Border Radius ─── */
      borderRadius: {
        'atm-sm': '8px',
        'atm-md': '14px',
        'atm-lg': '20px',
        'atm-xl': '28px',
        'atm-2xl': '36px',
      },

      /* ─── Box Shadows ─── */
      boxShadow: {
        'atm-card': '0 4px 24px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset',
        'atm-panel': '0 8px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset',
        'atm-glow': '0 0 32px rgba(59,130,246,0.18)',
        'atm-glow-sm': '0 0 16px rgba(59,130,246,0.15)',
        'atm-inset': '0 1px 0 rgba(255,255,255,0.06) inset',
        'atm-lift': '0 16px 48px rgba(0,0,0,0.5)',
      },

      /* ─── Backdrop Blur ─── */
      backdropBlur: {
        'atm': '16px',
        'atm-sm': '8px',
        'atm-xl': '32px',
      },

      /* ─── Background Images / Gradients ─── */
      backgroundImage: {
        /* Primary app gradient */
        'atm-base': 'radial-gradient(ellipse 120% 60% at 50% -10%, #0d1e48 0%, #080c18 60%)',

        /* Mesh blobs */
        'atm-mesh-blue': 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.08) 0%, transparent 60%)',
        'atm-mesh-accent': 'radial-gradient(circle at 80% 80%, rgba(99,102,241,0.06) 0%, transparent 60%)',

        /* Temperature gradient (for thermometer / gauge bars) */
        'temp-gradient': 'linear-gradient(90deg, #a5b4fc 0%, #7dd3fc 20%, #6ee7b7 40%, #fde68a 60%, #fb923c 80%, #f87171 100%)',

        /* Shimmer skeleton */
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',

        /* Weather hero gradients */
        'weather-clear': 'linear-gradient(160deg, #1a2744 0%, #0f1e3d 100%)',
        'weather-cloudy': 'linear-gradient(160deg, #1e2535 0%, #141b2d 100%)',
        'weather-rain': 'linear-gradient(160deg, #0f1d35 0%, #0a1428 100%)',
        'weather-storm': 'linear-gradient(160deg, #16113a 0%, #0a0f28 100%)',
        'weather-snow': 'linear-gradient(160deg, #172035 0%, #0d1a2e 100%)',
        'weather-fog': 'linear-gradient(160deg, #1a1e2a 0%, #10141e 100%)',

        /* Gloss overlay for glass cards */
        'glass-gloss': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
      },

      /* ─── Spacing Extras ─── */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      /* ─── Typography Scale ─── */
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        '10xl': ['10rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },

      letterSpacing: {
        'tighter-xl': '-0.04em',
        'tighter-2xl': '-0.06em',
        'wider-xl': '0.12em',
      },

      /* ─── Animations ─── */
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% center' },
          to: { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'weather-drift': {
          '0%': { transform: 'translateX(0%) translateY(0px)' },
          '33%': { transform: 'translateX(2%) translateY(-3px)' },
          '66%': { transform: 'translateX(-1%) translateY(2px)' },
          '100%': { transform: 'translateX(0%) translateY(0px)' },
        },
      },

      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'fade-up-slow': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'weather-drift': 'weather-drift 8s ease-in-out infinite',
      },

      /* ─── Transition Timing ─── */
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      /* ─── Z-Index System ─── */
      zIndex: {
        'base': '0',
        'raised': '10',
        'overlay': '20',
        'dropdown': '30',
        'sticky': '40',
        'modal': '50',
        'toast': '60',
        'grain': '70',
      },

      /* ─── Max Width ─── */
      maxWidth: {
        'atm-layout': '1400px',
        'atm-content': '1200px',
        'atm-narrow': '900px',
        'readable': '65ch',
      },

      /* ─── Screen Extras ─── */
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};

export default config;
