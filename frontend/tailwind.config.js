/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryBold: ["Bold"],
        primaryBlack: ["Black"],
        primaryLight: ["Light"],
        primaryRegular: ["Regular"],
        primarySemi: ["Semi"],
      },
      colors: {
        primaryColor: "#af73d8",
        smallColor: "#71757F",
        headColor: "#E7E7E7",
        backgroundColor: "#141414",
      },
      boxShadow: {
        "black-inset":
          "rgba(0, 0, 0, 0.80) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.30) 0px 18px 36px -18px inset",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
