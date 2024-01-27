import { tools } from "./data";

const ToolBar = () => {
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(tools).map(([_, value], index) => {
        const Icon = value.icon;
        return (
          <button key={index}>
            <Icon />
          </button>
        );
      })}
    </div>
  );
};

export default ToolBar;
