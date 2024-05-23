/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        'ad-font': ["Poppins", "sans-serif"],
      },
      backgroundImage:{
        'nature':"url('./assets/img/nature.jpeg')",
        'yellow':"url('./assets/img/yellow.jpeg')"

      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
