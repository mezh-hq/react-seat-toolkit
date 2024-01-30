import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { ids, selectors } from "@/constants";
import { store } from "@/store";
import { addBooth, addSeat, clearElements } from "@/store/reducers/editor";
import { getRelativeClickCoordsWithTransform } from "@/utils";
import { Tool } from "./toolbar/data";
import { boothSize } from "./workspace/elements/booth";

const EventHandlers = () => {
  const [transform, setTransform] = useState(null);

  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);
  const lastDeselectedElementId = useSelector((state) => state.editor.lastDeselectedElementId);
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

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

  useLayoutEffect(() => {
    const handler = (e) => {
      if (selectedTool == Tool.Seat) {
        store.dispatch(addSeat({ id: uuidV4(), ...getRelativeClickCoordsWithTransform(e, transform) }));
      } else if (selectedTool == Tool.Booth) {
        const coords = getRelativeClickCoordsWithTransform(e, transform);
        store.dispatch(addBooth({ id: uuidV4(), x: coords.x - boothSize / 2, y: coords.y - boothSize / 2 }));
      }
    };
    document.getElementById(ids.workspace).addEventListener("click", handler);
    return () => {
      document.getElementById(ids.workspace).removeEventListener("click", handler);
    };
  }, [selectedTool, transform]);

  useLayoutEffect(() => {
    const handler = (e) => {
      setTransform(e.detail);
    };
    document.querySelector(selectors.workspaceGroup).addEventListener("zoom", handler);
    return () => {
      document.querySelector(selectors.workspaceGroup).removeEventListener("zoom", handler);
    };
  }, []);

  return null;
};

export default EventHandlers;
