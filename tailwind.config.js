export default {
  content: [
    "./index.html", // Include your HTML files
    "./src/**/*.{js,jsx,ts,tsx}", // Include React files
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'], // Add Raleway as a font family
      },
    },
  },
  plugins: [],
};
