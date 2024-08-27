import { useMemo } from "react";
import { shapeList } from "@/components/controls/shapes/shape-list";
import { ISTKProps } from "@/types";

export const getMergedShapes = (options: ISTKProps["options"]) => {
  if (!options?.shapes) return shapeList;
  if (options?.shapes.icons.length === 0) return shapeList;
  if (options?.shapes.overrideDefaultIconset) return options.shapes.icons;
  return [...shapeList, ...options.shapes.icons];
};

export const useShapes = ({ options }: Pick<ISTKProps, "options">) => {
  return useMemo(() => {
    return getMergedShapes(options);
  }, [options?.shapes]);
};

export const useShapeMap = ({ options }: Pick<ISTKProps, "options">) => {
  return useMemo(
    () =>
      getMergedShapes(options).reduce((acc, shape) => {
        acc[shape.displayName] = shape;
        return acc;
      }, {}),
    [options?.shapes]
  );
};
