/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1E",
        card: "#111827",
        accent: "#C9A84C",
        success: "#00C9A7",
        warning: "#F59E0B",
        danger: "#EF4444",
        primary: "#E2E8F0",
        muted: "#64748B",
      },
      fontFamily: {
        mono: ["DMMono_400Regular"],
        "mono-medium": ["DMMono_500Medium"],
      },
    },
  },
  plugins: [],
};
