import { memo, useCallback, useState } from "react";
import { RectangleHorizontal } from "lucide-react";
import { default as isEqual } from "lodash/isEqual";
import { twMerge } from "tailwind-merge";
import { useShapes } from "@/hooks";
import { getMergedShapes } from "@/hooks/shapes";
import { store } from "@/store";
import { setCursor } from "@/store/reducers/editor";
import { ISTKProps } from "@/types";
import { fallible } from "@/utils";
import { resizableRectangle, shapeSize, shapeStrokeWidth } from "../../workspace/elements/shape";

const CursorShape = (Shape) => {
  const icon = (props) => (
    <Shape
      {...props}
      className={twMerge(
        props.className,
        "fill-transparent",
        Shape.displayName !== RectangleHorizontal.displayName && "stroke-[0.9]"
      )}
      size={Shape.displayName === RectangleHorizontal.displayName ? resizableRectangle.width : shapeSize}
      strokeWidth={Shape.displayName === RectangleHorizontal.displayName ? 0.25 : shapeStrokeWidth}
    />
  );
  icon.displayName = Shape.displayName;
  return icon;
};

const Controls = ({ options }: Pick<ISTKProps, "options">) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onShapeClick = useCallback((shape, i) => {
    fallible(() => {
      setSelectedIndex(i);
      store.dispatch(setCursor(shape));
    });
  }, []);

  const shapes = useShapes({ options });

  return (
    <div className="w-full grid grid-cols-5 gap-4">
      {shapes.map((Shape, i) => (
        <div
          key={i}
          className={twMerge(
            "cursor-pointer aspect-square w-full rounded-lg flex justify-center items-center text-slate-500 bg-gray-100 transition-all duration-medium",
            selectedIndex == i && "bg-black/90 text-white"
          )}
          onClick={() => onShapeClick(CursorShape(Shape), i)}
        >
          <Shape size={20} />
        </div>
      ))}
    </div>
  );
};

export const selectFirstShape = ({ options }: Pick<ISTKProps, "options">) =>
  fallible(() => {
    store.dispatch(setCursor(CursorShape(getMergedShapes(options)[0])));
  });

const ShapeControls = memo(Controls, isEqual);

(ShapeControls as any).name = "ShapeControls";

export default ShapeControls;
