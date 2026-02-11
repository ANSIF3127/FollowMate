/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f8fafc', // Slate-50
          dark: '#0B0E14',  // Deep dark blue-black from screenshot
        },
        surface: {
          light: '#ffffff',
          dark: '#151A23',  // Slightly lighter card background
        },
        primary: '#3b82f6', // Bright Blue
        secondary: '#6366f1', // Indigo

      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #F97316, #EC4899)', // Orange to Pink button
        'blue-gradient': 'linear-gradient(to right, #3b82f6, #2563eb)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
