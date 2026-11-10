/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#080808',
          secondary: '#111111',
          card: '#171717',
          elevated: '#1f1f1f',
        },
        electric: {
          yellow: '#FFD600',
          bright: '#FFE94A',
          dark: '#C9A900',
          dim: '#857000',
        },
        accent: {
          red: '#FF3838',
          'red-glow': 'rgba(255, 56, 56, 0.35)',
        },
        content: {
          primary: '#FFFFFF',
          secondary: '#BDBDBD',
          muted: '#808080',
        }
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 35px -5px rgba(255, 214, 0, 0.35)',
        'glow-yellow-sm': '0 0 15px -3px rgba(255, 214, 0, 0.4)',
        'glow-yellow-lg': '0 0 60px -10px rgba(255, 214, 0, 0.5)',
        'glow-red': '0 0 30px -5px rgba(255, 56, 56, 0.4)',
        'glow-red-sm': '0 0 15px -3px rgba(255, 56, 56, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
