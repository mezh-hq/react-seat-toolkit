import { default as GridLines } from "@mezh-hq/react-gridlines";
import { useSelector } from "react-redux";

const Grid = () => {
  const grid = useSelector((state: any) => state.editor.grid);
  if (!grid) return null;
  return (
    <GridLines
      className="w-full h-full absolute top-0 left-0 pointer-events-none opacity-20"
      cellWidth={44}
      strokeWidth={2}
    />
  );
};
export default Grid;
