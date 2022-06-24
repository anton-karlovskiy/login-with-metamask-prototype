
module.exports = {
  content: [
    './utils/constants/styles.ts',
    './pages/**/*.{js,ts,jsx,tsx}',
    './parts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // MEMO: inspired by https://material-ui.com/customization/default-theme/
      zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
