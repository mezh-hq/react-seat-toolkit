import { useLayoutEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { default as debounce } from "lodash/debounce";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids, selectors } from "@/constants";
import type { ISTKProps } from "@/types";
import { d3Extended, getScaleFactorAccountingForViewBoxWidth } from "@/utils";
import { Button } from "../../core";
import { Tool } from "../../toolbar/data";
import { showPostOffsetElements, showPreOffsetElements } from "../elements";
import { default as Reload } from "../reload";
import { AirplaneMode } from "./airplane-mode";
import { default as DockHandler } from "./handler";
import { VisibilityFreezeScale, VisibilityOffset } from "./visibility";

const handleElementVisibility = debounce((workspace, k) => {
  const visibilityOffset = +workspace.attr(dataAttributes.visibilityOffset) || 0;
  if (visibilityOffset) {
    const initialViewBoxScaleForWidth = +workspace.attr(dataAttributes.initialViewBoxScaleForWidth);
    if (k * 1.1 < getScaleFactorAccountingForViewBoxWidth(visibilityOffset, initialViewBoxScaleForWidth)) {
      showPreOffsetElements();
    } else {
      showPostOffsetElements();
    }
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

const Dock = (props: Pick<ISTKProps, "mode" | "styles" | "options" | "events">) => {
  const dock = useSelector((state: any) => state.toolbar.dock);
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);

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

  const zoomStyles = props.styles?.zoomControls;
  const panStyles = props.styles?.panControls;
  const dockStyles = props.styles?.dock;

  const isDesigner = props.mode === "designer";
  const showZoomControls = props.options?.showZoomControls ?? true;
  const showVisibilityControls = isDesigner && (props.options?.showVisibilityControls ?? true);
  const showAirplaneControl = isDesigner && props.options?.showAirplaneControl;
  const showReloadButton = props.options?.showReloadButton ?? false;
  const isUser = props.mode === "user";

  return (
    <>
      {isUser && (
        <div id={ids.reloader} className="absolute top-4 right-4 flex flex-col gap-2">
          {showReloadButton && (
            <Reload mode={props.mode} options={props.options} styles={props.styles} onReload={props.events?.onReload} />
          )}
          {(showZoomControls || showVisibilityControls) && <DockHandler />}
        </div>
      )}
      {(showZoomControls || showVisibilityControls) && (
        <div
          className={twMerge(
            "absolute overflow-clip bottom-0 pb-4 left-0 right-0 flex justify-center items-center pointer-events-none",
            dockStyles?.root?.className
          )}
        >
          <div
            id={ids.zoomControls}
            className={twMerge(
              "border border-gray-200 w-fit bg-white p-2 overflow-x-auto rounded-lg flex justify-center [&>div]:shrink-0 gap-2 transition-all duration-500 ease-in-out opacity-100 pointer-events-auto",
              dockStyles?.container?.className,
              !dock && "translate-y-20 opacity-0"
            )}
            style={dockStyles?.container?.properties}
          >
            {showVisibilityControls && <VisibilityFreezeScale {...props} />}
            {showZoomControls && (
              <>
                <Button
                  variant="secondary"
                  className={twMerge("w-8 h-8 p-2", panStyles?.handles?.left?.className)}
                  onClick={() => panLeft()}
                  style={panStyles?.handles?.left?.properties}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant="secondary"
                  className={twMerge("w-8 h-8 p-2", panStyles?.handles?.right?.className)}
                  onClick={() => panRight()}
                  style={panStyles?.handles?.right?.properties}
                >
                  <ChevronRight size={16} />
                </Button>
                <Button
                  variant="secondary"
                  className={twMerge("w-8 h-8 p-2", zoomStyles?.out?.className)}
                  onClick={zoomOut}
                  style={zoomStyles?.out?.properties}
                >
                  <Minus size={16} />
                </Button>
                <Button
                  variant="secondary"
                  className={twMerge("w-8 h-8 p-2", zoomStyles?.in?.className)}
                  onClick={zoomIn}
                  style={zoomStyles?.in?.properties}
                >
                  <Plus size={16} />
                </Button>
                <Button
                  variant="secondary"
                  className={twMerge("w-8 h-8 p-2", panStyles?.handles?.up?.className)}
                  onClick={() => panUp()}
                  style={panStyles?.handles?.up?.properties}
                >
                  <ChevronUp size={16} />
                </Button>
                <Button
                  variant="secondary"
                  className={twMerge("w-8 h-8 p-2", panStyles?.handles?.down?.className)}
                  onClick={() => panDown()}
                  style={panStyles?.handles?.down?.properties}
                >
                  <ChevronDown size={16} />
                </Button>
              </>
            )}
            {showVisibilityControls && <VisibilityOffset {...props} />}
            {showAirplaneControl && <AirplaneMode />}
          </div>
        </div>
      )}
    </>
  );
};

export default Dock;
