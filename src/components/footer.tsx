import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ISTKProps } from "@/types";
import { AnimatedSwitcher } from "./core";
import { tools } from "./toolbar/data";

const Footer: React.FC<ISTKProps> = ({ options: { showFooter = true } = {}, ...props }) => {
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);
  if (!showFooter) return null;
  const styles = props.styles?.footer;
  return (
    <div
      className={twMerge(
        "w-full absolute bottom-0 left-0 right-0 h-16 pointer-events-none flex justify-center items-center text-slate-800",
        styles?.root?.className
      )}
      style={styles?.root?.properties}
    >
      {selectedTool && (
        <AnimatedSwitcher
          key={selectedTool}
          className={twMerge(
            "text-xs w-fit px-2 py-1 rounded-md backdrop-blur-md bg-white/60 border border-border h-fit",
            styles?.meta?.className
          )}
          style={styles?.meta?.properties}
          component={<span>{tools[selectedTool]?.description}</span>}
          duration={0.2}
        />
      )}
    </div>
  );
};

export default Footer;
