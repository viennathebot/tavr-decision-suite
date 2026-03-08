import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0A0F1E",
          800: "#111827",
          700: "#1A2332",
          600: "#1F2937",
          500: "#374151",
        },
        gold: {
          DEFAULT: "#C9A84C",
          dark: "#A8893D",
        },
        clinical: {
          success: "#00C9A7",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        mono: ["DM Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
