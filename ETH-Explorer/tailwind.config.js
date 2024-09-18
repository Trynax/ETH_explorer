/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#704AFF', // Replace with your desired color
        customGray: '#F7F8FA',
        iconBg:'#704AFF26'
      },
    },
  },
  plugins: [],
}
