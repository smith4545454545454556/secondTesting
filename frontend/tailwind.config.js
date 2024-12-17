/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      placeholderColor: {
        customBlack: '#000000',
      },
      colors: {
        "primary": "#b8c7e3"
      },
      animation: {
        spinSlow: "spin 30s linear infinite"
      },
      borderRadius: {
        "customShape": "10px 10px 600px 10px"
      },
      fontFamily: {
        "permanentMarker": ['Rubik Wet'],

      },
      gridTemplateColumns: {
        "auto": "repeat(auto-fill,minmax(280px,1fr))"
      }
    },
  },
  plugins: [],
}

