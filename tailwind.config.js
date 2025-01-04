module.exports = {
  darkMode: false,
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ADD THE CUSTOM GRADIENT HERE
      backgroundImage: {
        'custom-gradient': 'linear-gradient(108deg, #30bd97 -60.82%, #6eb3d6 150.65%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

