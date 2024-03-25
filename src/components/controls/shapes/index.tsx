import { memo, useCallback, useState } from "react";
import { RectangleHorizontal } from "lucide-react";
import { default as isEqual } from "lodash/isEqual";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { setCursor } from "@/store/reducers/editor";
import { fallible } from "@/utils";
import { resizableRectangle, shapeSize, shapeStrokeWidth } from "../../workspace/elements/shape";
import { shapeList } from "./shape-list";

const CursorShape = (Shape) => {
  const icon = (props) => (
    <Shape
      {...props}
      className={twMerge(props.className, "fill-transparent")}
      size={Shape.displayName === RectangleHorizontal.displayName ? resizableRectangle.width : shapeSize}
      strokeWidth={Shape.displayName === RectangleHorizontal.displayName ? 0.25 : shapeStrokeWidth}
    />
  );
  icon.displayName = Shape.displayName;
  return icon;
};

const ShapeControls = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onShapeClick = useCallback((shape, i) => {
    fallible(() => {
      setSelectedIndex(i);
      store.dispatch(setCursor(shape));
    });
  }, []);

  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {shapeList.map((Shape, i) => (
        <div
          key={i}
          className={twMerge(
            "cursor-pointer p-5 rounded-md flex justify-center items-center bg-gray-100 hover:bg-gray-200 transition-all duration-medium",
            selectedIndex == i && "bg-black/90 text-white hover:text-black"
          )}
          onClick={() => onShapeClick(CursorShape(Shape), i)}
        >
          <Shape size={45} strokeWidth={1} />
        </div>
      ))}
    </div>
  );
};

export const selectFirstShape = () =>
  fallible(() => {
    store.dispatch(setCursor(CursorShape(shapeList[0])));
  });

export default memo(ShapeControls, isEqual);
