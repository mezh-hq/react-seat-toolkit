import { memo, useLayoutEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { twMerge } from "tailwind-merge";
import { ids } from "@/constants";
import { Tool } from "../toolbar/data";

function handleZoom(e) {
  d3.select(`#${ids.workspace} g`).attr("transform", e.transform);
}

const zoom = d3.zoom().on("zoom", handleZoom);

const zoomIn = () => {
  d3.select(`#${ids.workspace}`).transition().call(zoom.scaleBy, 1.1);
};

const zoomOut = () => {
  d3.select(`#${ids.workspace}`).transition().call(zoom.scaleBy, 0.9);
};

const panLeft = () => {
  d3.select(`#${ids.workspace}`).transition().call(zoom.translateBy, -50, 0);
};

const panRight = () => {
  d3.select(`#${ids.workspace}`).transition().call(zoom.translateBy, 50, 0);
};

const panUp = () => {
  d3.select(`#${ids.workspace}`).transition().call(zoom.translateBy, 0, -50);
};

const panDown = () => {
  d3.select(`#${ids.workspace}`).transition().call(zoom.translateBy, 0, 50);
};

const panHandleClasses =
  "absolute z-10 text-black/40 cursor-pointer hover:text-black/80 transition-all duration-medium";

const Zoom = () => {
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

  useLayoutEffect(() => {
    const selection = d3.select(`#${ids.workspace}`);
    selection.on("zoom", null);
    if (selectedTool == Tool.Pan) {
      d3.select(`#${ids.workspace}`).call(zoom);
    } else {
      d3.select(`#${ids.workspace}`)
        .call(zoom)
        .on("mousedown.zoom", null)
        .on("touchstart.zoom", null)
        .on("touchmove.zoom", null)
        .on("touchend.zoom", null);
    }
  }, [selectedTool]);

  return (
    <div id={ids.zoomControls} className="fixed bottom-6 left-20 flex flex-col items-center gap-4">
      <div className="relative h-20 w-20 rounded-full border border-black/20 splash after:bg-black/5">
        <div className="absolute top-0 left-0 h-full w-full p-[1.125rem] z-20 pointer-events-none">
          <div className="h-full w-full rounded-full bg-white border-2 border-black/50" />
        </div>
        <ChevronLeft size={17} className={twMerge(panHandleClasses, "left-0 top-[40%]")} onClick={panLeft} />
        <ChevronRight size={17} className={twMerge(panHandleClasses, "right-0 top-[40%]")} onClick={panRight} />
        <ChevronUp size={17} className={twMerge(panHandleClasses, "top-0 left-[40%]")} onClick={panUp} />
        <ChevronDown size={17} className={twMerge(panHandleClasses, "bottom-0 left-[40%]")} onClick={panDown} />
      </div>
      <div className="bg-gray-100 p-2.5 rounded-md flex gap-1 items-center">
        <div
          className="w-full sm:w-auto px-3 py-1.5 bg-white font-medium text-black/40 rounded-l cursor-pointer splash after:bg-black/5"
          onClick={zoomOut}
          role="button"
        >
          <Minus size={17} />
        </div>
        <div
          className="pz-2 py-1.5 min-w-[40px] flex justify-center items-center bg-white font-semibold rounded-r cursor-pointer splash after:bg-black/5"
          onClick={zoomIn}
          role="button"
        >
          <Plus size={17} />
        </div>
      </div>
    </div>
  );
};

export default memo(Zoom);
