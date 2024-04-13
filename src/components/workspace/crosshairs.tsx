import { memo, useEffect, useState } from "react";
import { pointer } from "d3";
import { ids } from "@/constants";

export const Crosshairs = ({ render }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const move = (e: Event) => {
    const ptr = pointer(e);
    setX(ptr[0]);
    setY(ptr[1]);
  };

  useEffect(() => {
    if (render) {
      document.addEventListener("pointermove", move);
      document.addEventListener("touchmove", move);
      setEnabled(true);
      return () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("touchmove", move);
      };
    } else {
      setEnabled(false);
    }
  }, [render]);

  if (!enabled) return null;

  const workspace = document.getElementById(ids.workspace)?.getBoundingClientRect();

  const x1 = x - workspace?.left || 0;
  const y1 = y - workspace?.top || 0;

  if (x1 < 0 || y1 < 0) return null;

  return (
    <svg id={ids.crosshairs} className="w-full h-full absolute top-0 left-0 pointer-events-none">
      <line x1={x1} y1={0} x2={x1} y2={"100%"} stroke="black" />
      <line x1={0} y1={y1} x2={"100%"} y2={y1} stroke="black" />
    </svg>
  );
};

export default memo(Crosshairs);
