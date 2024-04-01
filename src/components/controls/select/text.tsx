import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/core";
import { store } from "@/store";
import { selectTextById, updateText } from "@/store/reducers/editor";
import { d3Extended, rgbToHex } from "@/utils";
import { default as ControlInput } from "../control-input";

const TextSelectControls = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);
  const firstTextElement = useSelector(selectTextById(selectedElementIds[0]));
  const firstElement = document.getElementById(selectedElementIds[0]);

  const onCheckedChange = useCallback(
    (value: boolean) => {
      store.dispatch(updateText({ ids: selectedElementIds, data: { embraceOffset: value } }));
    },
    [selectedElementIds]
  );

  return (
    <div className="flex flex-col gap-4 py-1">
      <div className="grid grid-cols-3 items-center gap-4">
        <ControlInput
          id="text-label-input"
          label="Label"
          defaultValue={firstElement?.textContent}
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              const element = document.getElementById(id);
              if (element) element.textContent = e.target.value;
            });
          }}
        />
        <ControlInput
          id="text-font-size-input"
          label="Font Size"
          defaultValue={firstElement?.getAttribute("font-size")}
          type="number"
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              document.getElementById(id)?.setAttribute("font-size", e.target.value);
            });
          }}
        />
        <ControlInput
          id="text-font-weight-input"
          label="Font Weight"
          defaultValue={firstElement?.getAttribute("font-weight")}
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
        <ControlInput
          id="text-letter-spacing-input"
          label="Letter Spacing"
          defaultValue={firstElement?.getAttribute("letter-spacing")}
          type="number"
          step={0.1}
          min={0}
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              document.getElementById(id)?.setAttribute("letter-spacing", e.target.value);
            });
          }}
        />
        <ControlInput
          id="text-color-input"
          label="Color"
          defaultValue={rgbToHex(d3Extended.select(firstElement).style("stroke"))}
          type="color"
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              const element = d3Extended.selectById(id);
              element.style("stroke", e.target.value);
              element.style("color", e.target.value);
            });
          }}
        />
        <div className="col-span-3 w-full flex justify-end items-center gap-[2.3rem]">
          <Checkbox
            id="stk-embrace-offset-marker"
            checked={firstTextElement.embraceOffset}
            onCheckedChange={onCheckedChange}
          />
          <label
            htmlFor="stk-embrace-offset-marker"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Embrace Visibility Offset
          </label>
        </div>
      </div>
    </div>
  );
};

export default TextSelectControls;
