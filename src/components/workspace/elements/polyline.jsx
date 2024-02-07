import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Polyline = forwardRef(({ id, points, ...props }, ref) => {
  return (
    <polyline
      ref={ref}
      id={id}
      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      {...props}
      className={twMerge(props.className, "fill-transparent")}
    />
  );
});

Polyline.displayName = "Polyline";

export default Polyline;
