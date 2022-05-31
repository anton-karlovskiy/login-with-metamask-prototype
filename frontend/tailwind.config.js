
module.exports = {
  content: [
    './utils/constants/styles.ts',
    './pages/**/*.{js,ts,jsx,tsx}',
    './parts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // ray test touch <
      // MEMO: inspired by https://material-ui.com/customization/default-theme/
      zIndex: {
        octavMobileStepper: 1000,
        octavSpeedDial: 1050,
        octavAppBar: 1100,
        octavDrawer: 1200,
        octavModal: 1300,
        octavSnackbar: 1400,
        octavTooltip: 1500
      }
      // ray test touch >
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
