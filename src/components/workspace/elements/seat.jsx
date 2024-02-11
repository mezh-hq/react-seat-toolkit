import { forwardRef, useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { SeatStatus, dataAttributes, seatStatusColors } from "@/constants";
import { d3Extended } from "@/utils";

export const seatSize = 28;

export const seatLabelFontSize = seatSize / 3;

const Seat = forwardRef(({ x, y, id, label, categories, category, status, ...props }, ref) => {
  let textX = x - seatLabelFontSize / 3.5;

  const labelLength = label?.toString()?.length ?? 0;

  if (labelLength >= 2) textX -= (seatLabelFontSize / 2.75) * (labelLength - 1);

  const categoryObject = useMemo(() => categories?.find?.((c) => c.id === category), [categories, category]);

  useEffect(() => {
    if (ref.current) {
      const seat = d3Extended.select(ref.current);
      const seatLabel = d3Extended.selectById(`${id}-label`);
      const status = seat.attr(dataAttributes.status);
      if (status === SeatStatus.Unavailable || status === SeatStatus.Reserved) {
        seat.style("color", seatStatusColors[status].background, "important");
        seatLabel?.style("stroke", seatStatusColors[status].label, "important");
      } else {
        if (categoryObject) {
          seat.style("color", categoryObject.color, "important");
          seatLabel?.style("stroke", categoryObject.textColor, "important");
        }
      }
    }
  }, [ref, categoryObject]);

  return (
    <>
      <circle
        ref={ref}
        id={id}
        cx={x}
        cy={y}
        r={seatSize / 2}
        {...{ [dataAttributes.category]: category }}
        {...{ [dataAttributes.status]: status }}
        {...props}
      />
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
