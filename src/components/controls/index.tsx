import { useMemo } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids } from "@/constants";
import { ISTKProps } from "@/types";
import { AnimatedSwitcher } from "../core";
import { Tool } from "../toolbar/data";
import { ElementType } from "../workspace/elements";
import { default as ImageControls } from "./image";
import { default as NoControls } from "./no-controls";
import { default as NoSelectedElement } from "./no-selection";
import { default as NoSelectionControls } from "./no-selection-controls";
import { default as PolylineControls } from "./polyline";
import { default as SeatControls } from "./seat";
import { default as SelectControls } from "./select";
import { default as ShapeControls } from "./shapes";

const transition = "transition-all duration-500";

const width = "w-[22rem]";

type IControlProps = Pick<ISTKProps, "options" | "styles">;

const Controls = ({ options, styles }: IControlProps) => {
  const open = useSelector((state: any) => state.editor.showControls);
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  const ControlComponent = useMemo(() => {
    if (selectedTool === Tool.Select) {
      if (selectedElementIds.length) {
        const firstElementType = document
          .getElementById(selectedElementIds[0])
          ?.getAttribute?.(dataAttributes.elementType);
        if (firstElementType === ElementType.Booth) return NoSelectionControls;
        if (selectedElementIds.length > 1) {
          const same = selectedElementIds.every((id) => {
            return document.getElementById(id)?.getAttribute?.(dataAttributes.elementType) === firstElementType;
          });
          if (!same) return NoSelectionControls;
        }
        return SelectControls;
      }
      return NoSelectedElement;
    }
    if (selectedTool === Tool.Seat) return SeatControls;
    if (selectedTool === Tool.Pen) return PolylineControls;
    if (selectedTool === Tool.Shape) return ShapeControls;
    if (selectedTool === Tool.Image) return ImageControls;
    return NoControls;
  }, [selectedTool, selectedElementIds]);

  return (
    <>
      <div className={twMerge("pointer-events-none grow-0 shrink-0", transition, open ? width : "w-0")} />
      <div
        id={ids.controls}
        className={twMerge(
          "py-5 px-6 h-[calc(100%-32px)] absolute top-0 border-t border-black overflow-y-auto",
          transition,
          width,
          open ? "right-0" : "-right-[22rem]"
        )}
      >
        <AnimatedSwitcher
          key={ControlComponent.name}
          component={<ControlComponent options={options} styles={styles} />}
        />
      </div>
    </>
  );
};

export default Controls;
