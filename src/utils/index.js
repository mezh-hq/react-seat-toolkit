export const computeFilterQuery = (filters) =>
  filters.reduce((acc, curr) => {
    if (curr.value) {
      acc += `filter[${curr.key}]=${curr.options ? curr.value : `/${curr.value}/`}&`;
    }
    return acc;
  }, "");

export const computeSortQuery = (sorts) =>
  sorts.reduce((acc, curr) => {
    if (curr.direction !== 0) {
      acc += `sort[${curr.key}]=${curr.direction}&`;
    }
    return acc;
  }, "");
