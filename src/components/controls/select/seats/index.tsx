import { useSelector } from "react-redux";
import { store } from "@/store";
import { updateSeat } from "@/store/reducers/editor";
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
      </div>
    </div>
  );
};

export default SeatSelectControls;
