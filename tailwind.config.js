/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#FFF4E6",
          200: "#FCE8D5",
          400: "#F4B96B",
          500: "#B7791F",
          700: "#6B4F1D",
        },
      },
      boxShadow: {
        card: "0 12px 28px rgba(0,0,0,0.10)",
      },
      backdropBlur: {
        xs: "6px",
      },
    },
  },
  plugins: [],
};
