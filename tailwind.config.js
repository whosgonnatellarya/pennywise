module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8f1",
          100: "#fff2e6",
          200: "#f6d8a8",
          300: "#e3b46a",
          400: "#c78e2a",
          500: "#b7791f",
          600: "#9a5f10",
          700: "#6f4310",
          800: "#5b3410",
          900: "#4a2a0d",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl: "0.9rem",
      },
      keyframes: {
        pulseSoft: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.6 } },
      },
      animation: {
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};