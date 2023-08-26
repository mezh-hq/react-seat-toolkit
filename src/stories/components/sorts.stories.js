import { Sorts as SortsComponent } from "@/components";

const argTypes = {
  setSortQuery: {
    description:
      "A setter function to set the parsed query string. The format of the query string is `sort[field]=direction`",
    type: "function"
  },
  sorts: {
    description: "An array of objects containing the `key` and `label` and initial `direction` of the sort",
    type: "array"
  }
};

export default {
  title: "Components/Sorts",
  component: SortsComponent,
  parameters: {},
  tags: ["autodocs"],
  argTypes
};

export const Sorts = {
  args: {
    sorts: [
      {
        key: "max_score",
        label: "Sort by points",
        direction: 0
      },
      {
        key: "created_at",
        label: "Sort by upload time",
        direction: -1
      }
    ],
    setSortQuery: () => {}
  },
  argTypes
};
