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
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        ivory: "var(--ivory)",
        white: "var(--white)",
        border: "var(--border-soft)",
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
