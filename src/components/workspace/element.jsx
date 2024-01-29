import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { store } from "@/store";
import { selectElement } from "@/store/reducers/editor";
import { d3Extended } from "@/utils";
import { Tool } from "../toolbar/data";

export const ElementType = {
  Booth: "booth",
  Seat: "seat"
};

const handleDrag = d3.drag().on("drag", function (event) {
  const me = d3.select(this);
  const controls = d3Extended.selectById(`${me.attr("id")}-controls`);
  const x = +me.attr("x") + event.dx;
  const y = +me.attr("y") + event.dy;
  me.attr("x", x);
  me.attr("y", y);
  const center = d3Extended.getNodeCenter(me);
  controls.attr("cx", center.x);
  controls.attr("cy", center.y);
  me.dispatch("drag", { detail: { x, y } });
});

export const Element = () => {
  const ref = useRef();

  const id = useMemo(() => uuidv4(), []);

  const selectedElementId = useSelector((state) => state.editor.selectedElementId);

  useEffect(() => {
    handleDrag(d3.select(ref.current));
  }, []);

  const onClick = () => {
    const selectedTool = store.getState().toolbar.selectedTool;
    if (selectedTool == Tool.Select) {
      store.dispatch(selectElement(ref.current.id));
    }
  };

  const node = ref.current && d3.select(ref.current);

  const centerCoords = node && d3Extended.getNodeCenter(node);

  const isSelected = selectedElementId == id;

  return (
    <>
      {centerCoords && isSelected && (
        <circle
          id={`${id}-controls`}
          cx={centerCoords.x}
          cy={centerCoords.y}
          r={+node.attr("width") * 1.5}
          className="stroke stroke-black fill-current text-transparent"
        />
      )}
      <rect
        id={id}
        ref={ref}
        x={20}
        y={20}
        width={50}
        height={50}
        className={twMerge("fill-current text-white", isSelected ? "element-selected" : "element-unselected")}
        onClick={onClick}
      />
    </>
  );
};

export default Element;
