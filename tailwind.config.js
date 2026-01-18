module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f1',
          100: '#fff2e6',
          200: '#f6d8a8',
          300: '#e3b46a',
          400: '#c78e2a',
          500: '#b7791f',
          600: '#9a5f10',
          700: '#6f4310',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}