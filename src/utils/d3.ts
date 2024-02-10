import * as d3 from "d3";

export const d3Extended = {
  ...d3,
  selectById(id: string): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    return d3.select(`[id='${id}']`);
  },
  getNodeCenter(node: any) {
    if (node.attr("cx")) {
      return { x: node.attr("cx"), y: node.attr("cy") };
    }
    return {
      x: +node.attr("x") + Number(node.attr("width")) / 2,
      y: +node.attr("y") + Number(node.attr("height")) / 2
    };
  }
};

d3.selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this);
  });
};

d3.selection.prototype.moveToBack = function () {
  return this.each(function () {
    const firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

export default d3Extended;
