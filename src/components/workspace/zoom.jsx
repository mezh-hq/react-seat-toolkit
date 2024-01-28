import { memo, useLayoutEffect } from "react";
import { Minus, Plus } from "lucide-react";
import * as d3 from "d3";
import { ids } from "@/constants";

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

const Zoom = () => {
  useLayoutEffect(() => {
    d3.select(`#${ids.workspace}`).call(zoom);
  }, []);

  return (
    <div className="bg-gray-100 p-2.5 fixed bottom-6 left-20 rounded-md flex gap-1 items-center">
      <div
        className="w-full sm:w-auto px-3 py-1.5 bg-white font-medium text-black/40 rounded-l cursor-pointer splash after:bg-black/5"
        onClick={zoomOut}
        role="button"
      >
        <Minus />
      </div>
      <div
        className="pz-2 py-1.5 min-w-[40px] flex justify-center items-center bg-white font-semibold rounded-r cursor-pointer splash after:bg-black/5"
        onClick={zoomIn}
        role="button"
      >
        <Plus />
      </div>
    </div>
  );
};

export default memo(Zoom);
