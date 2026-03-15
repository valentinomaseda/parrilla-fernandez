/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#0a0a0a",
        fire: "#b91c1c",
        gold: "#c9a86a",
        ember: "#2a1212",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(201, 168, 106, 0.25), 0 10px 30px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 2px 2px, rgba(201, 168, 106, 0.07) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
