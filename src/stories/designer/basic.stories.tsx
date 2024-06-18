import { toast } from "sonner";
import SeatToolkit from "@/index";
import { STKMode } from "../_utils";
import { options } from "../options";

export default {
  title: "Designer/Basic",
  component: SeatToolkit,
  ...options
};

export const Story = {
  render: (props) => <SeatToolkit mode={STKMode.DESIGNER} {...props} />
};

export const WithoutFooter = {
  render: (props) => (
    <SeatToolkit
      mode={STKMode.DESIGNER}
      {...props}
      options={{
        showFooter: false,
        ...props.options
      }}
    />
  )
};

export const WithReloadButton = {
  render: (props) => (
    <SeatToolkit
      mode={STKMode.DESIGNER}
      {...props}
      options={{
        showReloadButton: true,
        ...props.options
      }}
      events={{
        onReload: () => {
          toast.info("Reload clicked");
        },
        ...props.events
      }}
    />
  )
};
