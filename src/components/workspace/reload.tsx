import { memo } from "react";
import { RotateCcw } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ids } from "@/constants";
import type { ISTKProps } from "@/types";

interface IProps extends Pick<ISTKProps, "mode" | "styles" | "options"> {
  onReload: () => void;
}

const Reloader = (props: IProps) => {
  return (
    <div
      id={ids.reloader}
      className={twMerge(
        "w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash",
        props.styles?.reloadButton?.className
      )}
      onClick={props?.onReload}
      role="button"
      style={props.styles?.reloadButton?.properties}
    >
      <RotateCcw size={16} />
    </div>
  );
};

export default memo(Reloader);
