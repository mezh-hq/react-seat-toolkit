import { Provider } from "react-redux";
import { twMerge } from "tailwind-merge";
import { default as Core, TooltipProvider } from "@/components";
import { store } from "@/store";
import { type ISTKProps } from "./types";

export { actions } from "@/actions";

export { store } from "@/store";

export { SeatStatus } from "@/types/elements";

export const SeatToolkit = (props: ISTKProps) => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <div
          className={twMerge("stk-core h-full w-full", props.styles?.core?.container?.className)}
          style={props.styles?.core?.container?.properties}
        >
          <Core {...props} />
        </div>
      </TooltipProvider>
    </Provider>
  );
};

export default SeatToolkit;
