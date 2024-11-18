import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        "custom-white": "0px 0px 15px 3px rgba(255, 255, 255, 0.15)",
        "custom-white-lg": "0px 0px 15px 5px rgba(255, 255, 255, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
