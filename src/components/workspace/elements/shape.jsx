import { forwardRef } from "react";
import * as lucide from "lucide-react";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";

export const shapeSize = 65;
export const shapeStrokeWidth = 0.65;

export const resizableRectangle = {
  width: 200,
  height: 100
};

const Shape = forwardRef(({ x, y, id, name, width, height, rx, resizable, className, color, ...props }, ref) => {
  if (name === "RectangleHorizontal") {
    return (
      <rect
        ref={ref}
        id={id}
        x={x}
        y={y}
        width={width ?? resizableRectangle.width}
        height={height ?? resizableRectangle.height}
        rx={rx ?? 15}
        className={twMerge(className, "fill-transparent", resizable && "resizable")}
        stroke={color}
        {...{ [dataAttributes.shape]: "RectangleHorizontal" }}
        {...props}
      />
    );
  }
  const Icon = lucide[name];
  return (
    <Icon
      id={id}
      ref={ref}
      x={x}
      y={y}
      width={width ?? shapeSize}
      height={height ?? shapeSize}
      className={twMerge(className, "stroke-[0.75] fill-transparent")}
      stroke={color}
      {...{ [dataAttributes.shape]: name }}
      {...props}
    />
  );
});

Shape.displayName = "Shape";

export default Shape;
