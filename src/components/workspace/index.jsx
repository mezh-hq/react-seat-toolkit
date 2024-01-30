import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { ids } from "@/constants";
import { store } from "@/store";
import { initializeElements } from "@/store/reducers/editor";
import { default as Crosshairs } from "./crosshairs";
import { default as Element, ElementType } from "./elements";
import { default as Grid } from "./grid";
import { default as Zoom } from "./zoom";

export { default as Cursor } from "./cursor";

export const Workspace = () => {
  const booths = useSelector((state) => state.editor.booths);
  const seats = useSelector((state) => state.editor.seats);
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);

  useLayoutEffect(() => {
    store.dispatch(initializeElements());
  }, []);

  return (
    <div id={ids.workspaceContainer} className="w-full h-[88.5vh] relative border border-b-0 border-black">
      <svg id={ids.workspace} className="w-full h-full">
        <g>
          {seats.map((seat, i) => (
            <Element
              type={ElementType.Seat}
              key={seat.id ?? `seat-${i}`}
              id={seat.id}
              x={seat.x}
              y={seat.y}
              isSelected={selectedElementIds.includes(seat.id)}
            />
          ))}
          {booths.map((booth, i) => (
            <Element
              type={ElementType.Booth}
              key={booth.id ?? `booth-${i}`}
              id={booth.id}
              x={booth.x}
              y={booth.y}
              isSelected={selectedElementIds.includes(booth.id)}
            />
          ))}
        </g>
      </svg>
      <Crosshairs />
      <Grid />
      <Zoom />
    </div>
  );
};

export default Workspace;
