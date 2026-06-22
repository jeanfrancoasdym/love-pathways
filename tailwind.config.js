/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#657ef6',
          secondary: '#add400',
          dark: '#192847',
          light: '#bfd9e1',
          cream: '#faf8f4',
          mist: '#eef4f6',
        }
      },
      fontFamily: {
        sans: ['League Spartan', 'sans-serif'],
        display: ['League Spartan', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
