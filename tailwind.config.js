import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,mdx,stories.js}"],
  theme: {
    extend: {
      colors: {
        background: "0 0% 100%",
        foreground: "240 10% 3.9%",
        border: "rgba(0, 0, 0, 0.1)"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      screens: {
        xs: "400px",
        xsm: "450px"
      },
      transitionDuration: {
        medium: "300ms",
        long: "500ms"
      }
    }
  },
  plugins: [animate]
};
