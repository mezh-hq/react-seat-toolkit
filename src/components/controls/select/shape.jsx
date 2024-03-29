import { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/core";
import { dataAttributes } from "@/constants";
import { d3Extended, rgbToHex } from "@/utils";
import { default as ControlInput } from "../control-input";

const ShapeSelectControls = () => {
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  const firstElement = document.getElementById(selectedElementIds[0]);

  return (
    <div className="flex flex-col gap-4 py-1">
      <div className="grid grid-cols-3 items-center gap-4">
        <ControlInput
          id="shape-width-input"
          label="Width"
          defaultValue={firstElement?.getAttribute("width")}
          type="number"
          onChange={(e) => {
            const aspectRatio = firstElement.getAttribute("width") / firstElement.getAttribute("height");
            selectedElementIds.forEach((id) => {
              document.getElementById(id)?.setAttribute("width", e.target.value);
              if (maintainAspectRatio) {
                const height = e.target.value / aspectRatio.toFixed(2);
                document.getElementById(id)?.setAttribute("height", height);
                document.getElementById("shape-height-input").value = height;
              }
            });
          }}
        />
        <ControlInput
          id="shape-height-input"
          label="Height"
          defaultValue={firstElement?.getAttribute("height")}
          type="number"
          onChange={(e) => {
            const aspectRatio = firstElement.getAttribute("width") / firstElement.getAttribute("height");
            selectedElementIds.forEach((id) => {
              document.getElementById(id)?.setAttribute("height", e.target.value);
              if (maintainAspectRatio) {
                const width = (e.target.value * aspectRatio).toFixed(2);
                document.getElementById(id)?.setAttribute("width", width);
                document.getElementById("shape-width-input").value = width;
              }
            });
          }}
        />

        <div className="col-span-3 w-full flex justify-end items-center gap-[2.3rem]">
          <Checkbox id="stk-aspect-ratio" checked={maintainAspectRatio} onCheckedChange={setMaintainAspectRatio} />
          <label
            htmlFor="stk-aspect-ratio"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Maintain Aspect Ratio
          </label>
        </div>

        {firstElement?.getAttribute?.(dataAttributes.shape) === "RectangleHorizontal" && (
          <ControlInput
            id="shape-border-radius-input"
            label="Border Radius"
            defaultValue={firstElement?.getAttribute("rx")}
            type="number"
            onChange={(e) => {
              selectedElementIds.forEach((id) => {
                document.getElementById(id)?.setAttribute("rx", e.target.value);
              });
            }}
          />
        )}
        <ControlInput
          id="shape-stroke-input"
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
          id="shape-fill-input"
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

export default ShapeSelectControls;
