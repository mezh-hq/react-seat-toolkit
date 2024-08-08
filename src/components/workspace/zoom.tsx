import { useLayoutEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { default as debounce } from "lodash/debounce";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids, selectors } from "@/constants";
import { useSkipFirstRender } from "@/hooks";
import type { ISTKProps } from "@/types";
import { d3Extended, getScaleFactorAccountingForViewBoxWidth } from "@/utils";
import { Tool } from "../toolbar/data";
import { showPostOffsetElements, showPreOffsetElements } from "./elements";

const handleElementVisibility = debounce((workspace, k) => {
  const visibilityOffset = +workspace.attr(dataAttributes.visibilityOffset) || 0;
  const initialViewBoxScaleForWidth = +workspace.attr(dataAttributes.initialViewBoxScaleForWidth);
  if (k * 1.1 < getScaleFactorAccountingForViewBoxWidth(visibilityOffset, initialViewBoxScaleForWidth)) {
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
  d3Extended.selectById(ids.workspace).transition().duration(1000).call(zoom.scaleTo, k, [x, y]);
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
      const zoomSelection = selection.call(zoom).on("wheel.zoom", (e) => {
        e.preventDefault();
        const currentZoom = selection.property("__zoom").k || 1;
        if (e.ctrlKey) {
          const nextZoom = currentZoom * Math.pow(2, -e.deltaY * 0.01);
          zoom.scaleTo(selection, nextZoom, d3Extended.pointer(e));
        } else {
          zoom.translateBy(selection, -(e.deltaX / currentZoom), -(e.deltaY / currentZoom));
        }
      });
      if (props.mode !== "user") zoomSelection.on("mousedown.zoom", null);
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
          "absolute bottom-[6.75rem] left-[1.5rem] h-[4.5rem] w-[4.5rem] bg-white/80 backdrop-blur-sm rounded-full border after:bg-black/5",
          props.mode === "user" && "bottom-[4.5rem] md:bottom-[5.25rem] md:left-[2.25rem]",
          panStyles?.root?.className
        )}
        style={panStyles?.root?.properties}
      >
        <div className="absolute top-0 left-0 h-full w-full p-[1.125rem] z-20 pointer-events-none">
          <div
            className={twMerge("h-full w-full rounded-full bg-slate-100 border-2 ", panStyles?.innerRing?.className)}
            style={panStyles?.innerRing?.properties}
          />
        </div>
        <ChevronLeft
          size={17}
          className={twMerge(panHandleClasses, "left-0 top-[39%]", panStyles?.handles?.left?.className)}
          onClick={() => panLeft()}
          style={panStyles?.handles?.left?.properties}
        />
        <ChevronRight
          size={17}
          className={twMerge(panHandleClasses, "right-0 top-[39%]", panStyles?.handles?.right?.className)}
          onClick={() => panRight()}
          style={panStyles?.handles?.right?.properties}
        />
        <ChevronUp
          size={17}
          className={twMerge(panHandleClasses, "top-0 left-[38%]", panStyles?.handles?.up?.className)}
          onClick={() => panUp()}
          style={panStyles?.handles?.up?.properties}
        />
        <ChevronDown
          size={17}
          className={twMerge(panHandleClasses, "bottom-0 left-[38%]", panStyles?.handles?.down?.className)}
          onClick={() => panDown()}
          style={panStyles?.handles?.down?.properties}
        />
      </div>
      <div
        id={ids.zoomControls}
        className={twMerge(
          "absolute bottom-14 left-6 flex gap-2 items-center",
          props.mode === "user" && "bottom-5 left-6 md:bottom-8 md:left-9",
          zoomStyles?.root?.className
        )}
        style={zoomStyles?.root?.properties}
      >
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", zoomStyles?.out?.className)}
          onClick={zoomOut}
          role="button"
          style={zoomStyles?.out?.properties}
        >
          <Minus size={16} />
        </div>
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", zoomStyles?.in?.className)}
          onClick={zoomIn}
          role="button"
          style={zoomStyles?.in?.properties}
        >
          <Plus size={16} />
        </div>
      </div>
    </>
  );
};

export default Zoom;
