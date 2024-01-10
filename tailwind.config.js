/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f15a24",
          100: "#f9cdc0",
          // f9cdc0,
        },
        light: {
          DEFAULT: "#9e9e9e",
          100: "#fafafa",
          200: "#e8eaed",
        },
        dark: {
          DEFAULT: "#5f5f45",
        },
      },
    },
  },
  plugins: [],
};
