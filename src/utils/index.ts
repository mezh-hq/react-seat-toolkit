export * from "./d3";
export * from "./workspace";

export const isWithinBounds = (x: number, y: number, bounds: DOMRect) => {
  return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
};
