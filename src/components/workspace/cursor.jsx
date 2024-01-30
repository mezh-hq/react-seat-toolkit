import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import { ids } from "@/constants";
import { isWithinBounds } from "@/utils";

const styles = `#stk-workspace {
  cursor: none;
}`;

export const Cursor = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const Cursor = useSelector((state) => state.editor.cursor);

  const move = (e) => {
    const pointer = d3.pointer(e);
    const x = pointer[0];
    const y = pointer[1];
    const workspace = document.getElementById(ids.workspace)?.getBoundingClientRect();
    const zoomControls = document.getElementById(ids.zoomControls)?.getBoundingClientRect();
    if (workspace) {
      const customCursor = document.getElementById(ids.cursor);
      if (isWithinBounds(x, y, workspace) && !isWithinBounds(x, y, zoomControls)) {
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
        className="absolute pointer-events-none transform translate-x-[-50%] translate-y-[-50%] fill-white"
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
