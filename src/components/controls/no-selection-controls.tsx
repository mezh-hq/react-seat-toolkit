import { CircleSlash } from "lucide-react";

const NoSelectionControls = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6">
      <span className="text-lg font-medium">No controls available for selection</span>
      <CircleSlash size={40} strokeWidth={1} />
    </div>
  );
};

export default NoSelectionControls;
