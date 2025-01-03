import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bkg: "var(--background)",
        frg: "var(--foreground)",
        ["accent-primary"]: "rgba(var(--accent-primary), <alpha-value>)",
        ["bdr-primary"]: "rgb(var(--bdr-primary))",
        accent1: "var(--accent1)",
        primary: "var(--primary)",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
} satisfies Config;
