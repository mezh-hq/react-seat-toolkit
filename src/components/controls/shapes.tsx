import { memo, useCallback, useState } from "react";
import * as lucide from "lucide-react";
import { default as isEqual } from "lodash/isEqual";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { setCursor } from "@/store/reducers/editor";
import { fallible } from "@/utils";
import { resizableRectangle, shapeSize, shapeStrokeWidth } from "../workspace/elements/shape";

export const shapes = [
  lucide.RectangleHorizontal,
  lucide.Triangle,
  lucide.TriangleRight,
  lucide.Squircle,
  lucide.Pentagon,
  lucide.Hexagon,
  lucide.Octagon,
  lucide.CircleDot,
  lucide.CircleSlash,
  lucide.Diamond,
  lucide.Cone,
  lucide.Pyramid,
  lucide.ArrowBigDown,
  lucide.ArrowBigDownDash,
  lucide.ArrowBigUp,
  lucide.ArrowBigUpDash,
  lucide.ArrowBigLeft,
  lucide.ArrowBigLeftDash,
  lucide.ArrowBigRight,
  lucide.ArrowBigRightDash,
  lucide.Ticket,
  lucide.Power,
  lucide.Fence,
  lucide.LandPlot,
  lucide.Waypoints,
  lucide.Boxes,
  lucide.FireExtinguisher
];

const CursorShape = (Shape) => {
  const icon = (props) => (
    <Shape
      {...props}
      className={twMerge(props.className, "fill-transparent")}
      size={Shape.displayName === lucide.RectangleHorizontal.displayName ? resizableRectangle.width : shapeSize}
      strokeWidth={Shape.displayName === lucide.RectangleHorizontal.displayName ? 0.25 : shapeStrokeWidth}
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
      {shapes.map((Shape, i) => (
        <div
          key={i}
          className={twMerge(
            "cursor-pointer p-4 rounded-md flex justify-center items-center bg-gray-100 hover:bg-gray-200 transition-all duration-medium",
            selectedIndex == i && "bg-black/90 text-white hover:text-black"
          )}
          onClick={() => onShapeClick(CursorShape(Shape), i)}
        >
          <Shape size={32.5} strokeWidth={1.4} />
        </div>
      ))}
    </div>
  );
};

export const selectFirstShape = () =>
  fallible(() => {
    store.dispatch(setCursor(CursorShape(shapes[0])));
  });

export default memo(ShapeControls, isEqual);
