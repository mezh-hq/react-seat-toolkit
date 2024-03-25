import animate from "tailwindcss-animate";

export const screens = {
  xs: "400px",
  xsm: "450px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1536px"
};

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
  plugins: [animate]
};
