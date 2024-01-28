import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ids } from "@/constants";
import { default as Crosshairs } from "./crosshairs";
import { default as Zoom } from "./zoom";

export { default as Cursor } from "./cursor";

export const Workspace = () => {
  const rectRef = useRef();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", function (event) {
      const me = d3.select(this);
      me.attr("x", +me.attr("x") + event.dx);
      me.attr("y", +me.attr("y") + event.dy);
    });
    handleDrag(d3.select(rectRef.current));
  }, []);

  return (
    <div className="w-full h-[95vh] relative border border-b-0 border-black">
      <svg id={ids.workspace} className="w-full h-full">
        <g>
          <rect ref={rectRef} x={20} y={20} width={50} height={50} fill="white" className="stroke-2 stroke-black" />
        </g>
      </svg>
      <Crosshairs />
      <Zoom />
    </div>
  );
};

export default Workspace;
