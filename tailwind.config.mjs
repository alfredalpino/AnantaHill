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
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
        },
        accent: "var(--accent)",
        background: "var(--white)",
        text: {
          primary: "var(--text-primary)",
          body: "var(--text-body)",
          muted: "var(--text-muted)",
        },
        success: "var(--success)",
        error: "var(--error)",
        warning: "var(--warning)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        branding: ["var(--font-playfair)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        script: ["var(--font-pinyon)", "cursive"],
      },
      borderRadius: {
        '2xl': '16px',
      },
      boxShadow: {
        'premium': '0 4px 24px rgba(38, 30, 30, 0.08)',
        'luxury': '0 10px 40px rgba(38, 30, 30, 0.05)',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
      letterSpacing: {
        luxury: "0.2em",
      }
    },
  },
  plugins: [],
};
