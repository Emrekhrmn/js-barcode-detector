/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      minHeight: {
        '100': '100dvh'
      },
    },
  },
  plugins: [],
}