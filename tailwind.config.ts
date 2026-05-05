import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07070c",
        lime: {
          brand: "#dbff4d",
          soft: "#efffcc",
        },
        violet: {
          muted: "#5b3cb8",
          deep: "#2a1052",
          glow: "#a78bfa",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
      boxShadow: {
        lime: "0 0 40px rgba(219, 255, 77, 0.22)",
        violet: "0 24px 80px rgba(42, 16, 82, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
