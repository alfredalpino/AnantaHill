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
        black: "#0B0B0B",
        charcoal: "#121212",
        gold: {
          DEFAULT: "#C8A96A",
          hover: "#D4AF37",
        },
        cream: "#F5F2EB",
        beige: "#EFE8DC",
        green: "#1F3D2B",
        text: {
          primary: "#0B0B0B",
          secondary: "#6B6B6B",
          light: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
        medium: "0 8px 30px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
      },
    },
  },
  plugins: [],
};
