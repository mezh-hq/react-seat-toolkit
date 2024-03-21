import { forwardRef, useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes, seatStatusColors } from "@/constants";
import { ISTKProps } from "@/types";
import { ISeat, ISeatCategory, ISection, SeatStatus } from "@/types/elements";
import { d3Extended } from "@/utils";

export const seatSize = 28;

export const seatLabelFontSize = seatSize / 3;

export interface ISeatProps extends ISeat {
  className?: string;
  consumer: ISTKProps;
  element: ISeat;
  categories: ISeatCategory[];
  sections: ISection[];
  onClick: (e: any) => void;
  isSelected?: boolean;
}

const Seat: React.FC<ISeatProps> = forwardRef(
  (
    { x, y, id, label, categories, category, sections, status, onClick, consumer, element, isSelected, ...props },
    ref: any
  ) => {
    const categoryObject = useMemo(() => categories?.find?.((c) => c.id === category), [categories, category]);
    const sectionObject = useMemo(
      () => sections?.find?.((s) => s.id === categoryObject?.section),
      [sections, categoryObject]
    );

    const showLabel = consumer.options?.showSeatLabels ?? true;

    const consumerSeatStatusColors = consumer.styles?.elements?.seat?.statusColors;

    const SeatIcon = isSelected ? consumer.options?.selectedSeatIcon : consumer.options?.seatIcon;

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
        if (status === SeatStatus.Unavailable || status === SeatStatus.Reserved || status === SeatStatus.Locked) {
          seat.style("color", consumerSeatStatusColors?.[status]?.background ?? seatStatusColors[status].background);
          seatLabel?.style("stroke", consumerSeatStatusColors?.[status]?.label ?? seatStatusColors[status].label);
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
        category: categoryObject ? { ...categoryObject, section: sectionObject } : null
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
          {...{ [dataAttributes.section]: categoryObject?.section }}
          {...{ [dataAttributes.status]: status ?? SeatStatus.Available }}
          {...props}
          className={twMerge(
            props.className,
            "filter hover:brightness-[1.05]",
            consumer.styles?.elements?.seat?.base?.className
          )}
          style={consumer.styles?.elements?.seat?.base?.properties}
        />
        {SeatIcon && (
          <SeatIcon
            x={x - seatSize / 2.73}
            y={y - seatSize / 2.65}
            width={seatSize * 0.75}
            height={seatSize * 0.75}
            size={seatSize * 0.75}
          />
        )}
        {label && showLabel && !SeatIcon && (
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
