import { forwardRef } from "react";
import * as lucide from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ElementType } from "./utils";

export const shapeSize = 250;
export const shapeStrokeWidth = 0.25;

const Shape = forwardRef(({ x, y, id, name, resizable, className, ...props }, ref) => {
  const Icon = lucide[name];
  return (
    <Icon
      id={id}
      ref={ref}
      x={x}
      y={y}
      size={shapeSize}
      className={twMerge(className, "stroke-[0.25] fill-transparent", resizable && "resizable")}
      {...props}
      data-element-type={ElementType.Shape}
    />
  );
});

Shape.displayName = "Shape";

export default Shape;
