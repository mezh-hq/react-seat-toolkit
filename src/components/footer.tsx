import { useSelector } from "react-redux";
import { AnimatedSwitcher } from "./core";
import { tools } from "./toolbar/data";

const Footer = () => {
  const selectedTool = useSelector((state: any) => state.toolbar.selectedTool);
  return (
    <div className="w-full fixed bottom-0 h-8 flex justify-center items-center bg-black text-white">
      <span className="text-sm">React Seat Toolkit </span>
      <AnimatedSwitcher
        show={!!selectedTool}
        customKey={selectedTool}
        className="absolute top-[0.4rem] left-5 text-xs"
        component={<span>{tools[selectedTool]?.description}</span>}
        alternateComponent={null}
        duration={0.2}
      />
    </div>
  );
};

export default Footer;
