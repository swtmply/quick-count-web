module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      colors: {
        indigo: {
          1000: "#1C1C3D",
        },
        scarlet: {
          300: "#CF0A0A",
          400: "#BB0909",
        },
      },
    },
  },
  plugins: [],
};
