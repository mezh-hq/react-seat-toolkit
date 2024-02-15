import { useSelector } from "react-redux";
import { d3Extended, rgbToHex } from "@/utils";
import { default as ControlInput } from "../control-input";

const PolylineSelectControls = () => {
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const firstElement = document.getElementById(selectedElementIds[0]);

  return (
    <div className="flex flex-col gap-4 py-1">
      <div className="grid grid-cols-3 items-center gap-4">
        <ControlInput
          id="polyline-stroke-input"
          label="Stroke"
          defaultValue={rgbToHex(d3Extended.select(firstElement).style("stroke"))}
          type="color"
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              d3Extended.selectById(id).style("stroke", e.target.value);
            });
          }}
        />
        <ControlInput
          id="polyline-fill-input"
          label="Fill"
          defaultValue={rgbToHex(d3Extended.select(firstElement).style("color"))}
          type="color"
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              d3Extended.selectById(id).style("color", e.target.value);
            });
          }}
        />
      </div>
    </div>
  );
};

export default PolylineSelectControls;
