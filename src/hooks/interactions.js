import { useEffect } from "react";
import { default as interact } from "interactjs";

export const resizeCursors = ["ns-resize", "ew-resize", "nwse-resize", "nesw-resize"];

const useInteractions = () => {
  useEffect(() => {
    interact(".resizable").resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          var target = event.target;
          target.setAttribute("width", event.rect.width);
          target.setAttribute("height", event.rect.height);
        }
      }
    });
  }, []);
};

export default useInteractions;
