/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'text': "#AFAFAF",
        'primary': "#B66182",
        'background': "#1D1D21",
        'foreground': '#1F1F22'
      }
    },
  },
  plugins: [],
}

