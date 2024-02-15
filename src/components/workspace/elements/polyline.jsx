import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Polyline = forwardRef(({ id, points, color, stroke, ...props }, ref) => {
  return (
    <polyline
      ref={ref}
      id={id}
      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      {...props}
      style={{ color: color ?? "transparent", stroke }}
      className={twMerge(props.className)}
    />
  );
});

Polyline.displayName = "Polyline";

export default Polyline;
