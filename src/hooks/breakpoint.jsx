import { useEffect, useState } from "react";
import path from "path";
import resolveConfig from "tailwindcss/resolveConfig";

let tailwindConfig;

let iterations = 0;

// eslint-disable-next-line no-constant-condition
while (true) {
  iterations++;
  if (iterations > 10) {
    tailwindConfig = {
      theme: {
        screens: {
          xs: "400px",
          xsm: "450px"
        }
      }
    };
    break;
  }
  try {
    tailwindConfig = require(`${path.join(process.cwd(), "../".repeat(iterations), "tailwind.config.js")}`);
    break;
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

const config = resolveConfig(tailwindConfig);

const calculateBreakpoints = () =>
  Object.entries(config.theme.screens).reduce((acc, [key, value]) => {
    acc[key] = window.matchMedia(`(min-width: ${value})`).matches;
    return acc;
  }, {});

const useBreakpoint = () => {
  const [breakpoints, setBreakpoints] = useState(calculateBreakpoints());
  useEffect(() => {
    const resizeHandler = () => {
      setBreakpoints(calculateBreakpoints());
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return breakpoints;
};

export default useBreakpoint;
