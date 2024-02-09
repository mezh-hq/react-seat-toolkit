import { useSelector } from "react-redux";
import * as d3 from "d3";
import { Input, Label } from "@/components/core";
import { d3Extended, rgbToHex } from "@/utils";

const TextSelectControls = () => {
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const firstElement = document.getElementById(selectedElementIds[0]);

  return (
    <div className="flex flex-col gap-4 py-1">
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="text-label-input">Label</Label>
        <Input
          id="text-label-input"
          defaultValue={firstElement?.textContent}
          className="col-span-2 h-8"
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              const element = document.getElementById(id);
              if (element) element.textContent = e.target.value;
            });
          }}
        />
        <Label htmlFor="text-font-size-input">Font Size</Label>
        <Input
          id="text-font-size-input"
          defaultValue={firstElement?.getAttribute("font-size")}
          className="col-span-2 h-8"
          type="number"
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              document.getElementById(id)?.setAttribute("font-size", e.target.value);
            });
          }}
        />
        <Label htmlFor="text-font-weight-input">Font Weight</Label>
        <Input
          id="text-font-weight-input"
          defaultValue={firstElement?.getAttribute("font-weight")}
          className="col-span-2 h-8"
          type="number"
          step={100}
          min={100}
          max={900}
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              document.getElementById(id)?.setAttribute("font-weight", e.target.value);
            });
          }}
        />
        <Label htmlFor="text-letter-spacing-input">Letter Spacing</Label>
        <Input
          id="text-letter-spacing-input"
          defaultValue={firstElement?.getAttribute("letter-spacing")}
          className="col-span-2 h-8"
          type="number"
          step={0.1}
          min={0}
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              document.getElementById(id)?.setAttribute("letter-spacing", e.target.value);
            });
          }}
        />
        <Label htmlFor="text-color-input">Color</Label>
        <Input
          id="text-color-input"
          defaultValue={rgbToHex(d3.select(firstElement).style("stroke"))}
          className="col-span-2 h-8"
          type="color"
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              d3Extended.selectById(id).style("stroke", e.target.value);
            });
          }}
        />
      </div>
    </div>
  );
};

export default TextSelectControls;
