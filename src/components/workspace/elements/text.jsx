import { forwardRef } from "react";

export const textFontSize = 35;

const Text = forwardRef(
  ({ x, y, id, label, fontSize = textFontSize, fontWeight = 200, letterSpacing = 3, color, ...props }, ref) => {
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
        {...props}
      >
        {label}
      </text>
    );
  }
);

Text.displayName = "Text";

export default Text;
