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
        "absolute top-4 right-4 pl-7 flex justify-center items-center cursor-pointer border bg-gray-50 hover:bg-gray-100 [&>svg]:hover:-rotate-45 [&>svg]:transition-all [&>svg]:transition-medium rounded-md p-2 transition-all duration-medium",
        props.styles?.reloadButton?.className
      )}
      style={props.styles?.reloadButton?.properties}
      onClick={props?.onReload}
    >
      <RotateCcw size={20.5} />
    </div>
  );
};

export default memo(Reloader);
