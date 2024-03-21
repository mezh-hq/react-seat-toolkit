import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ISTKProps, IText } from "@/types";

export const textFontSize = 35;

export interface ITextProps extends IText {
  className: string;
  consumer: ISTKProps;
}

const Text: React.FC<ITextProps> = forwardRef(
  (
    { x, y, id, label, fontSize = textFontSize, fontWeight = 200, letterSpacing = 3, color, consumer, ...props },
    ref: any
  ) => {
    return (
      <text
        ref={ref}
        id={id}
        x={x}
        y={y}
        fontSize={fontSize}
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
        stroke={color}
        color={color}
        {...props}
        className={twMerge(props.className, consumer.styles?.elements?.text?.base?.className)}
        style={consumer.styles?.elements?.text?.base?.properties}
      >
        {label}
      </text>
    );
  }
);

Text.displayName = "Text";

export default Text;
