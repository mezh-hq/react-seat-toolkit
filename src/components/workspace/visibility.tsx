import { Focus, Lock, Scan, Unlock } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids, selectors } from "@/constants";
import { store } from "@/store";
import { setInitialViewBoxScale, setVisibilityOffset } from "@/store/reducers/editor";
import type { ISTKProps } from "@/types";
import { d3Extended } from "@/utils";
import { showAllElements } from "./elements";

const freeze = () =>
  store.dispatch(setInitialViewBoxScale(d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup)).k));

const unfreeze = () => store.dispatch(setInitialViewBoxScale(null));

const setVisibility = () => {
  const offset = d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup)).k;
  store.dispatch(setVisibilityOffset(offset));
  d3Extended.select(selectors.workspaceGroup).attr(dataAttributes.visibilityOffset, offset);
};

const unsetVisibility = () => {
  d3Extended.select(selectors.workspaceGroup).attr(dataAttributes.visibilityOffset, 0);
  store.dispatch(setVisibilityOffset(0));
  showAllElements();
};

const VisibilityControls = (props: Pick<ISTKProps, "mode" | "styles" | "options">) => {
  const initialViewBoxScale = useSelector((state: any) => state.editor.initialViewBoxScale);
  const visibilityOffset = useSelector((state: any) => state.editor.visibilityOffset);

  const styles = props.styles?.visibilityControls;

  return (
    <div className="fixed top-[4.5rem] left-0 right-4 flex justify-center items-center">
      <div
        id={ids.visibilityControls}
        className={twMerge(
          "border border-border bg-white/80 backdrop-blur-md p-2 rounded-lg flex gap-2 transition-all",
          styles?.root?.className
        )}
        style={styles?.root?.properties}
      >
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", styles?.buttons?.className)}
          onClick={initialViewBoxScale ? unfreeze : freeze}
          role="button"
          style={styles?.buttons?.properties}
        >
          {initialViewBoxScale ? <Lock size={16} /> : <Unlock size={16} />}
        </div>
        <div
          className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", styles?.buttons?.className)}
          onClick={visibilityOffset === 0 ? setVisibility : unsetVisibility}
          role="button"
          style={styles?.buttons?.properties}
        >
          {visibilityOffset === 0 ? <Scan size={16} /> : <Focus size={16} />}
        </div>
      </div>
    </div>
  );
};

export default VisibilityControls;
