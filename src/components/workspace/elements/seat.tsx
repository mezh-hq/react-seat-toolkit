import { forwardRef, useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes, seatStatusColors } from "@/constants";
import { ISTKProps } from "@/types";
import { ISeat, ISeatCategory, SeatStatus } from "@/types/elements";
import { d3Extended } from "@/utils";

export const seatSize = 28;

export const seatLabelFontSize = seatSize / 3;

export interface ISeatProps extends ISeat {
  className?: string;
  consumer: ISTKProps;
  element: ISeat;
  categories: ISeatCategory[];
  onClick: (e: any) => void;
}

const Seat: React.FC<ISeatProps> = forwardRef(
  ({ x, y, id, label, categories, category, status, onClick, consumer, element, ...props }, ref: any) => {
    const categoryObject = useMemo(() => categories?.find?.((c) => c.id === category), [categories, category]);

    const showLabel = consumer.options?.showSeatLabels ?? true;

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
      consumer.events?.onSeatClick?.({
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
        {label && showLabel && (
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
