import { forwardRef } from "react";

export const textFontSize = 35;

const Text = forwardRef(
  ({ x, y, id, label, fontSize = textFontSize, fontWeight = 200, letterSpacing = 3, ...props }, ref) => {
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
      >
        {label}
      </text>
    );
  }
);

Text.displayName = "Text";

export default Text;
