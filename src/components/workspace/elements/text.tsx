import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes } from "@/constants";
import { ISTKProps, IText } from "@/types";

export const textFontSize = 35;

export interface ITextProps extends IText {
  className: string;
  consumer: ISTKProps;
  onClick: (e: any) => void;
  isSelected?: boolean;
  element?: any;
}

const Text: React.FC<ITextProps> = forwardRef(
  (
    {
      x,
      y,
      id,
      label,
      fontSize = textFontSize,
      fontWeight = 200,
      letterSpacing = 3,
      color,
      consumer,
      embraceOffset,
      onClick,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isSelected: _,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      element: __,
      ...props
    },
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
        {...props}
        onClick={onClick}
        className={twMerge(
          props.className,
          consumer.styles?.elements?.text?.base?.className,
          consumer.mode === "user" && "pointer-events-none"
        )}
        style={{ ...consumer.styles?.elements?.text?.base?.properties, stroke: color, color }}
        {...{ [dataAttributes.embraceOffset]: embraceOffset }}
      >
        {label}
      </text>
    );
  }
);

Text.displayName = "Text";

export default Text;
