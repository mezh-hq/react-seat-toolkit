import { forwardRef } from "react";

export const textFontSize = 35;

const Text: React.FC<any> = forwardRef(
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
