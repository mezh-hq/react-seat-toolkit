import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const seatSize = 28;

const Seat = forwardRef(({ x, y, id, label, ...props }, ref) => {
  const fontSize = seatSize / 2.75;
  let textX = x - fontSize / 3;
  if (label?.toString()?.length === 2) textX -= fontSize / 3;
  return (
    <>
      <circle ref={ref} id={id} cx={x} cy={y} r={seatSize / 2} {...props} />
      {label && (
        <text
          id={`${id}-label`}
          x={textX}
          y={y + fontSize / 2.75}
          fontSize={fontSize}
          fontWeight={200}
          letterSpacing={3}
          {...props}
          className={twMerge(props.className, "unselectable !stroke-1")}
        >
          {label ?? "A"}
        </text>
      )}
    </>
  );
});

Seat.displayName = "Seat";

export default Seat;
