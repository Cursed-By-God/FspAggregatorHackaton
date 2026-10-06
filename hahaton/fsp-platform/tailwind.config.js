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
          DEFAULT: "#09090B", // Глубокий матовый черный
          base: "#050507",    // Фоновый холст
          card: "#121216",    // Карточки первого уровня
          sub: "#18181F",     // Внутренние модули и инпуты
          border: "#262630",  // Границы
          borderLight: "#383846"
        },
        crimson: {
          DEFAULT: "#E11D48", // Фирменный алый ФСП
          dark: "#BE123C",    // Алый при наведении
          deep: "#9F1239",    // Градиенты
          glow: "rgba(225, 29, 72, 0.35)",
          subtle: "rgba(225, 29, 72, 0.12)"
        },
        chalk: {
          DEFAULT: "#F8FAFC", // Кристальный белый текст
          muted: "#94A3B8",   // Вторичный серый
          dim: "#64748B"      // Подписи
        },
        fsp: {
          gold: "#F59E0B",
          emerald: "#10B981"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-crimson': '0 0 24px -2px rgba(225, 29, 72, 0.45)',
        'glow-crimson-sm': '0 0 12px -1px rgba(225, 29, 72, 0.35)',
        'dossier': '0 8px 30px rgba(0, 0, 0, 0.65)',
      }
    },
  },
  plugins: [],
}