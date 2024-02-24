import { forwardRef, useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { SeatStatus, dataAttributes, seatStatusColors } from "@/constants";
import { d3Extended } from "@/utils";

export const seatSize = 28;

export const seatLabelFontSize = seatSize / 3;

const Seat = forwardRef(
  ({ x, y, id, label, categories, category, status, onClick, options, element, ...props }, ref) => {
    const categoryObject = useMemo(() => categories?.find?.((c) => c.id === category), [categories, category]);

    const textX = useMemo(() => {
      let value = (+ref.current?.getAttribute("cx") || x) - seatLabelFontSize / 3.5;
      const labelLength = label?.toString()?.length ?? 0;
      if (labelLength >= 2) value -= (seatLabelFontSize / 2.75) * (labelLength - 1);
      return value;
    }, [ref, label, x]);

    const textY = useMemo(() => {
      return (+ref.current?.getAttribute("cy") || y) + seatLabelFontSize / 2.75;
    }, [ref, label, y]);

    useEffect(() => {
      if (ref.current) {
        const seat = d3Extended.select(ref.current);
        const seatLabel = d3Extended.selectById(`${id}-label`);
        const status = seat.attr(dataAttributes.status);
        if (status === SeatStatus.Unavailable || status === SeatStatus.Reserved) {
          seat.style("color", seatStatusColors[status].background);
          seatLabel?.style("stroke", seatStatusColors[status].label);
        } else {
          if (categoryObject) {
            seat.style("color", categoryObject.color);
            seatLabel?.style("stroke", categoryObject.textColor);
          }
        }
      }
    }, [ref, categoryObject]);

    const localOnClick = (e) => {
      onClick(e);
      options.events?.onSeatClick?.({
        ...element,
        category: categoryObject
      });
    };

    return (
      <>
        <circle
          ref={ref}
          id={id}
          cx={x}
          cy={y}
          r={seatSize / 2}
          onClick={localOnClick}
          {...{ [dataAttributes.category]: category }}
          {...{ [dataAttributes.status]: status ?? SeatStatus.Available }}
          {...props}
        />
        {label && (
          <text
            id={`${id}-label`}
            x={textX}
            y={textY}
            fontSize={seatLabelFontSize}
            fontWeight={200}
            letterSpacing={1}
            onClick={localOnClick}
            {...props}
            {...{ [dataAttributes.elementType]: undefined }}
            className={twMerge(props.className, "unselectable !stroke-1")}
          >
            {label ?? "A"}
          </text>
        )}
      </>
    );
  }
);

Seat.displayName = "Seat";

export default Seat;
