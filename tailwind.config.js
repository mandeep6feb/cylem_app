/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins-semibold': ['Poppins SemiBold'],
        'poppins-medium': ['Poppins Medium'],
        'inter-light': ['Inter Light'],
        'poppins-bold': ['Poppins Bold'],
        'poppins-light': ['Poppins Light']
      },
      colors: {
        'black-text': ['#121826'],
        'app-dark-theme': ["#121212"],
        'error': '#ff00001f',
        'app-green': '#15BA43',
        'app-green-outline': '#8EE04E'
      },
      fontSize: {
        'logo': ['10px']
      }
    },
  },
  plugins: [],
}

