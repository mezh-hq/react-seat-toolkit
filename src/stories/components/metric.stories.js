import { Metric as MetricComponent } from "@/components";

const argTypes = {
  metric: {
    description: "The metric to be displayed",
    type: "string"
  },
  value: {
    description: "The value of the metric",
    type: "number"
  },
  styles: {
    description: "The styles to be applied to the metric component",
    type: "object"
  }
};
export default {
  title: "Components/Metric",
  component: MetricComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
};

export const Metric = {
  argTypes,
  args: {
    metric: "Max Score",
    value: 100,
    styles: {
      root: "p-5 bg-gray-100/80 rounded-md",
      metric: "",
      value: ""
    }
  }
};
