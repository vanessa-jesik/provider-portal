/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blurple: {
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        barn: { light: "#B10000", DEFAULT: "#780000", dark: "#5E0000" },
        fire: { light: "#E61523", DEFAULT: "#C1121F", dark: "#930E17" },
        papaya: { light: "#FDF1D9", DEFAULT: "#FDF0D5", dark: "#F8CA6D" },
        prussian: { light: "#005685", DEFAULT: "#003049", dark: "#002437" },
        air: { light: "#7CA9C5", DEFAULT: "#669BBC", dark: "#447A9C" },
      },
    },
  },
  plugins: [],
};
