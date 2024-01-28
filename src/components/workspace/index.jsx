import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ids } from "@/constants";
import { default as Crosshairs } from "./crosshairs";

export { default as Cursor } from "./cursor";

export const Workspace = () => {
  const rectRef = useRef();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", function (event) {
      const me = d3.select(this);
      me.attr("x", +me.attr("x") + event.dx);
      me.attr("y", +me.attr("y") + event.dy);
    });
    const node = rectRef.current;
    handleDrag(d3.select(node));
  }, []);

  return (
    <div id={ids.workspace} style={{ border: "1px solid" }} className="w-full h-screen relative">
      <svg className="w-full h-full">
        <rect ref={rectRef} x={20} y={20} width={50} height={50} fill="white" className="stroke-2 stroke-black" />
      </svg>
      <Crosshairs />
    </div>
  );
};

export default Workspace;
