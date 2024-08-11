import { drag, pointer, select, selectAll, selection, zoom, zoomIdentity, zoomTransform } from "d3";

declare module "d3" {
  interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
    moveToBack(): Selection<GElement, Datum, PElement, PDatum>;
    moveToFront(): Selection<GElement, Datum, PElement, PDatum>;
    map<T>(callback: (d: Selection<GElement, Datum, PElement, PDatum>, i: number) => T): T[];
    forEach<T>(callback: (d: Selection<GElement, Datum, PElement, PDatum>, i: number) => T): T[];
    rotation(): number;
  }
}

selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this);
  });
};

selection.prototype.moveToBack = function () {
  return this.each(function () {
    const firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

selection.prototype.map = function (callback) {
  const results = [];
  this.each(function (_, i) {
    results.push(callback(select(this), i));
  });
  return results;
};

selection.prototype.forEach = function (callback) {
  this.each(function (_, i) {
    callback(select(this), i);
  });
};

selection.prototype.rotation = function () {
  const transform = this.attr("transform");
  if (!transform) {
    return 0;
  }
  const match = transform.match(/rotate\(([^)]+)\)/);
  if (!match) {
    return 0;
  }
  return +match[1];
};

export const d3Extended = {
  drag,
  pointer,
  select,
  selectAll,
  zoom,
  zoomIdentity,
  zoomTransform,
  selectById(id: string): d3.Selection<Element, {}, HTMLElement, any> {
    return select(`[id='${id}']`);
  },
  getNodeCenter(node: any) {
    if (node.attr("cx")) {
      return { x: node.attr("cx"), y: node.attr("cy") };
    }
    return {
      x: +node.attr("x") + Number(node.attr("width")) / 2,
      y: +node.attr("y") + Number(node.attr("height")) / 2
    };
  },
  selectionWidth(selection: d3.Selection<any, any, any, any>) {
    return selection.node().getBoundingClientRect().width;
  },
  selectionBounds(selection: d3.Selection<any, any, any, any>) {
    return selection.node().getBoundingClientRect();
  }
};

export default d3Extended;
