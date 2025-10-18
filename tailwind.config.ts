import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        copper: "var(--color-copper)",
        steel: "var(--color-steel)",
      },
    },
  },
  plugins: [],
} satisfies Config;
