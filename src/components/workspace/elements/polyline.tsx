import { forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { IPolyline, ISection } from "@/types";

export interface IPolylineProps extends IPolyline {
  className?: string;
  sections?: ISection[];
}

const Polyline: React.FC<IPolylineProps> = forwardRef(
  ({ id, points, color, stroke, sections, section, ...props }, ref: any) => {
    const sectionObject = useMemo(() => sections?.find?.((s) => s.id === section), [sections, section]);
    return (
      <polyline
        ref={ref}
        id={id}
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
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
