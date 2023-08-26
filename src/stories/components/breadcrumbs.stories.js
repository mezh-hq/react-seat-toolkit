import { BreadCrumbs as BreadCrumbsComponent } from "@/components";

const argTypes = {
  breadcrumbs: {
    description: "An array of strings / objects containing the label and path for each breadcrumb"
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
