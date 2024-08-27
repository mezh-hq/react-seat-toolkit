import { useSelector } from "react-redux";
import { store } from "@/store";
import { toggleGrid } from "@/store/reducers/editor";
import { Label, Switch } from "../core";

const GridSwitch = () => {
  const grid = useSelector((state: any) => state.editor.grid);
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="grid">Grid</Label>
      <Switch id="grid" checked={grid} onCheckedChange={(checked) => store.dispatch(toggleGrid(checked))} />
    </div>
  );
};

export default GridSwitch;
