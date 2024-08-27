import { FolderCog } from "lucide-react";

const NoSelectionControls = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2 text-slate-400">
      <FolderCog />
      <p className="text-sm">No controls available for selection</p>
    </div>
  );
};

export default NoSelectionControls;
