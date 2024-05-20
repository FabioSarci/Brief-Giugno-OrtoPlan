/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ejs}",
    "./public/**/*.{html,js,ejs}",
    "./views/**/*.{html,js,ejs}"
  ],
  theme: {
    extend: {
      colors:{
      'tumadre': '#c2410c', 
    },
  },
  },
  plugins: [require("daisyui")],
}

