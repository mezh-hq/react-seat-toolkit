import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDetailedSeat } from "@/components/workspace/elements";
import { store } from "@/store";
import { ISTKProps } from "@/types";

const useSeatSelectionChange = (props: ISTKProps) => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  useEffect(() => {
    if (props.events?.onSeatSelectionChange) {
      const { seats, categories, sections } = store.getState().editor;
      const selectedSeats = [];
      seats.forEach((seat) => {
        if (selectedElementIds.includes(seat.id)) {
          const category = categories?.find?.((c) => c.id === seat.category);
          const section = sections?.find?.((s) => s.id === category?.section);
          selectedSeats.push(getDetailedSeat(seat, category, section));
        }
      });
      props.events.onSeatSelectionChange(selectedSeats);
    }
  }, [selectedElementIds]);
};

export default useSeatSelectionChange;
