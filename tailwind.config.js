/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tixfly-sdk-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: '#F8F8F7',
          secondary: '#D3D6DA'
        },
        card: {
          primary: '#282828',
          secondary: '#3E3E3E'
        },
        primary: '#1E1E1E'
      }
    },
  },
  plugins: [
  ],
}

