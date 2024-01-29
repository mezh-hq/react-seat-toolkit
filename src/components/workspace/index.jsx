import { ids } from "@/constants";
import { default as Crosshairs } from "./crosshairs";
import { Element, ElementType } from "./element";
import { default as Zoom } from "./zoom";

export { default as Cursor } from "./cursor";

export const Workspace = () => {
  return (
    <div className="w-full h-[95vh] relative border border-b-0 border-black">
      <svg id={ids.workspace} className="w-full h-full">
        <g>
          <Element type={ElementType.Booth} />
        </g>
      </svg>
      <Crosshairs />
      <Zoom />
    </div>
  );
};

export default Workspace;
