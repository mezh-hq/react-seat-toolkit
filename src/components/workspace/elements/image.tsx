import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { IImage, ISTKProps } from "@/types";

export interface IImageProps extends IImage {
  className?: string;
  consumer: ISTKProps;
  isSelected?: boolean;
}

const Image: React.FC<IImageProps> = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ x, y, id, href, width, height, consumer, isSelected: _, ...props }, ref: any) => {
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
        className={twMerge(
          props.className,
          "resizable fill-transparent object-cover",
          consumer.styles?.elements?.image?.base?.className
        )}
        preserveAspectRatio="none"
        style={consumer.styles?.elements?.image?.base?.properties}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
