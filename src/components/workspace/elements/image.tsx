import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { IImage, ISTKProps } from "@/types";

export interface IImageProps extends IImage {
  className?: string;
  consumer: ISTKProps;
  isSelected?: boolean;
  element?: any;
}

const Image: React.FC<IImageProps> = forwardRef(
  ({ x, y, id, href, width, height, rotation, locked, consumer, isSelected, element, ...props }, ref: any) => {
    const onMouseOver = (e: React.MouseEvent<SVGElement>) => {
      if (consumer.mode === "user") {
        consumer.events?.onImageHover?.(element, {
          x: e.clientX,
          y: e.clientY
        });
      }
    };
    return (
      <image
        ref={ref}
        id={id}
        x={x}
        y={y}
        href={href}
        width={width}
        height={height}
        {...props}
        {...{ [dataAttributes.objectLock]: locked }}
        className={twMerge(
          "resizable fill-transparent object-cover",
          isSelected && "outline outline-2 outline-blue-500 -outline-offset-2",
          props.className,
          consumer.styles?.elements?.image?.base?.className
        )}
        preserveAspectRatio="none"
        style={{
          transform: `rotate(${rotation ?? 0}deg)`,
          transformOrigin: `center`,
          ...consumer.styles?.elements?.image?.base?.properties
        }}
        onMouseOver={onMouseOver}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
