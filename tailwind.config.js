/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        primary: "#033468",
        secondary: "#54B0F2",
        gray: "#676767",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Poly", "serif"],
      },
      backgroundColor: {
        gradient: "linear-gradient(90deg, #54B0F2 0%, #033468 100%)",
      },
      backgroundImage: {
        nopfp: "url('/app/images/no-profile-picture.jpg')",
      },
    },
  },
  plugins: [],
};
