import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import { default as SeatSelectControls } from "./seats";
import { default as ShapeSelectControls } from "./shape";
import { default as TextSelectControls } from "./text";

const SelectControls = () => {
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const ControlComponent = useMemo(() => {
    const firstElementType = document.getElementById(selectedElementIds[0])?.getAttribute?.(dataAttributes.elementType);
    if (firstElementType === ElementType.Text) return TextSelectControls;
    if (firstElementType === ElementType.Shape) return ShapeSelectControls;
    return SeatSelectControls;
  }, [selectedElementIds]);

  return <ControlComponent />;
};

export default SelectControls;
