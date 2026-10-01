import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cacau: "rgb(var(--rgb-cacau) / <alpha-value>)",
        cobre: "rgb(var(--rgb-cobre) / <alpha-value>)",
        "cobre-claro": "rgb(var(--rgb-cobre-claro) / <alpha-value>)",
        mel: "rgb(var(--rgb-mel) / <alpha-value>)",
        linho: "rgb(var(--rgb-linho) / <alpha-value>)",
        areia: "rgb(var(--rgb-areia) / <alpha-value>)",
        ash: "rgb(var(--rgb-ash) / <alpha-value>)",
        muted: "rgb(var(--rgb-muted) / <alpha-value>)",
        creme: "rgb(var(--rgb-creme) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "var(--radius-card)" },
      maxWidth: { container: "var(--container)" },
      transitionTimingFunction: { expo: "cubic-bezier(.16,1,.3,1)" },
    },
  },
  plugins: [],
} satisfies Config;
