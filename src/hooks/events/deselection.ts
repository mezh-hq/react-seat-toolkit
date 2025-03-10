import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ElementType } from "@/components/workspace/elements";
import { Tool } from "@/constants";
import { dataAttributes, ids } from "@/constants";
import { store } from "@/store";
import { clearElements } from "@/store/reducers/editor";
import { isWithinBounds } from "@/utils";

const useDeselection = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);
  const lastDeselectedElementId = useSelector((state: any) => state.editor.lastDeselectedElementId);
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);

  useEffect(() => {
    const onElemClick = (e) => {
      let id = e.target.id;
      const elementType = e.target.parentNode?.getAttribute?.(dataAttributes.elementType);
      if (elementType === ElementType.Shape) id = e.target.parentNode.id;
      if (
        !selectedElementIds.includes(id) &&
        lastDeselectedElementId !== id &&
        ![id, e.target.parentNode?.id].includes(ids.operationTrigger) &&
        selectedElementIds.length &&
        !isWithinBounds(e.clientX, e.clientY, document.getElementById(ids.controls)?.getBoundingClientRect())
      ) {
        store.dispatch(clearElements(selectedTool === Tool.Text && id === ids.workspace));
      }
    };
    document.addEventListener("click", onElemClick);
    return () => {
      document.removeEventListener("click", onElemClick);
    };
  }, [selectedElementIds]);
};

export default useDeselection;
