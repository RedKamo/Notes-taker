/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-custom': "#f5f2d9",
        'orange-custom': "#e24c12",
        'yellow-custom': "#fef392",
        'another-yellow-custom': "#f5d04b",
        'purple-custom': "#e9cdff",
        'blue-custom': "#a4e6f4",
        'green-custom': "#00ff94",
        'another-green-custom': "#23e299",
        'red-custom':"#f44b4d",
        'lemon-custom': "#ceff1b",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
