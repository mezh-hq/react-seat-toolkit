import { useEffect } from "react";
import { selectors } from "@/constants";
import { d3Extended } from "@/utils";
import "@interactjs/actions/resize";
import "@interactjs/auto-start";
import { default as interact } from "@interactjs/interact";

export const resizeCursors = ["ns-resize", "ew-resize", "nwse-resize", "nesw-resize"];

const resizeAttributes = ["width", "height"];

const useInteractions = () => {
  useEffect(() => {
    interact(".resizable").resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      invert: "reposition",
      listeners: {
        move(event) {
          const target = event.target;
          const zoom = d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup));
          for (const attr of resizeAttributes) {
            let v = +target.getAttribute(attr);
            v += (event.deltaRect[attr] * 1) / zoom.k;
            target.setAttribute(attr, Math.round(v / 10) * 10);
          }
        }
      }
    });
  }, []);
};

export default useInteractions;
