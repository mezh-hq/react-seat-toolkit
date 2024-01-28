import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Callout, Caption } from "./core";

const transition = "transition-all duration-500";

const width = "w-[22rem]";

const Controls = () => {
  const open = useSelector((state) => state.editor.showControls);
  return (
    <>
      <div className={twMerge("pointer-events-none grow-0 shrink-0", transition, open ? width : "w-0")} />
      <div
        className={twMerge(
          "py-5 px-6 h-full absolute top-0 border-t border-black",
          transition,
          width,
          open ? "right-0" : "-right-[22rem]"
        )}
      >
        <div className="w-full flex justify-between items-center gap-12">
          <Callout className="font-semibold">Categories</Callout>
          <Caption className="text-blue-500 transform translate-y-0.5">Manage</Caption>
        </div>
      </div>
    </>
  );
};

export default Controls;
