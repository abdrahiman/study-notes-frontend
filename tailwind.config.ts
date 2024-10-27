import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        premary:"var(--premary)",
        dGray100:"var(--dGray100)",
        dGray200:"var(--dGray200)",
        wGray100:"var(--wGray100)",
        wGray200:"var(--wGray200)",
      },
    },
  },
  plugins: [],
};
export default config;
