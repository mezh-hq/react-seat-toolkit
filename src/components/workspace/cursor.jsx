import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const styles = `#stk-workspace {
  cursor: none;
}`;

export const Cursor = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const Cursor = useSelector((state) => state.editor.cursor);

  const move = (e) => {
    const touchEvent = e.touches ? e.touches[0] : null;
    const x = !isTouchDevice ? e.clientX : touchEvent?.clientX || 0;
    const y = !isTouchDevice ? e.clientY : touchEvent?.clientY || 0;
    const workspace = document.getElementById("stk-workspace");
    if (workspace) {
      const rect = workspace.getBoundingClientRect();
      const customCursor = document.getElementById("stk-cursor");
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        customCursor.style.display = "block";
      } else {
        customCursor.style.display = "none";
      }
    }
    setCursorX(x);
    setCursorY(y);
  };

  useEffect(() => {
    try {
      document.createEvent("TouchEvent");
      setIsTouchDevice(true);
    } catch (e) {
      setIsTouchDevice(false);
    }
  }, []);

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
    <div id="stk-cursor">
      <style>{styles}</style>
      <Cursor
        style={{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
          position: "absolute",
          pointerEvents: "none",
          transform: "translate(-39%, -27%)",
          display: cursorX >= 0 && cursorY >= 0 ? "block" : "none"
        }}
      />
    </div>
  );
};

export default Cursor;
