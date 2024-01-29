import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { ids } from "@/constants";
import { tools } from "../toolbar/data";

export const Crosshairs = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

  const move = (e) => {
    const pointer = d3.pointer(e);
    setX(pointer[0]);
    setY(pointer[1]);
  };

  useEffect(() => {
    if (tools[selectedTool]?.crosshairs) {
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
  }, [selectedTool]);

  if (!enabled) return null;

  const workspace = document.getElementById(ids.workspace).getBoundingClientRect();

  const x1 = x - workspace.left;
  const y1 = y - workspace.top;

  if (x1 < 0 || y1 < 0) return null;

  return (
    <svg id={ids.crosshairs} className="w-full h-full absolute top-0 left-0 pointer-events-none">
      <line x1={x1} y1={0} x2={x1} y2={"100%"} stroke="black" />
      <line x1={0} y1={y1} x2={"100%"} y2={y1} stroke="black" />
    </svg>
  );
};

export default Crosshairs;
