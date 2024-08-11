import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { shapes } from "@/components/controls/shapes/shape-list";
import { dataAttributes } from "@/constants";
import { ISTKProps, IShape } from "@/types";

export const shapeSize = 65;
export const shapeStrokeWidth = 0.65;

export const resizableRectangle = {
  width: 200,
  height: 100
};

export interface IShapeProps extends IShape {
  className?: string;
  resizable?: boolean;
  consumer: ISTKProps;
  isSelected?: boolean;
  element?: any;
}

const Shape: React.FC<IShapeProps> = forwardRef(
  (
    {
      x,
      y,
      id,
      name,
      width,
      height,
      rx,
      resizable,
      className,
      stroke,
      color,
      rotation,
      consumer,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isSelected: _,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      element: __,
      ...props
    },
    ref: any
  ) => {
    if (name === "RectangleHorizontal") {
      width ??= resizableRectangle.width;
      height ??= resizableRectangle.height;
      return (
        <rect
          ref={ref}
          id={id}
          x={x}
          y={y}
          width={width}
          height={height}
          rx={rx ?? 15}
          className={twMerge(className, resizable && "resizable", consumer.styles?.elements?.shape?.base?.className)}
          style={{
            color: color ?? "transparent",
            stroke,
            transform: `rotate(${rotation ?? 0}deg)`,
            transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
            ...consumer.styles?.elements?.shape?.base?.properties
          }}
          {...{ [dataAttributes.shape]: "RectangleHorizontal" }}
          {...props}
        />
      );
    }
    const Icon = shapes[name];
    return (
      <Icon
        id={id}
        ref={ref}
        x={x}
        y={y}
        width={width ?? shapeSize}
        height={height ?? shapeSize}
        className={twMerge(className, "stroke-[0.75]")}
        style={{ color: color ?? "transparent", stroke }}
        {...{ [dataAttributes.shape]: name }}
        {...props}
      />
    );
  }
);

Shape.displayName = "Shape";

export default Shape;
