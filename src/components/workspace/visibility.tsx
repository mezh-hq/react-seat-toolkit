import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { dataAttributes, ids, selectors } from "@/constants";
import { store } from "@/store";
import { setInitialViewBoxScale, setVisibilityOffset } from "@/store/reducers/editor";
import type { ISTKProps } from "@/types";
import { d3Extended } from "@/utils";
import { Button } from "../core";
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
    <div
      id={ids.visibilityControls}
      className={twMerge(
        "absolute top-7 sm:top-[calc(100%-6rem)] right-5 pl-7 flex flex-wrap flex-row-reverse sm:flex-row items-center gap-2",
        props.mode === "user" && "bottom-5 left-6 sm:bottom-6 sm:left-8 md:bottom-8 md:left-10",
        styles?.root?.className
      )}
      style={styles?.root?.properties}
    >
      <Button
        className={styles?.buttons?.className}
        style={styles?.buttons?.properties}
        onClick={initialViewBoxScale ? unfreeze : freeze}
        variant="secondary"
      >
        {initialViewBoxScale ? "Unfreeze" : "Freeze"} Initial Scale
      </Button>
      <Button
        className={styles?.buttons?.className}
        style={styles?.buttons?.properties}
        onClick={visibilityOffset === 0 ? setVisibility : unsetVisibility}
        variant="secondary"
      >
        {visibilityOffset === 0 ? "Set" : "Unset"} Visibility Offset
      </Button>
    </div>
  );
};

export default VisibilityControls;
