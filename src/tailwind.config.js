/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08090E",
          base: "#05060A",    // Ультра-темный фон
          card: "rgba(14, 16, 26, 0.75)", // Полупрозрачные матовые карточки
          cardHover: "rgba(22, 26, 42, 0.85)",
          sub: "#111320",     // Инпуты и вложенные панели
          border: "rgba(255, 255, 255, 0.08)",
          borderLight: "rgba(255, 255, 255, 0.18)"
        },
        crimson: {
          DEFAULT: "#FF1744", // Неоново-алый ФСП
          hover: "#D50000",
          dark: "#B71C1C",
          glow: "rgba(255, 23, 68, 0.4)",
          subtle: "rgba(255, 23, 68, 0.1)"
        },
        cyan: {
          DEFAULT: "#00E5FF",
          glow: "rgba(0, 229, 255, 0.4)",
          subtle: "rgba(0, 229, 255, 0.1)"
        },
        chalk: {
          DEFAULT: "#F8FAFC",
          muted: "#94A3B8",
          dim: "#64748B"
        },
        fsp: {
          gold: "#FFC400",
          emerald: "#00E676",
          purple: "#AA00FF"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-crimson': '0 0 30px rgba(255, 23, 68, 0.35)',
        'glow-crimson-sm': '0 0 14px rgba(255, 23, 68, 0.25)',
        'glow-cyan': '0 0 30px rgba(0, 229, 255, 0.35)',
        'glow-cyan-sm': '0 0 14px rgba(0, 229, 255, 0.25)',
        'glow-gold': '0 0 24px rgba(255, 196, 0, 0.3)',
        'glow-emerald': '0 0 24px rgba(0, 230, 118, 0.3)',
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 1px rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(255, 23, 68, 0.6))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 2px rgba(255, 23, 68, 0.2))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}