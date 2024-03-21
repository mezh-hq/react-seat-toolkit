import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { IBooth, ISTKProps } from "@/types";

export const boothSize = 39;

export interface IBoothProps extends IBooth {
  className: string;
  consumer: ISTKProps;
}

const Booth: React.FC<IBoothProps> = forwardRef(({ id, x, y, consumer, ...props }, ref: any) => {
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
      style={consumer.styles?.elements?.booth?.base?.properties}
    />
  );
});

Booth.displayName = "Booth";

export default Booth;
