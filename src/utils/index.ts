import * as d3 from "d3";
import { ids, selectors } from "@/constants";

export * from "./d3";
export * from "./workspace";

export const fallible = (fn: Function) => {
  try {
    fn();
  } catch (_) {}
};

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

export const getRelativeWorkspaceClickCoords = (e: any) => {
  let target = e.target;
  while (target.id !== ids.workspace) target = target.parentElement;
  const dim = target.getBoundingClientRect();
  return {
    x: e.clientX - dim.left,
    y: e.clientY - dim.top
  };
};

export const getRelativeClickCoordsWithTransform = (e: any) => {
  const coords = getRelativeWorkspaceClickCoords(e);
  const transform = d3.zoomTransform(document.querySelector(selectors.workspaceGroup));
  return {
    x: (coords.x - transform.x) / transform.k,
    y: (coords.y - transform.y) / transform.k
  };
};

export const calculateDistance = (point1, point2) => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getImageDimensions = async (base64File) => {
  const img = new Image();
  img.src = URL.createObjectURL(await fetch(base64File).then((res) => res.blob()));
  await img.decode();
  const width = img.width;
  const height = img.height;
  return {
    width,
    height
  };
};

export const rgbToHex = (rgb: string) => {
  if (!rgb) return "";
  function componentToHex(c) {
    const hex = Number(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  const [r, g, b] = rgb.match(/\d+/g);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
