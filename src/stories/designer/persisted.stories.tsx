import { toast } from "sonner";
import SeatToolkit from "@/index";
import { STKMode } from "../_utils";
import { options } from "../options";

export default {
  title: "Designer/Persisted",
  component: SeatToolkit,
  ...options
};

export const Story = {
  render: (props) => {
    const saved = sessionStorage.getItem("stk-data");
    const data = saved ? JSON.parse(saved) : undefined;
    return (
      <SeatToolkit
        {...props}
        mode={STKMode.DESIGNER}
        data={data}
        options={{
          exportButtonText: "Save to Session Storage"
        }}
        events={{
          onExport: (data) => {
            sessionStorage.setItem("stk-data", JSON.stringify(data));
            toast.info("Changes saved to session storage. They will be available on page reload");
          },
          ...props.events
        }}
      />
    );
  }
};
