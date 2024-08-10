import { ElementType } from "@/components/workspace/elements";
import { dataAttributes, selectors } from "@/constants";
import { store } from "@/store";
import { rgbToHex } from ".";
import { default as d3Extended } from "./d3";

export const domSeatsToJSON = () => {
  return d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Seat}"]`).map((seat) => {
    return {
      id: seat.attr("id"),
      x: +seat.attr("cx"),
      y: +seat.attr("cy"),
      label: document.getElementById(`${seat.attr("id")}-label`)?.textContent,
      status: seat.attr(dataAttributes.status),
      category: seat.attr(dataAttributes.category),
      rotation: seat.rotation()
    };
  });
};

export const domBoothsToJSON = () => {
  return d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`).map((booth) => {
    return {
      id: booth.attr("id"),
      x: +booth.attr("x"),
      y: +booth.attr("y"),
      rotation: booth.rotation()
    };
  });
};

export const domTextToJSON = () => {
  return d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Text}"]`).map((text) => {
    return {
      id: text.attr("id"),
      x: +text.attr("x"),
      y: +text.attr("y"),
      label: text.text(),
      fontSize: +text.attr("font-size"),
      fontWeight: +text.attr("font-weight"),
      letterSpacing: +text.attr("letter-spacing"),
      color: rgbToHex(text.style("stroke")) || text.attr("stroke"),
      embraceOffset: text.attr(dataAttributes.embraceOffset) === "true",
      rotation: text.rotation()
    };
  });
};

export const domShapesToJSON = () => {
  return d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Shape}"]`).map((shape) => {
    return {
      id: shape.attr("id"),
      name: shape.attr(dataAttributes.shape),
      x: +shape.attr("x"),
      y: +shape.attr("y"),
      width: +shape.attr("width"),
      height: +shape.attr("height"),
      rx: shape.attr("rx") ? +shape.attr("rx") : undefined,
      color: rgbToHex(shape.style("color")) || shape.attr("color"),
      stroke: rgbToHex(shape.style("stroke")) || shape.attr("stroke"),
      rotation: shape.rotation()
    };
  });
};

export const domPolylineToJSON = () => {
  return d3Extended
    .selectAll(`[${dataAttributes.elementType}="${ElementType.Polyline}"]`)
    .map((polyline) => {
      return {
        id: polyline.attr("id"),
        points: polyline
          .attr("points")
          .split(" ")
          .map((point) => {
            const [x, y] = point.split(",");
            return { x: +x, y: +y };
          }),
        section: polyline.attr(dataAttributes.section),
        color: rgbToHex(polyline.style("color")) || polyline.attr("color"),
        stroke: rgbToHex(polyline.style("stroke")) || polyline.attr("stroke"),
        rotation: polyline.rotation()
      };
    })
    .filter((polyline) => polyline.points.length > 1);
};

export const domImagesToJSON = () => {
  return d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Image}"]`).map((image) => {
    return {
      id: image.attr("id"),
      x: +image.attr("x"),
      y: +image.attr("y"),
      width: +image.attr("width"),
      height: +image.attr("height"),
      href: image.attr("href"),
      rotation: image.rotation()
    };
  });
};

export const domTransform = () => {
  return d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup));
};

export const stateToJSON = () => {
  const state = store.getState().editor;
  return {
    name: state.location,
    categories: state.categories.slice(1),
    sections: state.sections.slice(1),
    seats: domSeatsToJSON(),
    booths: domBoothsToJSON(),
    text: domTextToJSON(),
    shapes: domShapesToJSON(),
    polylines: domPolylineToJSON(),
    images: domImagesToJSON(),
    workspace: {
      initialViewBoxScale: state.initialViewBoxScale,
      initialViewBoxScaleForWidth: state.initialViewBoxScaleForWidth,
      visibilityOffset: state.visibilityOffset
    }
  };
};
