/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add custom utility for focus-visible
      outline: {
        none: 'none',
      },
    },
  },
  variants: {
    extend: {
      outline: ['focus-visible'],
    },
  },
  plugins: [],
}