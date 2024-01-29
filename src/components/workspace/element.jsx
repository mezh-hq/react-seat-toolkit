import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { v4 as uuidv4 } from "uuid";
import { store } from "@/store";
import { selectElement } from "@/store/reducers/editor";

export const ElementType = {
  Booth: "booth",
  Seat: "seat"
};

export const Element = () => {
  const ref = useRef();

  const id = useMemo(() => uuidv4(), []);

  useEffect(() => {
    const handleDrag = d3.drag().on("drag", function (event) {
      const me = d3.select(this);
      const x = +me.attr("x") + event.dx;
      const y = +me.attr("y") + event.dy;
      me.attr("x", x);
      me.attr("y", y);
      me.dispatch("drag", { detail: { x, y } });
    });
    handleDrag(d3.select(ref.current));
  }, []);

  const onClick = () => {
    store.dispatch(selectElement(ref.current.id));
  };

  return (
    <rect
      id={id}
      ref={ref}
      x={20}
      y={20}
      width={50}
      height={50}
      className="element-unselected fill-current text-white"
      onClick={onClick}
    />
  );
};

export default Element;
