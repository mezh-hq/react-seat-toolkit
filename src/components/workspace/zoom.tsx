import { useLayoutEffect, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Minus,
  PanelBottomClose,
  PanelBottomOpen,
  Plus
} from "lucide-react";
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

const Zoom = (props: Pick<ISTKProps, "mode" | "styles" | "options">) => {
  const [open, setOpen] = useState(true);
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
    <div id={ids.zoomControls} className="fixed bottom-4 left-0 right-0 flex justify-center items-center">
      <div
        className={twMerge(
          "border border-border bg-white/80 backdrop-blur-md p-2 rounded-lg flex gap-2 transition-all",
          panStyles?.root?.className,
          !open && "translate-y-20"
        )}
        style={panStyles?.root?.properties}
      >
        <div
          className={twMerge(
            "w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash",
            panStyles?.handles?.left?.className
          )}
          onClick={() => panLeft()}
          role="button"
          style={panStyles?.handles?.left?.properties}
        >
          <ChevronLeft size={16} />
        </div>
        <div
          className={twMerge(
            "w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash",
            panStyles?.handles?.right?.className
          )}
          role="button"
          onClick={() => panRight()}
          style={panStyles?.handles?.right?.properties}
        >
          <ChevronRight size={16} />
        </div>
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", zoomStyles?.out?.className)}
          onClick={zoomOut}
          role="button"
          style={zoomStyles?.out?.properties}
        >
          <Minus size={16} />
        </div>
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash")}
          role="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <PanelBottomClose size={16} />
        </div>
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", zoomStyles?.in?.className)}
          onClick={zoomIn}
          role="button"
          style={zoomStyles?.in?.properties}
        >
          <Plus size={16} />
        </div>
        <div
          className={twMerge(
            "w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash",
            panStyles?.handles?.up?.className
          )}
          role="button"
          onClick={() => panUp()}
          style={panStyles?.handles?.up?.properties}
        >
          <ChevronUp size={16} />
        </div>
        <div
          className={twMerge(
            "w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash",
            panStyles?.handles?.down?.className
          )}
          role="button"
          onClick={() => panDown()}
          style={panStyles?.handles?.down?.properties}
        >
          <ChevronDown size={16} />
        </div>
      </div>
      <div className={twMerge("absolute translate-y-20 transition-all", !open && "translate-y-0")}>
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash")}
          role="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <PanelBottomOpen size={16} />
        </div>
      </div>
    </div>
  );
};

export default Zoom;
