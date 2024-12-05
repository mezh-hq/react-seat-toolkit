import { forwardRef, useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes, seatStatusColors } from "@/constants";
import { ISTKProps } from "@/types";
import { ISeat, ISeatCategory, ISection, SeatStatus } from "@/types/elements";
import { d3Extended } from "@/utils";
import { getDetailedSeat } from "./utils";

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
    {
      x,
      y,
      id,
      label,
      categories,
      category,
      sections,
      status,
      onClick,
      consumer,
      rotation,
      element,
      isSelected,
      ...props
    },
    ref: any
  ) => {
    const categoryObject = useMemo(() => categories?.find?.((c) => c.id === category), [categories, category]);
    const sectionObject = useMemo(
      () => sections?.find?.((s) => s.id === categoryObject?.section),
      [sections, categoryObject]
    );

    const seatSize = consumer.options?.seatSize ?? 28;

    const seatLabelFontSize = seatSize / 3;

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
        if (status === SeatStatus.Unavailable || status === SeatStatus.Reserved || status === SeatStatus.Locked) {
          seat.style("color", consumerSeatStatusColors?.[status]?.background ?? seatStatusColors[status].background);
          seatLabel?.style("stroke", consumerSeatStatusColors?.[status]?.label ?? seatStatusColors[status].label);
        } else {
          if (categoryObject) {
            seat.style("color", categoryObject.color);
            seatLabel?.style("stroke", categoryObject.textColor);
          } else {
            seat.style("color", seatStatusColors[status].background);
            seatLabel?.style("stroke", seatStatusColors[status].label);
          }
        }
      }
    }, [ref, categoryObject, status]);

    const localOnClick = (e) => {
      onClick(e);
      consumer.events?.onSeatClick?.(getDetailedSeat(element, categoryObject, sectionObject));
    };

    const onMouseOver = (e: React.MouseEvent<SVGElement>) => {
      if (consumer.mode === "user") {
        consumer.events?.onSeatHover?.(getDetailedSeat(element, categoryObject, sectionObject), {
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    const onMouseOut = (e: React.MouseEvent<SVGElement>) => {
      if (consumer.mode === "user") {
        consumer.events?.onSeatLeave?.(getDetailedSeat(element, categoryObject, sectionObject), {
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    status ??= SeatStatus.Available;

    const seatProps = {
      ref,
      id,
      onClick: localOnClick,
      [dataAttributes.category]: category,
      [dataAttributes.section]: categoryObject?.section,
      [dataAttributes.status]: status,
      ...props,
      className: twMerge(
        props.className,
        consumer.mode === "designer" && "filter hover:brightness-[1.05]",
        consumer.mode === "user" && status === SeatStatus.Available && "cursor-pointer filter hover:brightness-[1.05]",
        consumer.styles?.elements?.seat?.base?.className
      ),
      style: {
        transform: `rotate(${rotation ?? 0}deg)`,
        transformOrigin: "center",
        ...consumer.styles?.elements?.seat?.base?.properties
      },
      onMouseOver: onMouseOver,
      onMouseOut: onMouseOut
    };

    return (
      <>
        {element.square ? (
          <rect
            x={x - seatSize / 2}
            y={y - seatSize / 2}
            height={seatSize}
            width={seatSize}
            rx={3}
            ry={3}
            {...seatProps}
          />
        ) : (
          <circle cx={x} cy={y} r={seatSize / 2} {...seatProps} />
        )}
        {SeatIcon && (
          <SeatIcon
            x={x - seatSize / 2.73}
            y={y - seatSize / 2.65}
            width={seatSize * 0.75}
            height={seatSize * 0.75}
            size={seatSize * 0.75}
            className={twMerge(consumer.styles?.elements?.seat?.icon?.className, "stk-seat-icon")}
            style={consumer.styles?.elements?.seat?.icon?.properties}
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
