/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        brand: {
          500: "#6B9E3E",
          600: "#5A8633",
          700: "#4A6B2E",
        },
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        swing: {
          "0%,100%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(15deg)" },
          "20%": { transform: "rotate(-10deg)" },
          "30%": { transform: "rotate(5deg)" },
          "40%": { transform: "rotate(-5deg)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.5s ease-out forwards",
        slideLeft: "slideLeft 0.3s ease-out",
        fadeIn: "fadeIn 0.4s ease-out",
        swing: "swing 3s ease-in-out infinite",
      },
      boxShadow: {
        brand: "0 12px 24px rgba(107,158,62,0.15)",
      },
    },
  },
};
