import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { useShapeMap } from "@/hooks";
import { ISTKProps, IShape } from "@/types";

export const shapeSize = 50;
export const shapeStrokeWidth = 0.65;

export const resizableRectangle = {
  width: 150,
  height: 75
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
    const shapes = useShapeMap({ options: consumer.options });
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
            transformOrigin: `center`,
            ...consumer.styles?.elements?.shape?.base?.properties
          }}
          {...{ [dataAttributes.shape]: "RectangleHorizontal" }}
          {...props}
        />
      );
    }
    width ??= shapeSize;
    height ??= shapeSize;
    const Icon = shapes[name];
    return (
      <g
        x={x}
        y={y}
        style={{
          transform: `rotate(${rotation ?? 0}deg)`,
          transformOrigin: "center"
        }}
      >
        <Icon
          id={id}
          ref={ref}
          x={x}
          y={y}
          width={width}
          height={height}
          className={twMerge(className, "stroke-[0.9]", consumer.styles?.elements?.shape?.base?.className)}
          style={{
            color: color ?? "transparent",
            stroke,
            ...consumer.styles?.elements?.shape?.base?.properties
          }}
          {...{ [dataAttributes.shape]: name }}
          {...props}
        />
      </g>
    );
  }
);

Shape.displayName = "Shape";

export default Shape;
