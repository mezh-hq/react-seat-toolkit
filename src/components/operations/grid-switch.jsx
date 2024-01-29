import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { store } from "@/store";
import { toggleGrid } from "@/store/reducers/editor";
import { TwinSwitch } from "../core";

const GridSwitch = ({ className }) => {
  const grid = useSelector((state) => state.editor.grid);
  return (
    <TwinSwitch
      values={["Whitespace", "Grid"]}
      selectedValue={grid ? "Grid" : "Whitespace"}
      className={twMerge("", className)}
      onChange={(value) => store.dispatch(toggleGrid(value == "Grid"))}
    />
  );
};

export default GridSwitch;
