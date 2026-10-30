/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  // Material UI's CssBaseline does the reset, so Tailwind's preflight is off.
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};
