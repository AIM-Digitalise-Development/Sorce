// export const content = [
//   "./src/**/*.{html,js,jsx,ts,tsx}",
// ];
// export const theme = {
//   extend: {},
// };
// export const plugins = [];
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
    },
  },
  plugins: [],
};
