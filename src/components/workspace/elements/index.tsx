import { memo, useEffect, useMemo, useRef } from "react";
import { select } from "d3";
import { default as isEqual } from "lodash/isEqual";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { clearAndSelectElements, deselectElement, selectElement } from "@/store/reducers/editor";
import { ISTKProps, SeatStatus } from "@/types";
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

interface IElementProps {
  [prop: string]: any;
  consumer: ISTKProps;
}

export const Element: React.FC<IElementProps> = ({
  type = ElementType.Seat,
  id,
  x = 250,
  y = 250,
  isSelected = false,
  consumer,
  ...props
}) => {
  const ref = useRef<HTMLElement>();

  const Element = elements[type] as any;

  const styles = (consumer as ISTKProps).styles?.elements;

  useEffect(() => {
    if (!ref.current || consumer.mode !== "designer") return;
    const node = select(ref.current);
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
  }, [ref, consumer.mode]);

  const onClick = (e: any) => {
    if (consumer.mode === "user") {
      if (type !== ElementType.Seat || props.status !== SeatStatus.Available) {
        return;
      }
    }
    const maxSeatSelectionCheck = () => {
      if (
        consumer.options?.maxSeatSelectionCount &&
        store.getState().editor.selectedElementIds.length >= consumer.options?.maxSeatSelectionCount
      ) {
        consumer.events?.onMaxSeatSelectionCountReached?.();
        return true;
      }
      return false;
    };
    if (consumer.mode === "user" && consumer.seatSelectionMode === "chain") {
      if (isSelected) {
        return store.dispatch(deselectElement(id));
      }
      if (maxSeatSelectionCheck()) return;
      return store.dispatch(selectElement(id));
    } else {
      const selectedTool = store.getState().toolbar.selectedTool;
      if (selectedTool === Tool.Select && ref.current) {
        const ctrlPressed = e.ctrlKey || e.metaKey;
        if (isSelected) {
          if (ctrlPressed) {
            return store.dispatch(deselectElement(ref.current.id));
          }
          return;
        }
        if (consumer.mode === "user" && maxSeatSelectionCheck()) return;
        if (!ctrlPressed) {
          store.dispatch(clearAndSelectElements([ref.current.id]));
        } else {
          store.dispatch(selectElement(ref.current.id));
        }
      }
    }
  };

  const stylemap = useMemo(
    () => ({
      [ElementType.Text]: styles?.text,
      [ElementType.Shape]: styles?.shape,
      [ElementType.Polyline]: styles?.shape,
      [ElementType.Image]: styles?.image,
      [ElementType.Seat]: styles?.seat
    }),
    [styles]
  );

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
        !props.color && type !== ElementType.Text && "text-white",
        isSelected ? stylemap[type]?.selected?.className : stylemap[type]?.unselected?.className
      )}
      onClick={onClick}
      consumer={consumer}
      isSelected={isSelected}
      {...{ [dataAttributes.elementType]: type }}
    />
  );
};

export default memo(Element, isEqual);
