import { useEffect } from "react";
import "@interactjs/actions/resize";
import "@interactjs/auto-start";
import { default as interact } from "@interactjs/interact";

export const resizeCursors = ["ns-resize", "ew-resize", "nwse-resize", "nesw-resize"];

const useInteractions = () => {
  useEffect(() => {
    interact(".resizable").resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          const target = event.target;
          target.setAttribute("width", event.rect.width);
          target.setAttribute("height", event.rect.height);
        }
      }
    });
  }, []);
};

export default useInteractions;
