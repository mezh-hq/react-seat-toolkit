import { forwardRef } from "react";

export const boothSize = 39;

const Booth = forwardRef(({ id, x, y, ...props }, ref) => {
  return <rect ref={ref} id={id} x={x} y={y} width={boothSize} height={boothSize} rx={5} ry={5} {...props} />;
});

Booth.displayName = "Booth";

export default Booth;
