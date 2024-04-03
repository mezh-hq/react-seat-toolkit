import { Provider } from "react-redux";
import { default as Core, TooltipProvider } from "@/components";
import { store } from "@/store";
import { type ISTKProps } from "./types";

export { SeatStatus } from "@/types/elements";

export { mutations } from "@/mutations";

export const SeatToolkit = (props: ISTKProps) => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Core {...props} />
      </TooltipProvider>
    </Provider>
  );
};

export default SeatToolkit;
