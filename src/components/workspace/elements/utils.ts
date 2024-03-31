import * as d3 from "d3";
import { dataAttributes } from "@/constants";
import { resizeCursors } from "@/hooks/interactions";
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

export const handleDrag = d3.drag().on("drag", function (event) {
  const me = d3.select(this);
  const controls = d3Extended.selectById(`${me.attr("id")}-controls`);
  const x = +me.attr("x") + event.dx;
  const y = +me.attr("y") + event.dy;
  me.attr("x", x);
  me.attr("y", y);
  const center = d3Extended.getNodeCenter(me);
  controls.attr("cx", center.x);
  controls.attr("cy", center.y);
});

export const handleSeatDrag = d3.drag().on("drag", function (event) {
  const me = d3.select(this);

  const x = +me.attr("cx") + event.dx;
  const y = +me.attr("cy") + event.dy;

  me.attr("cx", x);
  me.attr("cy", y);

  const controls = d3Extended.selectById(`${me.attr("id")}-controls`);
  controls.attr("cx", x);
  controls.attr("cy", y);

  const label = d3Extended.selectById(`${me.attr("id")}-label`);
  label.attr("x", +label.attr("x") + event.dx);
  label.attr("y", +label.attr("y") + event.dy);
});

export const handleTextDrag = d3.drag().on("drag", function (event) {
  const me = d3.select(this);
  me.attr("x", +me.attr("x") + event.dx);
  me.attr("y", +me.attr("y") + event.dy);
});

export const handleShapeDrag = d3.drag().on("drag", function (event) {
  const me = d3.select(this);
  if (resizeCursors.includes(me.style("cursor"))) return;
  const x = +me.attr("x") + event.dx;
  const y = +me.attr("y") + event.dy;
  me.attr("x", x);
  me.attr("y", y);
});

export const handlePolylineDrag = d3.drag().on("drag", function (event) {
  const me = d3.select(this);
  const points = me
    .attr("points")
    .split(" ")
    .map((point) => {
      const [x, y] = point.split(",");
      return `${+x + event.dx},${+y + event.dy}`;
    })
    .join(" ");
  me.attr("points", points);
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
  const booths = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`);
  const sections = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Polyline}"]`);
  const elementsEmbracingOffset = d3Extended.selectAll(`[${dataAttributes.embraceOffset}="true"]`);
  if (+seats.style("opacity") !== 0) {
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
  const booths = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`);
  const sections = d3Extended.selectAll(`[${dataAttributes.elementType}="${ElementType.Polyline}"]`);
  const elementsEmbracingOffset = d3Extended.selectAll(`[${dataAttributes.embraceOffset}="true"]`);
  if (+seats.style("opacity") !== 1) {
    seats.forEach(showSeat);
    booths.forEach((booth) => {
      booth.style("opacity", 1);
      booth.style("pointer-events", "all");
    });
    sections.forEach((section) => {
      if (section.attr(dataAttributes.section)) {
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
