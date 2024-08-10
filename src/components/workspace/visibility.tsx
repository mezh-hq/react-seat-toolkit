import { Focus, Lock, Scan, Unlock } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { dataAttributes, selectors } from "@/constants";
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

export const VisibilityFreezeScale = (props: Pick<ISTKProps, "mode" | "styles" | "options">) => {
  const initialViewBoxScale = useSelector((state: any) => state.editor.initialViewBoxScale);

  const styles = props.styles?.visibilityControls;

  return (
    <div
      className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", styles?.buttons?.className)}
      onClick={initialViewBoxScale ? unfreeze : freeze}
      role="button"
      style={styles?.buttons?.properties}
    >
      {initialViewBoxScale ? <Lock size={16} /> : <Unlock size={16} />}
    </div>
  );
};

export const VisibilityOffset = (props: Pick<ISTKProps, "mode" | "styles" | "options">) => {
  const visibilityOffset = useSelector((state: any) => state.editor.visibilityOffset);

  const styles = props.styles?.visibilityControls;

  return (
    <div
      className={twMerge("w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash", styles?.buttons?.className)}
      onClick={visibilityOffset === 0 ? setVisibility : unsetVisibility}
      role="button"
      style={styles?.buttons?.properties}
    >
      {visibilityOffset === 0 ? <Scan size={16} /> : <Focus size={16} />}
    </div>
  );
};
