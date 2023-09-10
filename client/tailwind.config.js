/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ea4335",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}