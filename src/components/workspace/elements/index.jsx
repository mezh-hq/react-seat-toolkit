import { memo, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { isEqual } from "lodash";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { clearAndSelectElements, deselectElement, selectElement } from "@/store/reducers/editor";
import { d3Extended } from "@/utils";
import { Tool } from "../../toolbar/data";
import {
  ElementType,
  elements,
  handleDrag,
  handlePolylineDrag,
  handleSeatDrag,
  handleShapeDrag,
  handleTextDrag
} from "./utils";

export * from "./utils";

export const Element = ({ type = ElementType.Seat, id, x = 250, y = 250, isSelected = false, ...props }) => {
  const ref = useRef();

  const node = ref.current && d3.select(ref.current);

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
    if (type === ElementType.Seat) {
      handleSeatDrag(node);
    } else if (type === ElementType.Text) {
      handleTextDrag(node);
    } else if (type === ElementType.Shape || type === ElementType.Image) {
      handleShapeDrag(node);
    } else if (type === ElementType.Polyline) {
      handlePolylineDrag(node);
    } else {
      handleDrag(node);
    }
  }, [ref]);

  const onClick = (e) => {
    const selectedTool = store.getState().toolbar.selectedTool;
    if (selectedTool === Tool.Select) {
      const ctrlPressed = e.ctrlKey || e.metaKey;
      if (isSelected) {
        if (ctrlPressed) {
          return store.dispatch(deselectElement(ref.current.id));
        }
        return;
      }
      if (!ctrlPressed) {
        store.dispatch(clearAndSelectElements([ref.current.id]));
      } else {
        store.dispatch(selectElement(ref.current.id));
      }
    }
  };

  return (
    <>
      {centerCoords &&
        ![ElementType.Text, ElementType.Shape, ElementType.Image, ElementType.Polyline].includes(type) && (
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
        {...props}
        className={twMerge(
          "fill-current transition-all duration-medium",
          isSelected
            ? type === ElementType.Text
              ? "text-selected"
              : "element-selected"
            : type === ElementType.Text
            ? "text-unselected"
            : "element-unselected",
          !props.color && "text-white"
        )}
        onClick={onClick}
        {...{ [dataAttributes.elementType]: type }}
      />
    </>
  );
};

export default memo(Element, isEqual);
