import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Editor = () => {
  const rectRef = useRef();

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", function (event) {
      const me = d3.select(this);
      me.attr("x", event.x);
      me.attr("y", event.y);
    });
    const node = rectRef.current;
    handleDrag(d3.select(node));
  }, []);

  return (
    <svg style={{ border: "1px solid" }} width={"100%"} height={"100vh"}>
      <rect ref={rectRef} x={20} y={20} width={50} height={50} />
    </svg>
  );
};

export default Editor;
