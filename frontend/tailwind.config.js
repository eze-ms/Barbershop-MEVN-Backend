/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './node_modules/vue-tailwind-datepicker/**/*.js',
    "./formkit.config.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#123e65',
        "vtd-primary": colors.blue
      },
      backgroundImage: {
        "app": "url('/img/Screenshot.webp')",
      },
      fontFamily: {
        roboto: ['"Roboto Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
