import { useSelector } from "react-redux";
import { Label, RadioGroup, RadioGroupItem } from "@/components/core";
import { SeatStatus, dataAttributes } from "@/constants";
import { store } from "@/store";
import { updateSeat } from "@/store/reducers/editor";
import { d3Extended } from "@/utils";
import { default as ControlInput } from "../../control-input";
import { default as Categorizer } from "./categorizer";

const SeatSelectControls = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  const firstElement = document.getElementById(selectedElementIds[0]);

  const firstElementLabel = document.getElementById(`${selectedElementIds[0]}-label`);

  return (
    <div className="flex flex-col gap-4">
      <Categorizer firstElement={firstElement} selectedElementIds={selectedElementIds} />
      <div className="grid grid-cols-3 items-center gap-4">
        <ControlInput
          key={firstElementLabel?.textContent}
          id="seat-label-input"
          label="Label"
          defaultValue={firstElementLabel?.textContent}
          onChange={(e) => {
            selectedElementIds.forEach((id: string) => {
              store.dispatch(updateSeat({ id, label: e.target.value }));
            });
          }}
        />
        <RadioGroup
          key={firstElement?.getAttribute(dataAttributes.status)}
          defaultValue={firstElement?.getAttribute(dataAttributes.status) ?? SeatStatus.Available.toString()}
          onValueChange={(value) => {
            selectedElementIds.forEach((id: string) => {
              d3Extended.selectById(id).attr(dataAttributes.status, value);
            });
          }}
          className="flex justify-between gap-2 my-1"
        >
          {Object.values(SeatStatus).map((status) => {
            const id = `stk-seat-status-rg-${status}`;
            return (
              <div key={id} className="flex items-center gap-x-2">
                <RadioGroupItem value={status.toString()} id={id} />
                <Label htmlFor={id}>{status}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default SeatSelectControls;
