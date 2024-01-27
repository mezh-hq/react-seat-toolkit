import { Provider } from "react-redux";
import { Editor, Toolbar, TooltipProvider } from "@/components";
import { CursorProvider } from "@/providers";
import { store } from "@/store";

export const SeatDesigner = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <CursorProvider>
          <div className="flex">
            <Toolbar />
            <Editor />
          </div>
        </CursorProvider>
      </TooltipProvider>
    </Provider>
  );
};

export default SeatDesigner;
