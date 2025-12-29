import { useLayoutEffect } from "react";
import { RectangleHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { Tool } from "@/components/toolbar/data";
import { ElementType } from "@/components/workspace/elements";
import { seatSizeHalf } from "@/components/workspace/elements/seat";
import { resizableRectangle, shapeSize } from "@/components/workspace/elements/shape";
import { dataAttributes, ids } from "@/constants";
import { store } from "@/store";
import {
  addPolyline,
  addPolylinePoint,
  addSeat,
  addShape,
  addText,
  deleteImage,
  deletePolyline,
  deleteSeat,
  deleteShape,
  deleteText,
  selectElement,
  setSelectedPolylineId
} from "@/store/reducers/editor";
import { selectTool } from "@/store/reducers/toolbar";
import { SeatStatus } from "@/types/elements";
import { calculateDistance, getRelativeClickCoordsWithTransform } from "@/utils";

const useWorkspaceClick = () => {
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);

  useLayoutEffect(() => {
    const handler = (e) => {
      if (selectedTool == Tool.Seat) {
        const square = store.getState().toolbar.selectedSubTool === "Square";
        const coords = getRelativeClickCoordsWithTransform(e);
        const offset = square ? seatSizeHalf : 0;
        store.dispatch(
          addSeat({
            id: uuidV4(),
            x: coords.x - offset,
            y: coords.y - offset,
            label: "?",
            status: SeatStatus.Available,
            square
          })
        );
      } else if (selectedTool == Tool.Text) {
        const id = uuidV4();
        const coords = getRelativeClickCoordsWithTransform(e);
        store.dispatch(addText({ id, x: coords.x - 68, y: coords.y + 11, label: "Edit me!" }));
      } else if (selectedTool == Tool.Shape) {
        const cursor = store.getState().editor.cursor;
        const coords = getRelativeClickCoordsWithTransform(e);
        const shape = { id: uuidV4(), x: coords.x, y: coords.y, name: cursor.displayName } as any;
        if (shape.name === RectangleHorizontal.displayName) {
          shape.width = resizableRectangle.width * 0.83;
          shape.height = resizableRectangle.height;
          shape.x -= shape.width / 2;
          shape.y -= shape.height / 2;
        } else {
          shape.x -= shapeSize / 2;
          shape.y -= shapeSize / 2;
        }
        store.dispatch(addShape(shape));
      } else if (selectedTool == Tool.Pen) {
        const selectedPolylineId = store.getState().editor.selectedPolylineId;
        const coords = getRelativeClickCoordsWithTransform(e);
        if (selectedPolylineId) {
          const selectedPolyline = store
            .getState()
            .editor.polylines.find((polyline) => polyline.id === selectedPolylineId);
          if (selectedPolyline.points.find((point) => calculateDistance(point, coords) <= 5)) {
            store.dispatch(setSelectedPolylineId(null));
            store.dispatch(selectElement(selectedPolylineId));
            store.dispatch(selectTool(Tool.Select));
          }
          store.dispatch(addPolylinePoint({ id: selectedPolylineId, point: coords }));
        } else {
          const id = uuidV4();
          store.dispatch(setSelectedPolylineId(id));
          store.dispatch(
            addPolyline({
              id,
              points: [coords]
            })
          );
        }
      } else if (selectedTool == Tool.Eraser) {
        if (e.target.parentNode.nodeName === "svg" && e.target.id !== ids.workspace) {
          store.dispatch(deleteShape(e.target.id || e.target.parentNode.id));
        } else if (e.target.nodeName === "circle") {
          store.dispatch(deleteSeat(e.target.id));
        } else if (e.target.nodeName === "rect") {
          if (e.target.getAttribute(dataAttributes.elementType) === ElementType.Shape) {
            store.dispatch(deleteShape(e.target.id));
          } else if (e.target.getAttribute(dataAttributes.elementType) === ElementType.Seat) {
            store.dispatch(deleteSeat(e.target.id));
          }
        } else if (e.target.nodeName === "text") {
          store.dispatch(deleteText(e.target.id));
        } else if (e.target.nodeName === "image") {
          store.dispatch(deleteImage(e.target.id));
        } else if (e.target.nodeName === "polyline") {
          store.dispatch(deletePolyline(e.target.id));
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

export default useWorkspaceClick;
