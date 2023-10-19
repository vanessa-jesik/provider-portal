/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
