import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ElementType } from "@/components/workspace/elements";
import { dataAttributes } from "@/constants";
import { d3Extended } from "@/utils";

const useMove = () => {
  const selectedElementIds = useSelector((state: any) => state.editor.selectedElementIds);

  useEffect(() => {
    const handler = (e) => {
      selectedElementIds.forEach((id) => {
        const element = d3Extended.selectById(id);
        const isSeat = element.attr(dataAttributes.elementType) === ElementType.Seat;
        const label = isSeat ? d3Extended.selectById(`${id}-label`) : null;
        const x = isSeat ? "cx" : "x";
        const y = isSeat ? "cy" : "y";
        switch (e.key) {
          case "ArrowLeft":
            label?.attr("x", +label.attr("x") - 1);
            return element.attr(x, +element.attr(x) - 1);
          case "ArrowRight":
            label?.attr("x", +label.attr("x") + 1);
            return element.attr(x, +element.attr(x) + 1);
          case "ArrowUp":
            label?.attr("y", +label.attr("y") - 1);
            return element.attr(y, +element.attr(y) - 1);
          case "ArrowDown":
            label?.attr("y", +label.attr("y") + 1);
            return element.attr(y, +element.attr(y) + 1);
        }
      });
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [selectedElementIds]);
};

export default useMove;
