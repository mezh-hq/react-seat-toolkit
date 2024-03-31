import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes, selectors } from "@/constants";
import { IPolyline, ISTKProps, ISection } from "@/types";
import { d3Extended, getRelativeWorkspaceClickCoords } from "@/utils";
import { panAndZoomWithTransition } from "../zoom";

export interface IPolylineProps extends IPolyline {
  className?: string;
  consumer: ISTKProps;
  sections?: ISection[];
  onClick: (e: any) => void;
}

const Polyline: React.FC<IPolylineProps> = forwardRef(
  ({ id, points, color, stroke, sections, section, onClick, consumer, ...props }, ref: any) => {
    const sectionObject = useMemo(() => sections?.find?.((s) => s.id === section), [sections, section]);

    const localOnClick = (e) => {
      onClick(e);
      if (sectionObject) {
        consumer.events?.onSectionClick?.(sectionObject);
        if (!sectionObject.freeSeating) {
          const visibilityOffset = +d3Extended.select(selectors.workspaceGroup).attr(dataAttributes.visibilityOffset);
          if (visibilityOffset > 0) {
            const coords = getRelativeWorkspaceClickCoords(e);
            panAndZoomWithTransition({
              k: visibilityOffset,
              x: coords.x - coords.x * visibilityOffset,
              y: coords.y - coords.y * visibilityOffset
            });
          }
        }
      }
    };

    return (
      <polyline
        ref={ref}
        id={id}
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        onClick={localOnClick}
        {...props}
        style={{
          color: sectionObject?.color ?? color ?? "transparent",
          stroke: sectionObject?.stroke ?? stroke,
          ...consumer.styles?.elements?.shape?.base?.properties
        }}
        {...{ [dataAttributes.section]: section }}
        className={twMerge(props.className, consumer.styles?.elements?.shape?.base?.className)}
      />
    );
  }
);

Polyline.displayName = "Polyline";

export default Polyline;
