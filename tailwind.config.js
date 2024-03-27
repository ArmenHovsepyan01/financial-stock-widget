/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        1200: '1200px',
      },
      width: {
        600: '600px',
      },
    },
  },
  plugins: [],
};
