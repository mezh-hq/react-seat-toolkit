import { useSelector } from "react-redux";
import { Button, Label, RadioGroup, RadioGroupItem } from "@/components/core";
import { dataAttributes, seatStatusColors } from "@/constants";
import { store } from "@/store";
import { updateSeatLabels, updateSeats } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { SeatStatus } from "@/types/elements";
import { d3Extended } from "@/utils";
import { default as ControlInput } from "../../control-input";
import { default as Categorizer } from "./categorizer";

type IControlProps = Pick<ISTKProps, "options" | "styles">;

const SeatSelectControls = (props: IControlProps) => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  const firstElement = document.getElementById(selectedElementIds[0]);

  const firstElementLabel = document.getElementById(`${selectedElementIds[0]}-label`);

  const setIncrementalLabels = () => {
    store.dispatch(
      updateSeatLabels(
        selectedElementIds.map((id: string, index: number) => ({
          id,
          label: `${document.getElementById(`${id}-label`)?.textContent}${index + 1}`
        }))
      )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Categorizer firstElement={firstElement} selectedElementIds={selectedElementIds} {...props} />
      <div className="grid grid-cols-3 items-center gap-4">
        <ControlInput
          key={firstElementLabel?.textContent}
          id="seat-label-input"
          label="Label"
          defaultValue={firstElementLabel?.textContent}
          onChange={(e) => {
            store.dispatch(updateSeats({ ids: selectedElementIds, data: { label: e.target.value } }));
          }}
        />
      </div>
      {selectedElementIds.length > 1 && (
        <Button className="max-w-56 py-1.5 text-xs self-end" onClick={setIncrementalLabels}>
          Set Incremental Labels
        </Button>
      )}
      <RadioGroup
        key={selectedElementIds?.join(",")}
        defaultValue={firstElement?.getAttribute(dataAttributes.status) ?? SeatStatus.Available.toString()}
        onValueChange={(value) => {
          selectedElementIds.forEach((id: string) => {
            const seat = d3Extended.selectById(id);
            const seatLabel = d3Extended.selectById(`${id}-label`);
            seat.attr(dataAttributes.status, value);
            let color = seatStatusColors[value].background;
            let textColor = seatStatusColors[value].label;
            if (value === SeatStatus.Available) {
              const category = store
                .getState()
                .editor.categories.find((c) => c.id === seat.attr(dataAttributes.category));
              if (category) {
                color = category.color;
                textColor = category.textColor;
              }
            }
            seat.style("color", color);
            seatLabel?.style("stroke", textColor);
          });
        }}
        className="w-full flex flex-wrap flex-row-reverse items-end gap-2 gap-y-4 my-1"
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
  );
};

export default SeatSelectControls;
