import { forwardRef } from "react";

const Booth = forwardRef(({ x, y, id, ...props }, ref) => {
  return <rect ref={ref} id={id} x={x} y={y} width={39} height={39} rx={5} ry={5} {...props} />;
});

Booth.displayName = "Booth";

export default Booth;
