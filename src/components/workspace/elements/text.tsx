import { forwardRef } from "react";
import { IText } from "@/types";

export const textFontSize = 35;

export interface ITextProps extends IText {}

const Text: React.FC<ITextProps> = forwardRef(
  ({ x, y, id, label, fontSize = textFontSize, fontWeight = 200, letterSpacing = 3, color, ...props }, ref: any) => {
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
      >
        {label}
      </text>
    );
  }
);

Text.displayName = "Text";

export default Text;
