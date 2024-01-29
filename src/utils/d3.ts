import * as d3 from "d3";

export const d3Extended = {
  selectById(id: string): d3.Selection<d3.BaseType, {}, HTMLElement, any> {
    return d3.select(`[id='${id}']`);
  }
};

export default d3Extended;
