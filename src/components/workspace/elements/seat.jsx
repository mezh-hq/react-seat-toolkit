import { forwardRef } from "react";

const Seat = forwardRef(({ x, y, ...props }, ref) => {
  return <circle ref={ref} cx={x} cy={y} r={14} {...props} />;
});

Seat.displayName = "Seat";

export default Seat;
