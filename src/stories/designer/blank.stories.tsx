import SeatToolkit from "@/index";
import { STKMode } from "../_utils";
import { options } from "../options";

export default {
  title: "Designer/Blank",
  component: SeatToolkit,
  ...options
};

export const Story = {
  render: (props) => <SeatToolkit mode={STKMode.DESIGNER} data={{}} {...props} />
};
