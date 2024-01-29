import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@/store";
import { clearElements } from "@/store/reducers/editor";

const EventHandlers = () => {
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);
  const lastDeselectedElementId = useSelector((state) => state.editor.lastDeselectedElementId);

  useEffect(() => {
    const onElemClick = (e) => {
      if (!selectedElementIds.includes(e.target.id) && lastDeselectedElementId !== e.target.id)
        store.dispatch(clearElements());
    };
    document.addEventListener("click", onElemClick);
    return () => {
      document.removeEventListener("click", onElemClick);
    };
  }, [selectedElementIds]);

  return null;
};

export default EventHandlers;
