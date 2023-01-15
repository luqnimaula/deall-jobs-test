/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}','./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Nunito"', ...fontFamily.sans]
      },
      fontSize: {
        xxs: '0.65rem',
      },
      colors: {
        primary: {
          1: colors.blue[100],
          2: colors.blue[300],
          3: colors.blue[500],
          4: colors.blue[700],
          4.5: colors.blue[800],
          5: colors.blue[900]
        },
        theme: {
          1: colors.gray[50],
          1.5: colors.gray[100],
          2: colors.gray[200],
          3: colors.gray[300],
          4: colors.gray[500],
          5: colors.gray[600],
          6: colors.gray[700],
          7: colors.gray[800],
          8: colors.gray[900]
        },
      }
    },
  },
  plugins: [],
}
