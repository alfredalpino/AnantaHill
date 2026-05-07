/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C5A059", // Muted Gold
        secondary: "#3C2F2F", // Dark Coffee Brown
        accent: "#1A1A1A", // Deep Black
        ivory: "#FAF9F6",
        white: "#FFFFFF",
        border: "rgba(60, 47, 47, 0.05)",
      },
      fontFamily: {
        serif: ["var(--font-outfit)", "sans-serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 30px rgba(0, 0, 0, 0.03)",
        luxury: "0 10px 40px rgba(92, 82, 66, 0.05)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      letterSpacing: {
        luxury: "0.2em",
      }
    },
  },
  plugins: [],
};
