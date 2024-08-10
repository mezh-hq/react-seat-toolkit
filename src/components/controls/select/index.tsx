import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import { ISTKProps } from "@/types";
import { default as GeneralSelectControls } from "./general";
import { default as ImageSelectControls } from "./image";
import { default as PolylineSelectControls } from "./polyline";
import { default as SeatSelectControls } from "./seats";
import { default as ShapeSelectControls } from "./shape";
import { default as TextSelectControls } from "./text";

type IControlProps = Pick<ISTKProps, "options" | "styles">;

const SelectControls = ({ options, styles }: IControlProps) => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  const ControlComponent = useMemo(() => {
    const firstElementType = document.getElementById(selectedElementIds[0])?.getAttribute?.(dataAttributes.elementType);
    if (firstElementType === ElementType.Text) return TextSelectControls;
    if (firstElementType === ElementType.Shape) return ShapeSelectControls;
    if (firstElementType === ElementType.Polyline) return PolylineSelectControls;
    if (firstElementType === ElementType.Image) return ImageSelectControls;
    if (firstElementType === ElementType.Booth) return Fragment;
    return SeatSelectControls;
  }, [selectedElementIds]);

  return (
    <div className="flex flex-col gap-3">
      <ControlComponent options={options} styles={styles} />
      <GeneralSelectControls />
    </div>
  );
};

export default SelectControls;
