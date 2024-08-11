import { useSelector } from "react-redux";
import { Button, Input, Label } from "@/components/core";
import { d3Extended } from "@/utils";

const GeneralSelectControls = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);
  const firstElement = d3Extended.selectById(selectedElementIds[0]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Label htmlFor="rotation-input">Rotation (deg)</Label>
        <Input
          id="rotation-input"
          key={firstElement?.rotation()}
          defaultValue={firstElement?.rotation()}
          type="number"
          min={-360}
          max={360}
          onChange={(e) => {
            selectedElementIds.forEach((id) => {
              d3Extended.selectById(id).style("transform", `rotate(${e.target.value}deg)`);
            });
          }}
        />
      </div>
      <Button
        className="py-[0.35rem]"
        variant="secondary"
        onClick={() => {
          selectedElementIds.forEach((id) => {
            d3Extended.selectById(id).moveToFront();
          });
        }}
      >
        Bring to Front
      </Button>
      <Button
        className="py-[0.35rem]"
        variant="secondary"
        onClick={() => {
          selectedElementIds.forEach((id) => {
            d3Extended.selectById(id).moveToBack();
          });
        }}
      >
        Send to Back
      </Button>
    </div>
  );
};

export default GeneralSelectControls;
