import { ids } from "@/constants";
import { default as Crosshairs } from "./crosshairs";
import { Element, ElementType } from "./elements";
import { default as Grid } from "./grid";
import { default as Zoom } from "./zoom";

export { default as Cursor } from "./cursor";

export const Workspace = () => {
  return (
    <div className="w-full h-[88.5vh] relative border border-b-0 border-black">
      <svg id={ids.workspace} className="w-full h-full">
        <g>
          <Element type={ElementType.Seat} />
          <Element type={ElementType.Booth} x={350} y={350} />
          <Element type={ElementType.Booth} x={750} y={150} />
        </g>
      </svg>
      <Crosshairs />
      <Grid />
      <Zoom />
    </div>
  );
};

export default Workspace;
