import * as d3 from "d3";

export const d3Extended = {
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

export default d3Extended;
