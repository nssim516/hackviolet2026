/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-start": "#8B5CF6",
        "primary-end": "#EC4899",
        "hack-violet": "#8B5CF6",
        "hack-pink": "#EC4899",
        "hackviolet-start": "#7C3AED",
        "hackviolet-end": "#EC4899",
        // Light mode colors
        "background-light": "#F8F9FA",
        "background-offwhite": "#F9FAFB",
        "surface-light": "#FFFFFF",
        "surface-card": "#FFFFFF",
        "card-light": "#FFFFFF",
        "text-main": "#1F2937",
        "text-dark": "#1F2937",
        "dark-gray": "#374151",
        "neutral-soft": "#F3F4F6",
        // Dark mode colors
        "background-dark": "#0F172A",
        "background-dark-secondary": "#1E293B",
        "surface-dark": "#1E293B",
        "card-dark": "#334155",
        "text-light": "#F1F5F9",
        "text-muted-dark": "#94A3B8",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
