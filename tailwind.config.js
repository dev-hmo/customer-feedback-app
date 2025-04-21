/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enable class‑based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan these files for class names
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
