import animate from "tailwindcss-animate";
import { isolateInsideOfContainer, scopedPreflightStyles } from "tailwindcss-scoped-preflight";
import { screens } from "./src/utils/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,stories.js,css}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      screens,
      transitionDuration: {
        medium: "300ms",
        long: "500ms"
      }
    }
  },
  plugins: [
    animate,
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".stk-core")
    })
  ]
};
