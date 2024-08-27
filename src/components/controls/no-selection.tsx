import { MousePointerSquareDashed } from "lucide-react";

const NoSelectedElement = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2 text-slate-400">
      <MousePointerSquareDashed />
      <p className="text-sm">No element selected</p>
    </div>
  );
};

export default NoSelectedElement;
