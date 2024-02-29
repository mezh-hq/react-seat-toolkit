import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { IPolyline } from "@/types";

export interface IPolylineProps extends IPolyline {
  className?: string;
}

const Polyline: React.FC<IPolylineProps> = forwardRef(({ id, points, color, stroke, section, ...props }, ref: any) => {
  return (
    <polyline
      ref={ref}
      id={id}
      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      {...props}
      style={{ color: color ?? "transparent", stroke }}
      {...{ [dataAttributes.section]: section }}
      className={twMerge(props.className)}
    />
  );
});

Polyline.displayName = "Polyline";

export default Polyline;
