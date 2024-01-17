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
        primary: "#3F49C9",
        secondary: "#EB2D58",
        purple: "#882EE0",
        orange: "#F37833",
        green: "#3AC498",
        dark: {
          100: "#F0F0F5",
          200: "#B2B2B2",
          300: "#9296B4",
          400: "#646C84",
          500: "#404554",
          600: "#252528",
          700: "#212121",
          800: "#161618",
          900: "#121212",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
