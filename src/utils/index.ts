export * from "./d3";
export * from "./workspace";

export const isWithinBounds = (x: number, y: number, bounds: DOMRect) => {
  return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
};

export const getRelativeClickCoords = (e: any) => {
  const dim = e.target.getBoundingClientRect();
  return {
    x: e.clientX - dim.left,
    y: e.clientY - dim.top
  };
};

export const getRelativeClickCoordsWithTransform = (e: any, transform) => {
  const coords = getRelativeClickCoords(e);
  if (!transform) return coords;
  return {
    x: (coords.x - transform.x) / transform.k,
    y: (coords.y - transform.y) / transform.k
  };
};
