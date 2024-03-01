import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { IPolyline, ISTKProps, ISection } from "@/types";

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
      consumer.events?.onSectionClick?.(sectionObject);
    };

    return (
      <polyline
        ref={ref}
        id={id}
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        onClick={localOnClick}
        {...props}
        style={{ color: sectionObject?.color ?? color ?? "transparent", stroke: sectionObject?.stroke ?? stroke }}
        {...{ [dataAttributes.section]: section }}
        className={twMerge(props.className)}
      />
    );
  }
);

Polyline.displayName = "Polyline";

export default Polyline;
