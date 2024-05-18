import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@/store";
import { deleteElements } from "@/store/reducers/editor";

const useDelete = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        if (!document.querySelectorAll("input:focus").length) {
          store.dispatch(deleteElements(selectedElementIds));
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [selectedElementIds]);
};

export default useDelete;
