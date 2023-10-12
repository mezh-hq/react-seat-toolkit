import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,mdx,stories.js}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "var(--border)"
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
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [animate]
};
