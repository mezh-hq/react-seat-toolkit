import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import { store } from "@/store";
import d3Extended from "./d3";

export const domSeatsToJSON = () => {
  return d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Seat}"]`).map((seat) => {
    return {
      id: seat.attr("id"),
      x: +seat.attr("cx"),
      y: +seat.attr("cy"),
      label: document.getElementById(`${seat.attr("id")}-label`)?.textContent,
      status: seat.attr(dataAttributes.status),
      category: seat.attr(dataAttributes.category)
    };
  });
};

export const domBoothsToJSON = () => {
  return d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`).map((booth) => {
    return {
      id: booth.attr("id"),
      x: +booth.attr("cx"),
      y: +booth.attr("cy")
    };
  });
};

export const domTextsToJSON = () => {};

export const domShapesToJSON = () => {};

export const domPolylineToJSON = () => {};

export const domImagesToJSON = () => {};

export const stateToJSON = () => {
  const state = store.getState().editor;
  return {
    name: state.location,
    categories: state.categories,
    sections: state.sections,
    seats: domSeatsToJSON(),
    booths: domBoothsToJSON()
  };
};
