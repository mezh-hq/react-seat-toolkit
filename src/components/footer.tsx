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
        "w-full absolute bottom-0 h-8 flex justify-center items-center bg-black text-white",
        styles?.root?.className
      )}
      style={styles?.root?.properties}
    >
      <span className={twMerge("text-sm", styles?.title?.className)} style={styles?.title?.properties}>
        React Seat Toolkit
      </span>
      <AnimatedSwitcher
        show={!!selectedTool}
        customKey={selectedTool}
        className={twMerge("absolute top-[0.4rem] left-5 text-xs", styles?.meta?.className)}
        style={styles?.meta?.properties}
        component={<span>{tools[selectedTool]?.description}</span>}
        alternateComponent={null}
        duration={0.2}
      />
    </div>
  );
};

export default Footer;
