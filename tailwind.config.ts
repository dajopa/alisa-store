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
        ink: "#1f1418",
        washi: {
          DEFAULT: "#fff8f5",
          soft: "#fdf2ec",
          dark: "#f5e6e0",
        },
        sakura: {
          light: "#ffd6e0",
          DEFAULT: "#f4a7b9",
          deep: "#c45c7a",
          petal: "#ffb7c5",
        },
        plum: {
          DEFAULT: "#4a2332",
          deep: "#2d1219",
        },
        muted: "#8a6b72",
        gold: {
          DEFAULT: "#c9a962",
          soft: "#e8d5a8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
      boxShadow: {
        sakura: "0 0 40px rgba(244, 167, 185, 0.35)",
        plum: "0 24px 80px rgba(45, 18, 25, 0.28)",
      },
      borderRadius: {
        sakura: "2px",
      },
      backgroundImage: {
        "washi-texture":
          "radial-gradient(circle at 20% 20%, rgba(255,214,224,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 60%, rgba(244,167,185,0.2) 0%, transparent 40%)",
        seigaiha:
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f4a7b9' fill-opacity='0.06'%3E%3Cpath d='M30 30c0-11 9-20 20-20v20H30zm0 0c0 11-9 20-20 20V30h20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
