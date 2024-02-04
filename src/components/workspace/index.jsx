import { useCallback, useLayoutEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ids } from "@/constants";
import { store } from "@/store";
import { initializeElements } from "@/store/reducers/editor";
import { Tool, tools } from "../toolbar/data";
import { default as Crosshairs } from "./crosshairs";
import { default as Element, ElementType } from "./elements";
import { default as Grid } from "./grid";
import { default as Zoom } from "./zoom";

export { default as Cursor } from "./cursor";

export const Workspace = () => {
  const booths = useSelector((state) => state.editor.booths);
  const seats = useSelector((state) => state.editor.seats);
  const text = useSelector((state) => state.editor.text);
  const shapes = useSelector((state) => state.editor.shapes);
  const selectedSection = useSelector((state) => state.editor.selectedSection);
  const selectedElementIds = useSelector((state) => state.editor.selectedElementIds);
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

  useLayoutEffect(() => {
    store.dispatch(initializeElements());
  }, []);

  const elementProps = useCallback(
    (elem) => ({
      id: elem.id,
      x: elem.x,
      y: elem.y,
      isSelected: selectedElementIds.includes(elem.id),
      label: elem.label
    }),
    [selectedElementIds]
  );

  const sectionSeats = useMemo(() => seats[selectedSection] ?? [], [seats, selectedSection]);
  const sectionBooths = useMemo(() => booths[selectedSection] ?? [], [booths, selectedSection]);
  const sectionText = useMemo(() => text[selectedSection] ?? [], [text, selectedSection]);
  const sectionShapes = useMemo(() => shapes[selectedSection] ?? [], [shapes, selectedSection]);

  return (
    <div id={ids.workspaceContainer} className="w-full h-full relative border border-b-0 border-black">
      <svg id={ids.workspace} className="w-full h-full">
        <g>
          {sectionSeats.map((e) => (
            <Element key={e.id} type={ElementType.Seat} {...elementProps(e)} />
          ))}
          {sectionBooths.map((e) => (
            <Element key={e.id} type={ElementType.Booth} {...elementProps(e)} />
          ))}
          {sectionText.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Text}
              fontSize={e.fontSize}
              fontWeight={e.fontWeight}
              letterSpacing={e.letterSpacing}
              {...elementProps(e)}
            />
          ))}
          {sectionShapes.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Shape}
              width={e.width}
              height={e.height}
              resizable={selectedTool === Tool.Select}
              name={e.name}
              {...elementProps(e)}
            />
          ))}
        </g>
      </svg>
      <Crosshairs render={tools[selectedTool]?.crosshairs} />
      <Grid />
      <Zoom />
    </div>
  );
};

export default Workspace;
