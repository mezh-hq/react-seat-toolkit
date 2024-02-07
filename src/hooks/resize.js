import { useEffect } from "react";

const useResize = (fn = () => {}, dependencies = []) => {
  useEffect(() => {
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [...dependencies]);
};

export default useResize;
