import { useEffect } from "react";
import { selectors } from "@/constants";
import { d3Extended } from "@/utils";
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
          const width = +event.target.getAttribute("width");
          const height = +event.target.getAttribute("height");
          const aspectRatio = width / height;
          const zoom = d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup));
          let dx = event.deltaRect.width;
          let dy = event.deltaRect.height;
          if (event.shiftKey) {
            dy = dx / aspectRatio;
          }
          if (zoom.k < 1) {
            dx *= 1 / zoom.k;
            dy *= 1 / zoom.k;
          }
          target.setAttribute("width", Math.abs(width + dx));
          target.setAttribute("height", Math.abs(height + dy));
        }
      }
    });
  }, []);
};

export default useInteractions;
