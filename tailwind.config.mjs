/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#07080C',
          dark: '#030406',
          light: '#0c0e15',
        },
        panel: {
          DEFAULT: '#11131C',
          light: '#171a26',
          border: '#1f2438',
        },
        'cp-yellow': {
          DEFAULT: '#FCEE09',
          glow: 'rgba(252, 238, 9, 0.4)',
          dim: 'rgba(252, 238, 9, 0.15)',
        },
        'cp-cyan': {
          DEFAULT: '#00F0FF',
          glow: 'rgba(0, 240, 255, 0.4)',
          dim: 'rgba(0, 240, 255, 0.15)',
        },
        'cp-red': {
          DEFAULT: '#FF003C',
          glow: 'rgba(255, 0, 60, 0.4)',
          dim: 'rgba(255, 0, 60, 0.15)',
          deep: '#590015',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cyber: ['Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cp-cyan-glow': '0 0 15px rgba(0, 240, 255, 0.35)',
        'cp-yellow-glow': '0 0 15px rgba(252, 238, 9, 0.35)',
        'cp-red-glow': '0 0 15px rgba(255, 0, 60, 0.35)',
        'lever-knob': '0 0 20px rgba(255, 0, 60, 0.7), inset -4px -4px 8px rgba(89, 0, 21, 0.8), inset 4px 4px 8px rgba(255, 117, 151, 0.9)',
      },
      animation: {
        'glitch-scan': 'glitchScan 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitchScan: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(100%)', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
