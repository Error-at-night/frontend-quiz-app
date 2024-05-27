/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "rgb(59, 77, 102)",
        customLightBlue: "rgb(244, 246, 250)"
      },
    },
  },
  plugins: [],
}

