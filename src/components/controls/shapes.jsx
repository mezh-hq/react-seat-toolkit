import { memo, useCallback, useState } from "react";
import {
  ArrowBigDown,
  ArrowBigDownDash,
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigRight,
  ArrowBigRightDash,
  ArrowBigUp,
  ArrowBigUpDash,
  Boxes,
  CircleDot,
  CircleSlash,
  Cone,
  Diamond,
  Fence,
  Hexagon,
  LandPlot,
  Octagon,
  Pentagon,
  Power,
  Pyramid,
  RectangleHorizontal,
  RectangleVertical,
  Squircle,
  Ticket,
  Triangle,
  TriangleRight,
  Waypoints
} from "lucide-react";
import { isEqual } from "lodash";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { setCursor } from "@/store/reducers/editor";
import { fallible } from "@/utils";

export const shapes = [
  Triangle,
  TriangleRight,
  Squircle,
  Hexagon,
  Octagon,
  Pentagon,
  CircleDot,
  CircleSlash,
  RectangleHorizontal,
  RectangleVertical,
  Diamond,
  Cone,
  Pyramid,
  ArrowBigDown,
  ArrowBigDownDash,
  ArrowBigUp,
  ArrowBigUpDash,
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigRight,
  ArrowBigRightDash,
  Ticket,
  Power,
  Fence,
  LandPlot,
  Waypoints,
  Boxes
];

const CursorShape = (Shape) => {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <Shape {...props} className={twMerge(props.className, "fill-transparent")} size={250} strokeWidth={0.3} />
  );
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
    <div className="w-full grid grid-cols-3 gap-2 ">
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
    console.log("selectFirstShape");
    store.dispatch(setCursor(CursorShape(shapes[0])));
  });

export default memo(ShapeControls, isEqual);
