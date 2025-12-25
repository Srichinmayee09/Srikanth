/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F2F1EC',
          100: '#E6E4DD',
          200: '#DCE2D1',
          300: '#B8C4A8',
          400: '#6B8C7E',
          500: '#1A3C34', // Deep Forest Green
          600: '#15312A',
          700: '#102520',
          800: '#0B1A16',
          900: '#060F0C',
        },
        surface: {
          50: '#FFFFFF',
          100: '#F9F9F7',
          200: '#F2F1EC', // Main Surface
          300: '#E6E4DD',
          400: '#D9D7CE',
          500: '#CCC9BF',
        },
        accent: {
          light: '#DCE2D1',
          DEFAULT: '#1A3C34',
          dark: '#0F2520',
          emerald: '#274C40',
        },
        sky: {
          500: '#1A3C34',
          600: '#0F2520',
        },
        blue: {
          500: '#274C40',
          600: '#1A3C34',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
