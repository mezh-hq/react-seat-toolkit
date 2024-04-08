import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { dataAttributes, selectors } from "@/constants";
import { ISTKProps, IText } from "@/types";
import { d3Extended, getRelativeClickCoordsWithTransform } from "@/utils";
import { panAndZoomToArea } from "../zoom";

export const textFontSize = 35;

export interface ITextProps extends IText {
  className: string;
  consumer: ISTKProps;
  onClick: (e: any) => void;
  isSelected?: boolean;
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
      ...props
    },
    ref: any
  ) => {
    const localOnClick = (e) => {
      onClick(e);
      if (embraceOffset) {
        const visibilityOffset = +d3Extended.select(selectors.workspaceGroup).attr(dataAttributes.visibilityOffset);
        if (visibilityOffset > 0) {
          const coords = getRelativeClickCoordsWithTransform(e);
          panAndZoomToArea({
            k: visibilityOffset,
            x: coords.x,
            y: coords.y
          });
        }
      }
    };

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
        onClick={localOnClick}
        className={twMerge(props.className, consumer.styles?.elements?.text?.base?.className)}
        style={consumer.styles?.elements?.text?.base?.properties}
        {...{ [dataAttributes.embraceOffset]: embraceOffset }}
      >
        {label}
      </text>
    );
  }
);

Text.displayName = "Text";

export default Text;
