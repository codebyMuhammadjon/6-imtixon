/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#46A358',
        'primary-light': '#46A35814',
        'primary-dark': '#3D8B4A',
        secondary: '#FBFBFB',
        dark: '#3D3D3D',
        gray: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#CACACA',
          400: '#A5A5A5',
          500: '#727272',
          600: '#3D3D3D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
