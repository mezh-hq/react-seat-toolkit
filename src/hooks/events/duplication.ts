import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import { addImage, addPolyline, addSeat, addShape, addText, clearAndSelectElements } from "@/store/reducers/editor";

const offset = 5;

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
          let copy = null;
          if (elementType === ElementType.Seat) {
            copy = {
              id: uuidV4(),
              x: Number(element.getAttribute("cx")) + offset,
              y: Number(element.getAttribute("cy")) + offset,
              label: document.getElementById(`${id}-label`)?.textContent,
              status: element.getAttribute(dataAttributes.status)
            };
            store.dispatch(addSeat(copy));
          } else if (elementType === ElementType.Text) {
            copy = {
              id: uuidV4(),
              x: Number(element.getAttribute("x")) + offset,
              y: Number(element.getAttribute("y")) + offset,
              fontSize: Number(element.getAttribute("font-size")),
              fontWeight: element.getAttribute("font-weight"),
              letterSpacing: Number(element.getAttribute("letter-spacing")),
              label: element.textContent
            };
            store.dispatch(addText(copy));
          } else if (elementType === ElementType.Shape) {
            copy = {
              id: uuidV4(),
              x: Number(element.getAttribute("x")) + offset,
              y: Number(element.getAttribute("y")) + offset,
              width: Number(element.getAttribute("width")),
              height: Number(element.getAttribute("height")),
              rx: Number(element.getAttribute("rx")),
              name: element.getAttribute(dataAttributes.shape)
            };
            store.dispatch(addShape(copy));
          } else if (elementType === ElementType.Polyline) {
            copy = {
              id: uuidV4(),
              points: element
                .getAttribute("points")
                .split(" ")
                .map((point) => {
                  const [x, y] = point.split(",");
                  return {
                    x: Number(x) + offset,
                    y: Number(y) + offset
                  };
                })
            };
            store.dispatch(addPolyline(copy));
          } else if (elementType === ElementType.Image) {
            copy = {
              id: uuidV4(),
              x: Number(element.getAttribute("x")) + offset,
              y: Number(element.getAttribute("y")) + offset,
              href: element.getAttribute("href"),
              width: Number(element.getAttribute("width")),
              height: Number(element.getAttribute("height"))
            };
            store.dispatch(addImage(copy));
          }
          copy && newIds.push(copy.id);
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
