import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { IBooth, ISTKProps } from "@/types";

export const boothSize = 39;

export interface IBoothProps extends IBooth {
  className: string;
  consumer: ISTKProps;
  isSelected?: boolean;
  element?: any;
}
const Booth: React.FC<IBoothProps> = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ id, x, y, rotation, consumer, isSelected: _, element: __, ...props }, ref: any) => {
    return (
      <rect
        ref={ref}
        id={id}
        x={x}
        y={y}
        width={boothSize}
        height={boothSize}
        rx={5}
        ry={5}
        {...props}
        className={twMerge(props.className, consumer.styles?.elements?.booth?.base?.className)}
        style={{
          transform: `rotate(${rotation ?? 0}deg)`,
          transformOrigin: `${x + boothSize / 2}px ${y + boothSize / 2}px`,
          ...consumer.styles?.elements?.booth?.base?.properties
        }}
      />
    );
  }
);

Booth.displayName = "Booth";

export default Booth;
