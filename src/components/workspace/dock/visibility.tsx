import { Focus, Lock, Scan, Unlock } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { dataAttributes, selectors } from "@/constants";
import { store } from "@/store";
import { setInitialViewBoxScale, setVisibilityOffset } from "@/store/reducers/editor";
import type { ISTKProps } from "@/types";
import { d3Extended } from "@/utils";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "../../core";
import { showAllElements } from "../elements";

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

  return (
    <Tooltip>
      <TooltipTrigger
        className={props.styles?.core?.tooltip?.trigger?.className}
        style={props.styles?.core?.tooltip?.trigger?.properties}
      >
        <Button
          variant={initialViewBoxScale ? "primary" : "secondary"}
          className={twMerge("w-8 h-8 p-2", props.styles?.visibilityControls?.buttons?.className)}
          onClick={initialViewBoxScale ? unfreeze : freeze}
          style={props.styles?.visibilityControls?.buttons?.properties}
        >
          {initialViewBoxScale ? <Lock size={16} /> : <Unlock size={16} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={15}
        className={props.styles?.core?.tooltip?.content?.className}
        style={props.styles?.core?.tooltip?.content?.properties}
      >
        {initialViewBoxScale ? "Unlock initial scale" : "Lock initial scale"}
      </TooltipContent>
    </Tooltip>
  );
};

export const VisibilityOffset = (props: Pick<ISTKProps, "mode" | "styles" | "options">) => {
  const visibilityOffset = useSelector((state: any) => state.editor.visibilityOffset);

  return (
    <Tooltip>
      <TooltipTrigger
        className={props.styles?.core?.tooltip?.trigger?.className}
        style={props.styles?.core?.tooltip?.trigger?.properties}
      >
        <Button
          variant={visibilityOffset === 0 ? "secondary" : "primary"}
          className={twMerge("w-8 h-8 p-2", props.styles?.visibilityControls?.buttons?.className)}
          onClick={visibilityOffset === 0 ? setVisibility : unsetVisibility}
          style={props.styles?.visibilityControls?.buttons?.properties}
        >
          {visibilityOffset === 0 ? <Scan size={16} /> : <Focus size={16} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={15}
        className={props.styles?.core?.tooltip?.content?.className}
        style={props.styles?.core?.tooltip?.content?.properties}
      >
        {visibilityOffset === 0 ? "Set visibility offset" : "Unset visibility offset"}
      </TooltipContent>
    </Tooltip>
  );
};
