import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
