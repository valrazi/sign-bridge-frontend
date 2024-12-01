/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EEE9DA",
        secondary: {
          100: '#9CBAC1',
          200: '#6096B4'
        }
      }
    },
  },
  plugins: [],
}

