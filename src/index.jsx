import { Provider } from "react-redux";
import { Cursor, Editor, Toolbar, TooltipProvider } from "@/components";
import { store } from "@/store";

export const SeatDesigner = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <div className="flex">
          <Toolbar />
          <Editor />
        </div>
      </TooltipProvider>
      <Cursor />
    </Provider>
  );
};

export default SeatDesigner;
