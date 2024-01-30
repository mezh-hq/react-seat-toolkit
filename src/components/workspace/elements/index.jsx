import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { store } from "@/store";
import { clearElements, deselectElement, selectElement } from "@/store/reducers/editor";
import { d3Extended } from "@/utils";
import { Tool } from "../../toolbar/data";
import { ElementType, elements, handleBoothDrag, handleSeatDrag } from "./utils";

export * from "./utils";

export const Element = ({ type = ElementType.Seat, x = 250, y = 250 }) => {
  const ref = useRef();

  const id = useMemo(() => uuidv4(), []);

  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const node = ref.current && d3.select(ref.current);

  const isSelected = selectedElementIds.includes(id);

  const centerCoords = isSelected && node && d3Extended.getNodeCenter(node);

  const Element = elements[type];

  const controlRadius = useMemo(() => {
    switch (type) {
      case ElementType.Seat:
        return node?.attr("r") * 6;
    }
    return node?.attr("width") * 1.5;
  }, [node]);

  useEffect(() => {
    if (!ref.current) return;
    const node = d3.select(ref.current);
    if (type == ElementType.Seat) {
      handleSeatDrag(node);
    } else {
      handleBoothDrag(node);
    }
  }, [ref]);

  const onClick = (e) => {
    const selectedTool = store.getState().toolbar.selectedTool;
    if (selectedTool == Tool.Select) {
      const ctrlPressed = e.ctrlKey || e.metaKey;
      if (selectedElementIds.includes(ref.current.id)) {
        if (ctrlPressed) {
          return store.dispatch(deselectElement(ref.current.id));
        }
        return;
      }
      if (!ctrlPressed) store.dispatch(clearElements());
      store.dispatch(selectElement(ref.current.id));
    }
  };

  return (
    <>
      {centerCoords && (
        <circle
          id={`${id}-controls`}
          cx={centerCoords.x}
          cy={centerCoords.y}
          r={controlRadius}
          className="stroke-2 stroke-blue-200 fill-none pointer-events-none"
          strokeDasharray="20, 38"
        />
      )}
      <Element
        id={id}
        ref={ref}
        x={x}
        y={y}
        className={twMerge(
          "fill-current text-white transition-all duration-medium",
          isSelected ? "element-selected" : "element-unselected"
        )}
        onClick={onClick}
      />
    </>
  );
};

export default Element;
