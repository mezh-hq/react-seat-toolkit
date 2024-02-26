import { useEffect, useState } from "react";
import { default as resolveConfig } from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const config = resolveConfig(tailwindConfig);

const calculateBreakpoints = () =>
  Object.entries(config.theme.screens).reduce((acc, [key, value]) => {
    if (typeof window === "undefined") return acc;
    acc[key] = window.matchMedia(`(min-width: ${value})`).matches;
    return acc;
  }, {});

/**
 * @description Extracts and returns an object of breakpoint booleans from Tailwind's theme.screens object.
 * @example
 * const { xs, sm, md, lg, xl, xxl } = useBreakpoint();
 *
 * console.log(md); // true if the screen is at least 768px wide
 */
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
