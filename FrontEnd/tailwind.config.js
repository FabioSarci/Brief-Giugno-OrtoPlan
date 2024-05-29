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
      'sito': '#3d954d',
    },
  },
  },
  daisyui: {
    themes: ["light", "dark", "emerald","garden"],
  },
  plugins: [require("daisyui")],
}

