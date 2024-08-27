import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Label, Switch } from "@/components/core";
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
  const [state, setState] = useState<undefined | SeatStatus>();
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

  useEffect(() => {
    if (selectedElementIds?.length) {
      setState((firstElement?.getAttribute(dataAttributes.status) as SeatStatus) || undefined);
    } else {
      setState(undefined);
    }
  }, [selectedElementIds, firstElement]);

  return (
    <div className="flex flex-col gap-5">
      <Categorizer firstElement={firstElement} selectedElementIds={selectedElementIds} {...props} />
      <div className="flex flex-col gap-3">
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
        <Button className="py-[0.35rem]" variant="secondary" onClick={setIncrementalLabels}>
          Set Incremental Labels
        </Button>
      )}
      <div className="w-full flex flex-col gap-3">
        {Object.values(SeatStatus).map((status) => {
          const id = `stk-seat-status-rg-${status}`;
          return (
            <div key={id} className="flex items-center gap-2 justify-between">
              <Label htmlFor={id}>{status}</Label>
              <Switch
                id={id}
                checked={status === state}
                onCheckedChange={() => {
                  selectedElementIds.forEach((id: string) => {
                    const seat = d3Extended.selectById(id);
                    const seatLabel = d3Extended.selectById(`${id}-label`);
                    seat.attr(dataAttributes.status, status);
                    setState(status);
                    let color = seatStatusColors[status].background;
                    let textColor = seatStatusColors[status].label;
                    if (status === SeatStatus.Available) {
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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatSelectControls;
