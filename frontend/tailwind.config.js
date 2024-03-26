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
        },
        'noti-in': {
          '0%': { 
            opacity: 0 ,
            transform: 'scale(0.0, 0.0) translateY(100%)'
          },
          '100%': {
             opacity: 1.0,
             transform: 'scale(1, 1) translateY(0%)'
          },
        },

        'noti-out': {
          '100%': { 
            opacity: 0 ,
            transform: 'scale(0.0, 0.0) translateY(100%)'
          },
          '0%': {
             opacity: 1.0,
             transform: 'scale(1, 1) translateY(0%)'
          },
        }
      },
      animation: {
        fadein: 'fadein 0.25s ease-in-out',
        fadeout: 'fadeout 0.25s ease-in-out',
        'noti-in': 'noti-in 0.5s ease-in-out',
        'noti-out': 'noti-out 0.5s ease-in-out delay 4s',
      },
      
      fontFamily: {
        serif: ['Georgia']
      },

      fontSize: {
        s: ['6.5px', { lineHeight: '10.5px'}],
        m: ['8px', { lineHeight: '13px'}],
        xs: ['12px', { lineHeight: '16px'}],
        sm: ['14px', { lineHeight: '20.5px'}],
        md: ['16px', { lineHeight: '25px'}],
        lg: ['20px', { lineHeight: '31.5px'}],
        xl: ['26px', { lineHeight: '39.5px'}],
        '2xl': ['32px', { lineHeight: '49.5px'}],
      },

      colors: {
        primary: {
          200: '#f8f8f8',
          300: '#f5f5f5',
          400: '#f1f1f1',
          500: '#eeeeee',
          600: '#bebebe',
          700: '#8f8f8f',
          800: '#5f5f5f',
        },
        secondary: {
          200: '#99c9e2',
          300: '#66add3',
          400: '#3392c5',
          500: '#0077B6',
          600: '#005f92',
          700: '#00476d',
          800: '#003049',
        },
        dark: {
          100: '#e6e6e6',
          150: '#e6e6e6',
          200: '#9a9a9a',
          300: '#686868',
          400: '#353535',
          500: '#030303',
        }
      }
    },
  },
  plugins: [],
}

