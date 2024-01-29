import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@/store";
import { clearElement } from "@/store/reducers/editor";

const EventHandlers = () => {
  const selectedElementId = useSelector((state) => state.editor.selectedElementId);

  useEffect(() => {
    const onElemClick = (e) => {
      if (selectedElementId != e.target.id) store.dispatch(clearElement());
    };
    document.addEventListener("click", onElemClick);
    return () => {
      document.removeEventListener("click", onElemClick);
    };
  }, [selectedElementId]);

  return null;
};

export default EventHandlers;
