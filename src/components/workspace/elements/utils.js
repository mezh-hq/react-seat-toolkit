import * as d3 from "d3";
import { d3Extended } from "@/utils";
import Booth from "./booth";
import Seat from "./seat";

export const ElementType = {
  Booth: "booth",
  Seat: "seat"
};

export const elements = {
  [ElementType.Booth]: Booth,
  [ElementType.Seat]: Seat
};

export const handleBoothDrag = d3.drag().on("drag", function (event) {
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
  const controls = d3Extended.selectById(`${me.attr("id")}-controls`);
  const x = +me.attr("cx") + event.dx;
  const y = +me.attr("cy") + event.dy;
  me.attr("cx", x);
  me.attr("cy", y);
  controls.attr("cx", x);
  controls.attr("cy", y);
});
