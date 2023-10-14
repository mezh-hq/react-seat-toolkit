import { BreadCrumbs as BreadCrumbsComponent } from "@/components";

const argTypes = {
  breadcrumbs: {
    description: "An array of strings / objects containing the label and path for each breadcrumb"
  },
  className: {
    description:
      "Any additional CSS classes to be passed into the component. Existing classes will be overwritten in case of conflict",
    type: "string"
  }
};
export default {
  title: "Components/Breadcrumbs",
  component: BreadCrumbsComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
};

export const BreadCrumbs = {
  argTypes,
  args: {
    breadcrumbs: ["Home", "Challenges"]
  }
};

export const WithLinks = {
  argTypes,
  args: {
    breadcrumbs: [
      {
        label: "Home",
        path: "/"
      },
      {
        label: "Challenges",
        path: "/challenges"
      },
      "Challenge 1"
    ]
  }
};
