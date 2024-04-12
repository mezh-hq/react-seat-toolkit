import { useLayoutEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { default as debounce } from "lodash/debounce";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids, selectors } from "@/constants";
import { useSkipFirstRender } from "@/hooks";
import type { ISTKProps } from "@/types";
import { d3Extended } from "@/utils";
import { Tool } from "../toolbar/data";
import { showPostOffsetElements, showPreOffsetElements } from "./elements";

const handleElementVisibility = debounce((workspace, k) => {
  const visibilityOffset = +workspace.attr(dataAttributes.visibilityOffset) || 0;
  if (k * 1.1 < visibilityOffset) {
    showPreOffsetElements();
  } else {
    showPostOffsetElements();
  }
}, 25);

function handleZoom(e) {
  const workspace = d3Extended.select(selectors.workspaceGroup);
  handleElementVisibility(workspace, e.transform.k);
  workspace.attr("transform", e.transform);
}

const zoom = d3Extended.zoom().on("zoom", handleZoom);

const zoomIn = () => {
  d3Extended.selectById(ids.workspace).transition().call(zoom.scaleBy, 1.1);
};

const zoomOut = () => {
  d3Extended.selectById(ids.workspace).transition().call(zoom.scaleBy, 0.9);
};

export const panLeft = (by = 50, duration = 250) => {
  d3Extended.selectById(ids.workspace).transition().duration(duration).call(zoom.translateBy, by, 0);
};

export const panRight = (by = 50, duration = 250) => {
  d3Extended
    .selectById(ids.workspace)
    .transition()
    .duration(duration)
    .call(zoom.translateBy, -1 * by, 0);
};

export const panUp = (by = 50, duration = 250) => {
  d3Extended.selectById(ids.workspace).transition().duration(duration).call(zoom.translateBy, 0, by);
};

export const panDown = (by = 50, duration = 250) => {
  d3Extended
    .selectById(ids.workspace)
    .transition()
    .duration(duration)
    .call(zoom.translateBy, 0, -1 * by);
};

export const panAndZoom = ({ k, x, y }) => {
  d3Extended.selectById(ids.workspace).call(zoom.transform, d3Extended.zoomIdentity.translate(x, y).scale(k));
};

export const panAndZoomToArea = ({ k, x, y }) => {
  const transform = d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup));
  const { height: workspaceheight, width: workspaceWidth } = d3Extended.selectionBounds(
    d3Extended.selectById(ids.workspace)
  );
  const newX = x * (x > workspaceWidth / 2 ? -1 : 1) * transform.k * 0.75;
  const newY = (workspaceheight - y) * (y > workspaceheight / 2 ? -1 : 1);
  d3Extended
    .selectById(ids.workspace)
    .transition()
    .duration(1000)
    .call(zoom.transform, d3Extended.zoomIdentity.translate(newX, newY).scale(k));
};

const panHandleClasses =
  "absolute z-10 text-black/40 cursor-pointer hover:text-black/80 transition-all duration-medium";

const Zoom = (props: Pick<ISTKProps, "mode" | "styles" | "options">) => {
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);
  const showControls = useSelector((state: any) => state.editor.showControls);

  useLayoutEffect(() => {
    const selection = d3Extended.selectById(ids.workspace);
    selection.on("zoom", null);
    if (selectedTool == Tool.Pan) {
      selection.call(zoom);
    } else {
      selection.call(zoom).on("wheel.zoom", (e) => {
        e.preventDefault();
        const currentZoom = selection.property("__zoom").k || 1;
        if (e.ctrlKey) {
          const nextZoom = currentZoom * Math.pow(2, -e.deltaY * 0.01);
          zoom.scaleTo(selection, nextZoom, d3Extended.pointer(e));
        } else {
          zoom.translateBy(selection, -(e.deltaX / currentZoom), -(e.deltaY / currentZoom));
        }
      });
    }
  }, [selectedTool]);

  useSkipFirstRender(() => {
    const workspace = d3Extended.selectById(ids.workspace);
    const controlTransformActive = workspace.attr("control-transform-active");
    if (showControls) {
      if (!controlTransformActive) {
        workspace.attr("control-transform-active", "true");
        workspace.transition().call(zoom.translateBy, -144, 0);
      }
    } else {
      if (controlTransformActive) {
        workspace.attr("control-transform-active", null);
        workspace.transition().call(zoom.translateBy, 144, 0);
      }
    }
  }, [showControls]);

  const zoomStyles = props.styles?.zoomControls;
  const panStyles = props.styles?.panControls;

  return (
    <>
      <div
        id={ids.panControls}
        className={twMerge(
          "absolute bottom-[7.5rem] left-10 h-20 w-20 bg-white rounded-full border border-black/20 after:bg-black/5",
          props.mode === "user" && "bottom-[5.25rem] left-9 md:bottom-[6rem] md:left-12",
          panStyles?.root?.className
        )}
        style={panStyles?.root?.properties}
      >
        <div className="absolute top-0 left-0 h-full w-full p-[1.125rem] z-20 pointer-events-none">
          <div
            className={twMerge(
              "h-full w-full rounded-full bg-white border-2 border-black/50",
              panStyles?.innerRing?.className
            )}
            style={panStyles?.innerRing?.properties}
          />
        </div>
        <ChevronLeft
          size={17}
          className={twMerge(panHandleClasses, "left-0 top-[40%]", panStyles?.handles?.left?.className)}
          onClick={() => panLeft()}
          style={panStyles?.handles?.left?.properties}
        />
        <ChevronRight
          size={17}
          className={twMerge(panHandleClasses, "right-0 top-[40%]", panStyles?.handles?.right?.className)}
          onClick={() => panRight()}
          style={panStyles?.handles?.right?.properties}
        />
        <ChevronUp
          size={17}
          className={twMerge(panHandleClasses, "top-0 left-[40%]", panStyles?.handles?.up?.className)}
          onClick={() => panUp()}
          style={panStyles?.handles?.up?.properties}
        />
        <ChevronDown
          size={17}
          className={twMerge(panHandleClasses, "bottom-0 left-[40%]", panStyles?.handles?.down?.className)}
          onClick={() => panDown()}
          style={panStyles?.handles?.down?.properties}
        />
      </div>
      <div
        id={ids.zoomControls}
        className={twMerge(
          "absolute bottom-14 left-7 bg-gray-100 p-2.5 rounded-md flex gap-1 items-center",
          props.mode === "user" && "bottom-5 left-6 md:bottom-8 md:left-9",
          zoomStyles?.root?.className
        )}
        style={zoomStyles?.root?.properties}
      >
        <div
          className={twMerge(
            "w-full sm:w-auto px-3 py-1.5 bg-white font-medium text-black/40 rounded-l cursor-pointer splash after:bg-black/5",
            zoomStyles?.out?.className
          )}
          onClick={zoomOut}
          role="button"
          style={zoomStyles?.out?.properties}
        >
          <Minus size={17} />
        </div>
        <div
          className={twMerge(
            "pz-2 py-1.5 min-w-[40px] flex justify-center items-center bg-white font-semibold rounded-r cursor-pointer splash after:bg-black/5",
            zoomStyles?.in?.className
          )}
          onClick={zoomIn}
          role="button"
          style={zoomStyles?.in?.properties}
        >
          <Plus size={17} />
        </div>
      </div>
    </>
  );
};

export default Zoom;
