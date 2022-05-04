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
        chart: {
          100: "#6050DC",
          200: "#D52DB7",
          300: "#FF2E7E",
          400: "#FF6B45",
        },
        indigo: {
          1000: "#1C1C3D",
        },
        scarlet: {
          300: "#CF0A0A",
          400: "#BB0909",
        },
        map: {
          50: "#FA0606",
          100: "#FEE2E2",
          200: "#FDB5B5",
          300: "#FC7676",
          400: "#FB3939",
          pink: "#FD3595",
        },
      },
    },
  },
  plugins: [],
};
