import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { ids } from "@/constants";
import { store } from "@/store";
import {
  addBooth,
  addSeat,
  addShape,
  addText,
  clearElements,
  deleteBooth,
  deleteSeat,
  deleteShape,
  deleteText,
  selectElement,
  showControls
} from "@/store/reducers/editor";
import { getRelativeClickCoordsWithTransform } from "@/utils";
import { Tool } from "./toolbar/data";
import { ElementType } from "./workspace/elements";
import { boothSize } from "./workspace/elements/booth";
import { shapeSize } from "./workspace/elements/shape";

const EventHandlers = () => {
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);
  const lastDeselectedElementId = useSelector((state) => state.editor.lastDeselectedElementId);
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

  useEffect(() => {
    const onElemClick = (e) => {
      let id = e.target.id;
      const elementType = e.target.parentNode.getAttribute("data-element-type");
      if (elementType === ElementType.Shape) id = e.target.parentNode.id;
      if (!selectedElementIds.includes(id) && lastDeselectedElementId !== id) {
        store.dispatch(clearElements(selectedTool === Tool.Text && id === ids.workspace));
      }
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
        const id = uuidV4();
        const coords = getRelativeClickCoordsWithTransform(e);
        store.dispatch(addText({ id, x: coords.x - 68, y: coords.y + 11, label: "Edit me!" }));
        store.dispatch(selectElement(id));
        store.dispatch(showControls());
      } else if (selectedTool == Tool.Shapes) {
        const cursor = store.getState().editor.cursor;
        const coords = getRelativeClickCoordsWithTransform(e);
        store.dispatch(
          addShape({ id: uuidV4(), x: coords.x - shapeSize / 2, y: coords.y - shapeSize / 2, name: cursor.displayName })
        );
      } else if (selectedTool == Tool.Eraser) {
        if (e.target.nodeName === "circle") {
          store.dispatch(deleteSeat(e.target.id));
        } else if (e.target.nodeName === "rect") {
          store.dispatch(deleteBooth(e.target.id));
        } else if (e.target.nodeName === "text") {
          store.dispatch(deleteText(e.target.id));
        } else if (e.srcElement.nodeName === "svg" && e.target.id !== ids.workspace) {
          store.dispatch(deleteShape(e.target.id));
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
