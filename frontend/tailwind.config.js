/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.html",
    "./src/**/*.css",
    "./src/**/*.js",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1.0 },
        },
        fadeout: {
          '0%': { opacity: 1.0 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        fadein: 'fadein 0.25s ease-in-out',
        fadeout: 'fadeout 0.25s ease-in-out',
      }
    },
  },
  plugins: [],
}

