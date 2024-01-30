import { forwardRef } from "react";

export const seatSize = 28;

const Seat = forwardRef(({ x, y, id, ...props }, ref) => {
  return <circle ref={ref} id={id} cx={x} cy={y} r={seatSize / 2} {...props} />;
});

Seat.displayName = "Seat";

export default Seat;
