import { Provider } from "react-redux";
import { Editor, Toolbar } from "@/components";
import { CursorProvider } from "@/providers";
import { store } from "@/store";

export const SeatDesigner = () => {
  return (
    <Provider store={store}>
      <CursorProvider>
        <div className="flex">
          <Toolbar />
          <Editor />
        </div>
      </CursorProvider>
    </Provider>
  );
};

export default SeatDesigner;
