import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/core";
import { store } from "@/store";
import { selectPolylineById, updatePolyline } from "@/store/reducers/editor";
import { d3Extended, rgbToHex } from "@/utils";
import { default as ControlInput } from "../../control-input";
import { default as SectionSelector } from "./section-selector";

const PolylineSelectControls = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);
  const firstPolyline = useSelector(selectPolylineById(selectedElementIds[0]));
  const firstElement = document.getElementById(selectedElementIds[0]);

  const onCheckedChange = useCallback(
    (value: boolean) => {
      selectedElementIds.forEach((id: string) => {
        store.dispatch(updatePolyline({ id, freeSeating: value }));
      });
    },
    [selectedElementIds]
  );

  return (
    <div className="flex flex-col gap-4 py-1">
      <SectionSelector firstElement={firstElement} selectedElementIds={selectedElementIds} />
      <div className="grid grid-cols-3 items-center gap-4">
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
        />
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
        />
        <div className="col-span-3 w-full flex justify-end items-center gap-[2.3rem]">
          <Checkbox
            id="stk-free-section-marker"
            checked={firstPolyline.freeSeating}
            onCheckedChange={onCheckedChange}
            disabled={!!firstPolyline.section}
          />
          <label
            htmlFor="stk-free-section-marker"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Free seating section
          </label>
        </div>
      </div>
    </div>
  );
};

export default PolylineSelectControls;
