import { memo } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ids, selectors } from "@/constants";
import { store } from "@/store";
import { setInitialViewBoxScale, setVisibilityOffset } from "@/store/reducers/editor";
import type { ISTKProps } from "@/types";
import { d3Extended } from "@/utils";
import { Button } from "../core";

const freeze = () =>
  store.dispatch(setInitialViewBoxScale(d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup)).k));

const unfreeze = () => store.dispatch(setInitialViewBoxScale(null));

const setVisibility = () =>
  store.dispatch(setVisibilityOffset(d3Extended.zoomTransform(document.querySelector(selectors.workspaceGroup)).k));

const unsetVisibility = () => store.dispatch(setVisibilityOffset(0));

const VisibilityControls = (props: ISTKProps) => {
  const initialViewBoxScale = useSelector((state: any) => state.editor.initialViewBoxScale);
  const visibilityOffset = useSelector((state: any) => state.editor.visibilityOffset);

  const styles = props.styles?.visibilityControls;

  return (
    <div
      id={ids.visibilityControls}
      className={twMerge(
        "absolute top-7 sm:top-[calc(100%-6rem)] right-7 pl-7 flex flex-wrap flex-row-reverse sm:flex-row items-center gap-4",
        props.mode === "user" && "bottom-5 left-6 sm:bottom-6 sm:left-8 md:bottom-8 md:left-10",
        styles?.root?.className
      )}
      style={styles?.root?.properties}
    >
      <Button
        className={styles?.buttons?.className}
        style={styles?.buttons?.properties}
        onClick={initialViewBoxScale ? unfreeze : freeze}
      >
        {initialViewBoxScale ? "Unfreeze" : "Freeze"} Initial Scale
      </Button>
      <Button
        className={styles?.buttons?.className}
        style={styles?.buttons?.properties}
        onClick={visibilityOffset === 0 ? setVisibility : unsetVisibility}
      >
        {visibilityOffset === 0 ? "Set" : "Unset"} Visibility Offset
      </Button>
    </div>
  );
};

export default memo(VisibilityControls);
