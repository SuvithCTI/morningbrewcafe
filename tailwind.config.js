/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f4',
          100: '#f7ebe1',
          200: '#edd5c1',
          300: '#dfb799',
          400: '#ce916e',
          500: '#bc734c',
          600: '#a35939',
          700: '#84422e',
          800: '#6d3629',
          900: '#431f18',
          950: '#230f0b',
        },
        amber: {
          glow: '#ff9d00',
        },
        crema: '#f4ede4',
        roast: '#18120e',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'steam': 'steamRise 4s ease-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        steamRise: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '30%': { opacity: '0.7' },
          '70%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-60px) scaleX(2.2)', opacity: '0' },
        },
      },
      boxShadow: {
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glow-orange': '0 0 30px -5px rgba(251, 146, 60, 0.45)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        '3d-card': '0 20px 35px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
