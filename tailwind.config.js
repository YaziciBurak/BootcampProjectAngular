/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'yellowImg': "url('./assets/img/yellow-photo.jpeg')"
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
