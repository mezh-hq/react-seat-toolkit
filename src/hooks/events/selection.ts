import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Tool } from "@/components/toolbar/data";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes, ids, selectors } from "@/constants";
import { default as store } from "@/store";
import { clearAndSelectElements } from "@/store/reducers/editor";
import { coordsWithTransform, d3Extended } from "@/utils";

export const useSelection = () => {
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);
  useLayoutEffect(() => {
    const svg = d3Extended.selectById(ids.workspace);
    if (svg.node()) {
      if (selectedTool === Tool.Select) {
        const { top: workspaceTop, left: workspaceLeft } = d3Extended.selectionBounds(
          d3Extended.selectById(ids.workspace)
        );
        const selectionRect = {
          element: null,
          currentY: 0,
          currentX: 0,
          originX: 0,
          originY: 0,
          setElement: function (ele) {
            this.element = ele;
          },
          getNewAttributes: function () {
            const x = this.currentX < this.originX ? this.currentX : this.originX;
            const y = this.currentY < this.originY ? this.currentY : this.originY;
            const width = Math.abs(this.currentX - this.originX);
            const height = Math.abs(this.currentY - this.originY);
            return {
              x: x,
              y: y,
              width: width,
              height: height
            };
          },
          getCurrentAttributes: function () {
            const transform = d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup));
            const { x, y } = coordsWithTransform({ x: +this.element.attr("x"), y: +this.element.attr("y") }, transform);
            return {
              x1: x,
              y1: y,
              x2: x + Number(this.element.attr("width")) / transform.k,
              y2: y + Number(this.element.attr("height")) / transform.k
            };
          },
          init: function (newX, newY) {
            const rectElement = svg
              .append("rect")
              .attr("id", ids.workspaceSelection)
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("x", 0)
              .attr("y", 0)
              .attr("width", 0)
              .attr("height", 0)
              .classed("workspace-selection", true);
            this.setElement(rectElement);
            this.originX = newX;
            this.originY = newY;
            this.update(newX, newY);
          },
          update: function (newX: number, newY: number) {
            this.currentX = newX - (+this.element?.attr("width") || this.currentX === this.originX ? workspaceLeft : 0);
            this.currentY = newY - (+this.element?.attr("height") || this.currentY === this.originY ? workspaceTop : 0);
            const attributes = this.getNewAttributes();
            Object.keys(attributes).forEach((key) => {
              this.element.attr(key, attributes[key]);
            });
          },
          remove: function () {
            this.element.remove();
            this.element = null;
          }
        };

        const dragStart = (e) => {
          const p = d3Extended.pointer(e);
          selectionRect.init(p[0], p[1]);
        };

        const dragMove = (e) => {
          const p = d3Extended.pointer(e);
          selectionRect.update(p[0], p[1]);
        };

        const dragEnd = () => {
          const finalAttributes = selectionRect.getCurrentAttributes();
          selectionRect.remove();
          const elements = d3Extended.selectAll(`[${dataAttributes.element}]`);
          const idsToSelect = [];

          elements.forEach((element) => {
            const isSeat = element.attr(dataAttributes.elementType) === ElementType.Seat;
            const x = isSeat ? +element.attr("cx") : +element.attr("x");
            const y = isSeat ? +element.attr("cy") : +element.attr("y");
            if (
              x >= finalAttributes.x1 &&
              x <= finalAttributes.x2 &&
              y >= finalAttributes.y1 &&
              y <= finalAttributes.y2
            ) {
              const id = element.attr("id");
              if (!id?.includes("-label")) idsToSelect.push(id);
            }
          });
          store.dispatch(clearAndSelectElements(idsToSelect));
        };
        svg.call(d3Extended.drag().on("drag", dragMove).on("start", dragStart).on("end", dragEnd));
      } else {
        svg.call(d3Extended.drag().on("drag", null).on("start", null).on("end", null));
      }
    }
  }, [selectedTool]);
};

export const useSelectAll = () => {
  useEffect(() => {
    const handler = (e) => {
      const ctrlPressed = e.ctrlKey || e.metaKey;
      if (ctrlPressed && e.key === "a") {
        e.preventDefault();
        const seats = d3Extended
          .selectAll(`[${dataAttributes.elementType}="${ElementType.Seat}"]`)
          .map((seat) => seat.attr("id"));
        const booths = d3Extended
          .selectAll(`[${dataAttributes.elementType}="${ElementType.Booth}"]`)
          .map((booth) => booth.attr("id"));
        const shapes = d3Extended
          .selectAll(`[${dataAttributes.elementType}="${ElementType.Shape}"]`)
          .map((shape) => shape.attr("id"));
        const text = d3Extended
          .selectAll(`[${dataAttributes.elementType}="${ElementType.Text}"]`)
          .map((text) => text.attr("id"));
        const polylines = d3Extended
          .selectAll(`[${dataAttributes.elementType}="${ElementType.Polyline}"]`)
          .map((polyline) => polyline.attr("id"));
        const images = d3Extended
          .selectAll(`[${dataAttributes.elementType}="${ElementType.Image}"]`)
          .map((image) => image.attr("id"));
        store.dispatch(clearAndSelectElements([...seats, ...booths, ...shapes, ...text, ...polylines, ...images]));
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);
};
