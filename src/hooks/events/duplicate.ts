import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { addSeat, clearAndSelectElements } from "@/store/reducers/editor";

const useDuplicate = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  useEffect(() => {
    const handler = (e) => {
      const ctrlPressed = e.ctrlKey || e.metaKey;
      if (ctrlPressed && e.key === "d" && selectedElementIds?.length) {
        e.preventDefault();
        const newIds = [];
        selectedElementIds.forEach((id: string) => {
          const element = document.getElementById(id);
          const elementType = element.getAttribute(dataAttributes.elementType);
          if (elementType === ElementType.Seat) {
            const seat = {
              id: uuidV4(),
              x: Number(element.getAttribute("cx")) + 5,
              y: Number(element.getAttribute("cy")) + 5
            };
            store.dispatch(addSeat(seat));
            newIds.push(seat.id);
          }
        });
        store.dispatch(clearAndSelectElements(newIds));
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [selectedElementIds]);
};

export default useDuplicate;
