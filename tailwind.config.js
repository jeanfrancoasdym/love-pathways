/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Love Pathways palette (Brandbook July 2025). Mapped onto the LEAF
        // template's semantic slots so every existing class adopts LP colors.
        brand: {
          primary: '#f7a4a5',   // signature pink (gradient start, primary accent)
          secondary: '#ffc774', // golden yellow (CTA / emphasis)
          accent: '#f8a866',    // orange (secondary warm accent)
          dark: '#232323',      // charcoal (text + dark sections)
          light: '#ffe9b6',     // light yellow (gradient end / soft tint)
          cream: '#f9f2e8',     // primary warm background
          mist: '#fdf4ea',      // soft warm tint (replaces LEAF's cool mist)
        }
      },
      fontFamily: {
        // LP brandbook: Manrope only (no serif). serif slot also maps to Manrope
        // so any inherited font-serif class still renders on-brand.
        sans: ['Manrope', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        serif: ['Manrope', 'sans-serif'],
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
