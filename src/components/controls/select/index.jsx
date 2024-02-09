import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import SeatSelectControls from "./seats";
import TextSelectControls from "./text";

const SelectControls = () => {
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const ControlComponent = useMemo(() => {
    const firstElementType = document.getElementById(selectedElementIds[0])?.getAttribute?.(dataAttributes.elementType);
    if (firstElementType === ElementType.Text) return TextSelectControls;
    return SeatSelectControls;
  }, [selectedElementIds]);

  return <ControlComponent />;
};

export default SelectControls;
