/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false, // تم تعطيل الوضع الليلي
  theme: {
    extend: {
      fontFamily:{
        arabic: ['DahabArabic', 'sans-serif'],
      },
      backgroundImage: {
        "custom-image": "url('/cover2.jpeg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maincolor: "#f5f5f5",
        secondarycolor: "#e2ab95",
        primary: "#6b6b6b",
        secondary: "#f7f6f2",
        mixed: "rgb(255,255,255)",
        // dark: "#232A3C",
        medium: "#000000",
      },
    },
  },
  plugins: [],
};
