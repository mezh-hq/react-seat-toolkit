import { drag, select } from "d3";
import { dataAttributes } from "@/constants";
import { resizeCursors } from "@/hooks/interactions";
import { default as store } from "@/store";
import { IPopulatedSeat } from "@/types";
import { d3Extended } from "@/utils";
import Booth from "./booth";
import Image from "./image";
import Polyline from "./polyline";
import Seat from "./seat";
import Shape from "./shape";
import Text from "./text";

export const ElementType = {
  Booth: "booth",
  Seat: "seat",
  Text: "text",
  Shape: "shape",
  Polyline: "polyline",
  Image: "image"
};

export const elements = {
  [ElementType.Booth]: Booth,
  [ElementType.Seat]: Seat,
  [ElementType.Text]: Text,
  [ElementType.Shape]: Shape,
  [ElementType.Polyline]: Polyline,
  [ElementType.Image]: Image
};

const repositionSeat = (seat, dx, dy) => {
  const x = +seat.attr("cx") + dx;
  const y = +seat.attr("cy") + dy;

  seat.attr("cx", x);
  seat.attr("cy", y);

  const label = d3Extended.selectById(`${seat.attr("id")}-label`);
  label.attr("x", +label.attr("x") + dx);
  label.attr("y", +label.attr("y") + dy);
};

const repositionText = (text, dx, dy) => {
  text.attr("x", +text.attr("x") + dx);
  text.attr("y", +text.attr("y") + dy);
};

const repositionShape = (shape, dx, dy) => {
  if (resizeCursors.includes(shape.style("cursor"))) return;
  const x = +shape.attr("x") + dx;
  const y = +shape.attr("y") + dy;
  shape.attr("x", x);
  shape.attr("y", y);
};

const repositionPolyline = (polyline, dx, dy) => {
  const points = polyline
    .attr("points")
    .split(" ")
    .map((point) => {
      const [x, y] = point.split(",");
      return `${+x + dx},${+y + dy}`;
    })
    .join(" ");
  polyline.attr("points", points);
};

const repositionElements = (currentElem, repositionFn, elementType: string, dx: number, dy: number) => {
  repositionFn(currentElem, dx, dy);
  store.getState().editor.selectedElementIds.forEach((id: string) => {
    if (currentElem.attr("id") !== id) {
      const element = d3Extended.selectById(id);
      if (element.attr(dataAttributes.elementType) === elementType) repositionFn(element, dx, dy);
    }
  });
};

export const handleDrag = drag().on("drag", function (event) {
  const me = select(this);
  const controls = d3Extended.selectById(`${me.attr("id")}-controls`);
  const x = +me.attr("x") + event.dx;
  const y = +me.attr("y") + event.dy;
  me.attr("x", x);
  me.attr("y", y);
  const center = d3Extended.getNodeCenter(me);
  controls.attr("cx", center.x);
  controls.attr("cy", center.y);
});

export const handleSeatDrag = drag().on("drag", function (event) {
  repositionElements(select(this), repositionSeat, ElementType.Seat, event.dx, event.dy);
});

export const handleTextDrag = drag().on("drag", function (event) {
  repositionElements(select(this), repositionText, ElementType.Text, event.dx, event.dy);
});

export const handleShapeDrag = drag().on("drag", function (event) {
  const me = select(this);
  if (me.attr(dataAttributes.objectLock) === "true") return;
  repositionElements(me, repositionShape, ElementType.Shape, event.dx, event.dy);
});

export const handlePolylineDrag = drag().on("drag", function (event) {
  repositionElements(select(this), repositionPolyline, ElementType.Polyline, event.dx, event.dy);
});

export const showSeat = (seat: d3.Selection<Element, {}, HTMLElement, any>) => {
  seat.style("opacity", "1");
  seat.style("pointer-events", "all");
  const label = d3Extended.selectById(`${seat.attr("id")}-label`);
  label?.style("opacity", "1");
  label?.style("pointer-events", "all");
};

export const hideSeat = (seat: d3.Selection<Element, {}, HTMLElement, any>) => {
  seat.style("opacity", "0");
  seat.style("pointer-events", "none");
  const label = d3Extended.selectById(`${seat.attr("id")}-label`);
  label?.style("opacity", "0");
  label?.style("pointer-events", "none");
};

export const showPreOffsetElements = () => {
  const seats = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Seat}"]`);
  if (seats.size() && +seats?.style("opacity") !== 0) {
    const booths = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`);
    const sections = d3Extended.selectAll(
      `[${dataAttributes.elementType}="${ElementType.Polyline}"][${dataAttributes.section}]`
    );
    const elementsEmbracingOffset = d3Extended.selectAll(`[${dataAttributes.embraceOffset}="true"]`);
    seats.forEach(hideSeat);
    booths.forEach((booth) => {
      booth.style("opacity", 0);
      booth.style("pointer-events", "none");
    });
    sections.forEach((section) => {
      section.style("opacity", 1);
      section.style("pointer-events", "all");
    });
    elementsEmbracingOffset.forEach((element) => {
      element.style("opacity", 1);
      element.style("pointer-events", "all");
    });
  }
};

export const showPostOffsetElements = () => {
  const seats = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Seat}"]`);
  if (seats.size() && +seats.style("opacity") !== 1) {
    const booths = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`);
    const sections = d3Extended.selectAll(
      `[${dataAttributes.elementType}="${ElementType.Polyline}"][${dataAttributes.section}]`
    );
    const elementsEmbracingOffset = d3Extended.selectAll(`[${dataAttributes.embraceOffset}="true"]`);
    seats.forEach(showSeat);
    booths.forEach((booth) => {
      booth.style("opacity", 1);
      booth.style("pointer-events", "all");
    });
    sections.forEach((section) => {
      if (section.attr(dataAttributes.sectionFreeSeating) !== "true") {
        section.style("opacity", 0);
        section.style("pointer-events", "none");
      }
    });
    elementsEmbracingOffset.forEach((element) => {
      element.style("opacity", 0);
      element.style("pointer-events", "none");
    });
  }
};

export const showAllElements = () => {
  const seats = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Seat}"]`);
  const booths = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`);
  const sections = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Polyline}"]`);
  const elementsEmbracingOffset = d3Extended.selectAll(`[${dataAttributes.embraceOffset}="true"]`);
  seats.forEach(showSeat);
  booths.forEach((booth) => {
    booth.style("opacity", 1);
    booth.style("pointer-events", "all");
  });
  sections.forEach((section) => {
    section.style("opacity", 1);
    section.style("pointer-events", "all");
  });
  elementsEmbracingOffset.forEach((element) => {
    element.style("opacity", 1);
    element.style("pointer-events", "all");
  });
};

export const getDetailedSeat = (seat, categoryObject, sectionObject): IPopulatedSeat => {
  return {
    ...seat,
    category: categoryObject ? { ...categoryObject, section: sectionObject } : null
  };
};
