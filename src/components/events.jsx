import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { ids } from "@/constants";
import { store } from "@/store";
import {
  addBooth,
  addSeat,
  addText,
  clearElements,
  deleteBooth,
  deleteSeat,
  deleteText
} from "@/store/reducers/editor";
import { getRelativeClickCoordsWithTransform } from "@/utils";
import { Tool } from "./toolbar/data";
import { boothSize } from "./workspace/elements/booth";

const EventHandlers = () => {
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
        store.dispatch(addSeat({ id: uuidV4(), ...getRelativeClickCoordsWithTransform(e) }));
      } else if (selectedTool == Tool.Booth) {
        const coords = getRelativeClickCoordsWithTransform(e);
        store.dispatch(addBooth({ id: uuidV4(), x: coords.x - boothSize / 2, y: coords.y - boothSize / 2 }));
      } else if (selectedTool == Tool.Text) {
        const coords = getRelativeClickCoordsWithTransform(e);
        store.dispatch(addText({ id: uuidV4(), x: coords.x, y: coords.y + 15, label: "Edit this in the sidebar" }));
      } else if (selectedTool == Tool.Eraser) {
        if (e.target.nodeName === "circle") {
          store.dispatch(deleteSeat(e.target.id));
        } else if (e.target.nodeName === "rect") {
          store.dispatch(deleteBooth(e.target.id));
        } else if (e.target.nodeName === "text") {
          store.dispatch(deleteText(e.target.id));
        }
      }
    };
    document.getElementById(ids.workspace)?.addEventListener("click", handler);
    return () => {
      document.getElementById(ids.workspace)?.removeEventListener("click", handler);
    };
  }, [selectedTool]);

  return null;
};

export default EventHandlers;
