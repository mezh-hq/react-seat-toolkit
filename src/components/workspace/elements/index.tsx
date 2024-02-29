import { memo, useEffect, useRef } from "react";
import * as d3 from "d3";
import { isEqual } from "lodash";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { clearAndSelectElements, deselectElement, selectElement } from "@/store/reducers/editor";
import { STKMode } from "@/types";
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

export const Element = ({ type = ElementType.Seat, id, x = 250, y = 250, isSelected = false, options, ...props }) => {
  const ref = useRef<HTMLElement>();

  const Element = elements[type];

  useEffect(() => {
    if (!ref.current || options.mode !== STKMode.Designer) return;
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
  }, [ref, options.mode]);

  const onClick = (e: any) => {
    const selectedTool = store.getState().toolbar.selectedTool;
    if (selectedTool === Tool.Select && ref.current) {
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
        !props.color && type !== ElementType.Text && "text-white"
      )}
      onClick={onClick}
      options={options}
      {...{ [dataAttributes.elementType]: type }}
    />
  );
};

export default memo(Element, isEqual);
