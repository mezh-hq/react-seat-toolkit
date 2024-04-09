import { useCallback } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids } from "@/constants";
import { type ISTKProps, SeatStatus } from "@/types";
import { Tool, tools } from "../toolbar/data";
import { default as Crosshairs } from "./crosshairs";
import { default as Element, ElementType } from "./elements";
import { default as Grid } from "./grid";
import { default as Reload } from "./reload";
import { default as VisibilityControls } from "./visibility";
import { default as Zoom } from "./zoom";

export { default as Cursor } from "./cursor";

export const Workspace: React.FC<ISTKProps> = (props) => {
  const initialized = useSelector((state: any) => state.editor.initialized);
  const booths = useSelector((state: any) => state.editor.booths);
  const seats = useSelector((state: any) => state.editor.seats);
  const text = useSelector((state: any) => state.editor.text);
  const shapes = useSelector((state: any) => state.editor.shapes);
  const polylines = useSelector((state: any) => state.editor.polylines);
  const images = useSelector((state: any) => state.editor.images);
  const categories = useSelector((state: any) => state.editor.categories);
  const sections = useSelector((state: any) => state.editor.sections);
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);
  const selectedPolylineId = useSelector((state: any) => state.editor.selectedPolylineId);
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);

  const elementProps = useCallback(
    (elem) => ({
      id: elem.id,
      x: elem.x,
      y: elem.y,
      isSelected: selectedElementIds.includes(elem.id),
      label: elem.label,
      color: elem.color,
      stroke: elem.stroke,
      consumer: props,
      element: elem
    }),
    [selectedElementIds]
  );

  const showReloadButton = props.options?.showReloadButton ?? false;

  const showZoomControls = props.options?.showZoomControls ?? true;

  const showVisibilityControls = props.mode === "designer" && (props.options?.showVisibilityControls ?? true);

  const onWorkspaceHover = useCallback(
    (e: any) => {
      if (props.events?.onWorkspaceHover && e.target.id === ids.workspace) props.events.onWorkspaceHover();
    },
    [props.events?.onWorkspaceHover]
  );

  return (
    <div
      id={ids.workspaceContainer}
      className={twMerge(
        "w-full h-full flex flex-col flex-1 relative border border-b-0 border-black transition-all",
        initialized ? "opacity-100" : "opacity-0",
        props.styles?.workspace?.root?.className
      )}
      style={props.styles?.workspace?.root?.properties}
    >
      <svg id={ids.workspace} className="w-full h-full flex-1" onMouseOver={onWorkspaceHover}>
        <g {...{ [dataAttributes.visibilityOffset]: "0" }}>
          {seats.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Seat}
              sections={sections}
              categories={categories}
              category={e.category}
              status={e.status ?? SeatStatus.Available}
              {...elementProps(e)}
            />
          ))}
          {booths.map((e) => (
            <Element key={e.id} type={ElementType.Booth} {...elementProps(e)} />
          ))}
          {shapes.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Shape}
              width={e.width}
              height={e.height}
              rx={e.rx}
              resizable={selectedTool === Tool.Select}
              name={e.name}
              {...elementProps(e)}
            />
          ))}
          {polylines.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Polyline}
              points={e.points}
              sections={sections}
              categories={categories}
              section={e.section}
              {...elementProps(e)}
            />
          ))}
          {images.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Image}
              href={e.href}
              width={e.width}
              height={e.height}
              {...elementProps(e)}
            />
          ))}
          {text.map((e) => (
            <Element
              key={e.id}
              type={ElementType.Text}
              fontSize={e.fontSize}
              fontWeight={e.fontWeight}
              letterSpacing={e.letterSpacing}
              embraceOffset={e.embraceOffset}
              {...elementProps(e)}
            />
          ))}
          {selectedPolylineId && <line id={ids.templine} className="stroke-2 stroke-black fill-white" />}
        </g>
      </svg>
      {props.mode === "designer" && (
        <>
          <Crosshairs render={tools[selectedTool]?.crosshairs} />
          <Grid />
        </>
      )}
      {showZoomControls && <Zoom mode={props.mode} options={props.options} styles={props.styles} />}
      {showVisibilityControls && <VisibilityControls mode={props.mode} options={props.options} styles={props.styles} />}
      {showReloadButton && (
        <Reload mode={props.mode} options={props.options} styles={props.styles} onReload={props.events?.onReload} />
      )}
    </div>
  );
};

export default Workspace;
