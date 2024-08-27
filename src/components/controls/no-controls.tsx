import { Frame } from "lucide-react";

const NoControls = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2 text-slate-400">
      <Frame />
      <p className="text-sm">No controls available for tool</p>
    </div>
  );
};

export default NoControls;
