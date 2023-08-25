import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

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
