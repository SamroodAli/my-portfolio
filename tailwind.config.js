module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: (theme) => ({
        "5vh": "5vh",
        "95vh": "95vh",
        "screen/5": "calc(100vh / 5)",
      }),
      colors: {
        primary: "#2a9d8f",
        secondary: "#264653",
      },
    },
  },
  plugins: [],
};
