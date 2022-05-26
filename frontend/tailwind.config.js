
module.exports = {
  content: [
    './utils/constants/styles.ts',
    './pages/**/*.{js,ts,jsx,tsx}',
    './parts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
