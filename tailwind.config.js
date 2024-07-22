/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,scss,css}"],
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'alata': ['Alata', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

