/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#0a0a0a",
        "wood-dark": "#1a1614",
        "brand-red": "#8c2d2b",
        "brand-cream": "#f5b591",
        ember: "#2a1212",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245, 181, 145, 0.3), 0 10px 30px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 2px 2px, rgba(245, 181, 145, 0.07) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
