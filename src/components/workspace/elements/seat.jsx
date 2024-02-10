import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const seatSize = 28;

export const seatLabelFontSize = seatSize / 3;

const Seat = forwardRef(({ x, y, id, label, ...props }, ref) => {
  let textX = x - seatLabelFontSize / 3.5;
  const labelLength = label?.toString()?.length ?? 0;
  if (labelLength >= 2) textX -= (seatLabelFontSize / 2.75) * (labelLength - 1);
  return (
    <>
      <circle ref={ref} id={id} cx={x} cy={y} r={seatSize / 2} {...props} />
      {label && (
        <text
          id={`${id}-label`}
          x={textX}
          y={y + seatLabelFontSize / 2.75}
          fontSize={seatLabelFontSize}
          fontWeight={200}
          letterSpacing={1}
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
