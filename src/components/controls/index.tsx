import { useMemo } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids } from "@/constants";
import { store } from "@/store";
import { toggleControls } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { AnimatedSwitcher, IconButton } from "../core";
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

const onCogClick = () => store.dispatch(toggleControls());

const transition = "transition-all duration-500 ease-in-out";

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
    <div
      id={ids.controls}
      className={twMerge(
        "h-full bg-white border-l shadow-lg border-border absolute top-0 overflow-y-auto z-10",
        transition,
        width,
        open ? "right-0" : "-right-[22rem]"
      )}
    >
      <div className="flex justify-between items-center gap-4 h-14 border-b border-border box-content px-5">
        <h5>Settings</h5>
        <IconButton
          className="w-6 h-6 p-0 shrink-0"
          variant="secondary"
          icon={<X className="w-4 h-4" />}
          onClick={onCogClick}
        />
      </div>
      <AnimatedSwitcher
        key={ControlComponent.name}
        component={<ControlComponent options={options} styles={styles} />}
        className="py-4 px-5"
      />
    </div>
  );
};

export default Controls;
