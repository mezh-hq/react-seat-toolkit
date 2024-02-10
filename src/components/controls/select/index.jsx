import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import { default as GeneralSelectControls } from "./general";
import { default as SeatSelectControls } from "./seats";
import { default as ShapeSelectControls } from "./shape";
import { default as TextSelectControls } from "./text";

const SelectControls = () => {
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const ControlComponent = useMemo(() => {
    const firstElementType = document.getElementById(selectedElementIds[0])?.getAttribute?.(dataAttributes.elementType);
    if (firstElementType === ElementType.Text) return TextSelectControls;
    if (firstElementType === ElementType.Shape) return ShapeSelectControls;
    if (firstElementType === ElementType.Image) return Fragment;
    return SeatSelectControls;
  }, [selectedElementIds]);

  return (
    <div className="flex flex-col gap-3">
      <ControlComponent />
      <GeneralSelectControls />
    </div>
  );
};

export default SelectControls;
