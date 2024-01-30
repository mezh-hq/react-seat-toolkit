import { useSelector } from "react-redux";
import { AnimatedSwitcher } from "./core";
import { tools } from "./toolbar/data";

const Footer = () => {
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);
  return (
    <div className="w-full h-8 flex justify-center items-center bg-black text-white relative">
      <span className="text-sm">React Seat Toolkit </span>
      <AnimatedSwitcher
        show={!!selectedTool}
        key={selectedTool}
        className="absolute top-2 left-5 text-xs"
        component={<span>{tools[selectedTool]?.description}</span>}
        duration={0.2}
      />
    </div>
  );
};

export default Footer;
