import { useEffect, useRef } from "react";
import * as d3 from "d3";

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
    <svg id="stk-workspace" style={{ border: "1px solid" }} width={"100%"} height={"100vh"}>
      <rect ref={rectRef} x={20} y={20} width={50} height={50} fill="white" className="stroke-2 stroke-black" />
    </svg>
  );
};

export default Workspace;
