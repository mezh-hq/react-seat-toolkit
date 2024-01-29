import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { twMerge } from "tailwind-merge";
import { ids, selectors } from "@/constants";
import { store } from "@/store";
import { clearElement } from "@/store/reducers/editor";
import { d3Extended } from "@/utils";
import { tools } from "../toolbar/data";

function handleZoom(e) {
  d3.select(selectors.crosshairGroup).attr("transform", e.transform);
}

const zoom = d3.zoom().on("zoom", handleZoom);

export const Crosshairs = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const selectedElementId = useSelector((state) => state.editor.selectedElementId);
  const selectedTool = useSelector((state) => state.toolbar.selectedTool);

  const move = (e) => {
    const pointer = d3.pointer(e);
    const workspace = document.getElementById(ids.workspace).getBoundingClientRect();
    setX(pointer[0] - workspace.left);
    setY(pointer[1] - workspace.top);
  };

  useEffect(() => {
    const onElemClick = (e) => {
      if (selectedElementId != e.target.id) store.dispatch(clearElement());
    };
    document.addEventListener("click", onElemClick);
    return () => {
      document.removeEventListener("click", onElemClick);
    };
  }, [selectedElementId]);

  useLayoutEffect(() => {
    d3.select(`#${ids.crosshairs}`).call(zoom);
  });

  useLayoutEffect(() => {
    if (tools[selectedTool]?.crosshairs) {
      const crosshairs = d3.select(selectors.crosshairGroup);
      crosshairs.attr("transform", null);
    } else {
      const workspace = d3.select(selectors.workspaceGroup);
      workspace.on("zoom", (e) => {
        const crosshairs = d3.select(selectors.crosshairGroup);
        crosshairs.attr("transform", e.detail);
      });
      return () => {
        workspace.on("zoom", null);
      };
    }
  }, [selectedTool]);

  useEffect(() => {
    console.log(selectedElementId, tools[selectedTool]?.crosshairs);
    if (selectedElementId && tools[selectedTool]?.crosshairs) {
      setEnabled(false);
      return;
    }
    if (selectedElementId) {
      const node = d3Extended.selectById(selectedElementId);
      setX(+node.attr("x") + Number(node.attr("width")) / 2);
      setY(+node.attr("y") + Number(node.attr("height")) / 2);
      setEnabled(true);
      node.on("drag", (e) => {
        setX(e.detail.x + Number(node.attr("width")) / 2);
        setY(e.detail.y + Number(node.attr("height")) / 2);
      });
    } else if (tools[selectedTool]?.crosshairs) {
      document.addEventListener("pointermove", move);
      document.addEventListener("touchmove", move);
      setEnabled(true);
      setX(-1);
      setY(-1);
      return () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("touchmove", move);
      };
    } else {
      setEnabled(false);
    }
  }, [selectedTool, selectedElementId]);

  return (
    <svg
      id={ids.crosshairs}
      className={twMerge(
        "w-full h-full absolute top-0 left-0 pointer-events-none",
        (!enabled || x < 0 || y < 0) && "opacity-0"
      )}
    >
      <g>
        <line x1={x} y1={0} x2={x} y2={"100%"} stroke="black" />
        <line x1={0} y1={y} x2={"100%"} y2={y} stroke="black" />
      </g>
    </svg>
  );
};

export default Crosshairs;
