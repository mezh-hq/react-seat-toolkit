import { useSelector } from "react-redux";
import { selectPolylineById } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { d3Extended, rgbToHex } from "@/utils";
import { default as ControlInput } from "../../control-input";
import { default as SectionSelector } from "./section-selector";

type IControlProps = Pick<ISTKProps, "options" | "styles">;

const PolylineSelectControls = (props: IControlProps) => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);
  const firstPolyline = useSelector(selectPolylineById(selectedElementIds[0]));
  const firstElement = document.getElementById(selectedElementIds[0]);

  return (
    <div className="flex flex-col gap-5">
      <SectionSelector firstElement={firstElement} selectedElementIds={selectedElementIds} {...props} />
      <div className="flex flex-col gap-3">
        <ControlInput
          id="polyline-stroke-input"
          label="Stroke"
          defaultValue={rgbToHex(d3Extended.select(firstElement)?.style("stroke"))}
          type="color"
          disabled={!!firstPolyline.section}
          onChange={(e) => {
            selectedElementIds.forEach((id: string) => {
              d3Extended.selectById(id).style("stroke", e.target.value);
            });
          }}
          className="p-0 px-[.125rem]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <ControlInput
          id="polyline-fill-input"
          label="Fill"
          defaultValue={rgbToHex(d3Extended.select(firstElement)?.style("color"))}
          type="color"
          disabled={!!firstPolyline.section}
          onChange={(e) => {
            selectedElementIds.forEach((id: string) => {
              d3Extended.selectById(id).style("color", e.target.value);
            });
          }}
          className="p-0 px-[.125rem]"
        />
      </div>
    </div>
  );
};

export default PolylineSelectControls;
