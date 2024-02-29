import { forwardRef } from "react";
import { IBooth } from "@/types";

export const boothSize = 39;

export interface IBoothProps extends IBooth {}

const Booth: React.FC<IBoothProps> = forwardRef(({ id, x, y, ...props }, ref: any) => {
  return <rect ref={ref} id={id} x={x} y={y} width={boothSize} height={boothSize} rx={5} ry={5} {...props} />;
});

Booth.displayName = "Booth";

export default Booth;
