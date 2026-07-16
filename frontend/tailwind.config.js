/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0D1526",
          900: "#14213D",
          800: "#1C2E52",
          700: "#28406B",
        },
        paper: "#FAF6EF",
        amber: {
          400: "#EDB94F",
          500: "#E8A33D",
          600: "#C6832A",
        },
        ink: "#1F2430",
        moss: "#4C7A5E",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "route-dots": "radial-gradient(circle, #E8A33D 1.5px, transparent 1.5px)",
      },
    },
  },
  plugins: [],
}
