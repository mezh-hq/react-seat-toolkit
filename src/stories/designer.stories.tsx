import { STKMode } from "@/constants";
import SeatToolkit from "@/index";

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
