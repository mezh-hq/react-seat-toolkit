import { memo } from "react";
import { PanelBottomClose, PanelBottomOpen } from "lucide-react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { toggleDock } from "@/store/reducers/toolbar";

function DockHandler(): JSX.Element {
  const dock = useSelector((state: any) => state.toolbar.dock);

  return (
    <div
      className={twMerge(
        "w-8 h-8 p-2 rounded-md bg-slate-100 cursor-pointer splash transition-all duration-300 ease-in-out"
      )}
      role="button"
      onClick={() => store.dispatch(toggleDock(undefined))}
    >
      {dock ? <PanelBottomClose size={16} /> : <PanelBottomOpen size={16} />}
    </div>
  );
}

export default memo(DockHandler);
