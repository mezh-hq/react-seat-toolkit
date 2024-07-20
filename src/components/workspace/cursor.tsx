import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pointer } from "d3";
import { ids } from "@/constants";
import { resizeCursors } from "@/hooks/interactions";
import { isWithinBounds } from "@/utils";

const styles = `#stk-workspace { cursor: none; }`;

export const Cursor = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const Cursor = useSelector((state: any) => state.editor.cursor);

  const move = (e) => {
    const ptr = pointer(e);
    const x = ptr[0];
    const y = ptr[1];
    const workspace = document.getElementById(ids.workspace)?.getBoundingClientRect();
    const zoomControls = document.getElementById(ids.zoomControls)?.getBoundingClientRect();
    const panControls = document.getElementById(ids.panControls)?.getBoundingClientRect();
    if (workspace) {
      const customCursor = document.getElementById(ids.cursor);
      if (
        isWithinBounds(x, y, workspace) &&
        !isWithinBounds(x, y, zoomControls) &&
        !isWithinBounds(x, y, panControls) &&
        !resizeCursors.includes(e.target?.style?.cursor) &&
        !e.target.id.includes("radix:") &&
        e.target.getAttribute("role") !== "dialog"
      ) {
        customCursor.style.display = "block";
      } else {
        customCursor.style.display = "none";
      }
    }
    setCursorX(x);
    setCursorY(y);
  };

  useEffect(() => {
    if (Cursor) {
      document.addEventListener("pointermove", move);
      document.addEventListener("touchmove", move);
      return () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("touchmove", move);
      };
    }
  }, [Cursor]);

  if (!Cursor) return null;

  return (
    <div id={ids.cursor}>
      <style>{styles}</style>
      <Cursor
        className="absolute pointer-events-none transform translate-x-[-50%] translate-y-[-50%] fill-white text-black"
        style={{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
          display: cursorX > 0 && cursorY > 0 ? "block" : "none"
        }}
      />
    </div>
  );
};

export default Cursor;
