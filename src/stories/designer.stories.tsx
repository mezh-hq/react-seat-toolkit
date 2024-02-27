import SeatToolkit from "@/index";
import { STKMode } from "@/types";

export default {
  title: "Designer Mode",
  component: SeatToolkit,
  parameters: {
    layout: "fullscreen"
  },
  argTypes: {}
};

export const Default = {
  render: () => <SeatToolkit mode={STKMode.Designer} />
};
