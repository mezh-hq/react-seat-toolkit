import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes, selectors } from "@/constants";
import { IPolyline, ISTKProps, ISeatCategory, ISection } from "@/types";
import { d3Extended, getRelativeWorkspaceClickCoords, getScaleFactorAccountingForViewBoxWidth } from "@/utils";
import { panAndZoomToArea } from "../actions";

export interface IPolylineProps extends IPolyline {
  className?: string;
  consumer: ISTKProps;
  sections?: ISection[];
  categories?: ISeatCategory[];
  onClick: (e: any) => void;
  isSelected?: boolean;
  element?: any;
}

const Polyline: React.FC<IPolylineProps> = forwardRef(
  (
    {
      id,
      points,
      color,
      stroke,
      sections,
      categories,
      section,
      onClick,
      consumer,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isSelected: _,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      element: __,
      ...props
    },
    ref: any
  ) => {
    const sectionObject = useMemo(() => sections?.find?.((s) => s.id === section), [sections, section]);

    const localOnClick = (e) => {
      onClick(e);
      if (sectionObject) {
        consumer.events?.onSectionClick?.(sectionObject);
        if (consumer.events?.onFreeSeatClick && sectionObject.freeSeating) {
          const category = categories?.find((c: ISeatCategory) => c.section === sectionObject.id);
          if (category) {
            consumer.events.onFreeSeatClick({
              category: {
                ...category,
                section: sectionObject
              }
            });
          }
        }
        if (!sectionObject.freeSeating) {
          const visibilityOffset = +d3Extended.select(selectors.workspaceGroup).attr(dataAttributes.visibilityOffset);
          if (visibilityOffset > 0) {
            const coords = getRelativeWorkspaceClickCoords(e);
            panAndZoomToArea({
              k:
                getScaleFactorAccountingForViewBoxWidth(
                  visibilityOffset,
                  consumer.data?.workspace?.initialViewBoxScaleForWidth
                ) * 1.1,
              x: coords.x,
              y: coords.y
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
          ...consumer.styles?.elements?.shape?.base?.properties,
          ...(sectionObject && consumer.styles?.elements?.section?.base?.properties),
          ...(sectionObject?.freeSeating && consumer.styles?.elements?.section?.freeSeating?.properties)
        }}
        {...{ [dataAttributes.section]: section }}
        {...{ [dataAttributes.sectionFreeSeating]: sectionObject?.freeSeating }}
        className={twMerge(
          props.className,
          consumer.styles?.elements?.shape?.base?.className,
          consumer.mode === "user" && sectionObject && "cursor-pointer filter hover:brightness-[1.05]",
          consumer.mode === "user" && !sectionObject && "pointer-events-none",
          sectionObject && consumer.styles?.elements?.section?.base?.className,
          sectionObject?.freeSeating && consumer.styles?.elements?.section?.freeSeating?.className
        )}
      />
    );
  }
);

Polyline.displayName = "Polyline";

export default Polyline;
