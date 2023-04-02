/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#360568",
        secondary: "#5B2A86",
        text: "#9AC6C5",
        heading: "#A5E6BA",
        middle: "#7785AC",
      },
    },
  },
  plugins: [],
};
